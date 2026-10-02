# 📻 Portal de Notícias - Radio Memory

🚀 **Aplicação em Produção:** [Acessar o Portal](https://radio-memory-news-portal-bkl3.vercel.app/)

## 📌 Sobre o Projeto
Esta aplicação web foi desenvolvida como Teste Prático para a Radio Memory, com o objetivo de consumir um endpoint autenticado, listar, filtrar e exibir posts (cards) priorizando uma excelente apresentação visual e usabilidade.

## ✨ Funcionalidades e Regras de Negócio
* **Listagem Dinâmica:** Exibição dos cards contendo imagem, título, subtítulo, data, categoria e autor. Apenas os dados com `status = 1` são renderizados na interface.
* **Ordenação Dupla (Pins e Datas):** A listagem prioriza os cards fixados (onde a `data_fixo` é maior ou igual ao momento atual), ordenando-os de forma decrescente. Em seguida, exibe os cards não fixados, também ordenados por data de publicação decrescente.
* **Filtros e Busca Avançada:** O usuário pode filtrar os resultados por categoria e realizar buscas de texto nos títulos e subtítulos (case-insensitive).
* **Visualização de Detalhes:** Abertura completa da notícia com reprodução de vídeos do YouTube através de um player responsivo e redirecionamento para a URL do post original abrindo sempre em uma nova aba.
* **Formatação pt-BR:** Datas rigorosamente exibidas no padrão brasileiro (ex: 03/02/2025 13:56).
* **Experiência do Usuário (UX):** Implementação de *Skeleton Screens/Shimmers* durante os carregamentos da API para garantir fluidez visual.

## 🛠️ Decisões Técnicas e Arquitetura

Para cumprir com os requisitos exigidos de organização e boas práticas em Angular, as seguintes abordagens foram adotadas:

* **Segurança e Gestão do Token (Variáveis de Ambiente):** O token de autorização da API **não foi versionado no repositório** para garantir a segurança. Para o desenvolvimento local, utiliza-se um arquivo `environment.ts` ignorado pelo Git. Em produção, o token é injetado diretamente em tempo de compilação através das variáveis de ambiente da Vercel.
* **Sanitização de HTML:** Como a API retorna o corpo do post em formato HTML, foi aplicada uma higienização estrita nativa do Angular (`DomSanitizer`) antes da renderização na DOM, prevenindo vulnerabilidades de injeção de código (XSS).
* **Roteamento e Componentização:** Arquitetura dividida em componentes reutilizáveis, gestão de estado com RxJS e isolamento da lógica de comunicação com a API em *Services* dedicados.

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
* Node.js (Versão LTS, ex: 18.x ou 22.x)
* Angular CLI instalado globalmente

### Passos para Instalação
1. Clone o repositório para o seu ambiente:
   ```bash
   git clone https://github.com/NeriMatheus/radio-memory-news-portal.git](https://github.com/NeriMatheus/radio-memory-news-portal.git
   ```
2. Instale todas as dependências do projeto:
   ```bash
   npm install
   ```
3. **Configuração das Variáveis de Ambiente:**
   * Na pasta `src/environments/`, duplique o arquivo `environment.example.ts` e renomeie a cópia para `environment.ts`.
   * Abra o novo arquivo e substitua o valor `"COLE_O_TOKEN_AQUI"` pelo token JWT válido fornecido para a avaliação.
4. Inicie o servidor local:
   ```bash
   npm run start
   # ou
   ng serve
   ```
5. Acesse a aplicação no seu navegador através de `http://localhost:4200`.

## ☁️ Instruções de Build e Deploy

O deploy da aplicação foi realizado de forma contínua através da plataforma **Vercel**. 
Para obedecer ao critério de não versionamento de credenciais, o processo de *build* foi customizado para substituir a variável de ambiente dinamicamente. 

**Comando de Build Customizado na Vercel:**
```bash
sed "s#COLE_O_TOKEN_AQUI#${API_TOKEN}#" src/environments/environment.example.ts > src/environments/environment.ts && npm run build
```
*(Este comando utiliza o utilitário `sed` do Linux para ler a variável escondida nas configurações da Vercel e criar o arquivo correto instantes antes da compilação final do Angular).*

---
**Desenvolvido por:** Matheus Neri