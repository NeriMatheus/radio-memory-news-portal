# Portal de Notícias - Teste Prático (Radio Memory)

Aplicação web desenvolvida em Angular (utilizando arquitetura moderna baseada em Standalone Components) para listagem, filtragem e exibição detalhada de posts consumindo a API autenticada da Radio Memory.

## 🚀 Tecnologias e Padrões Utilizados

- Angular (com Standalone Components).
- Signals e Computed para gerir os estados reativos de forma nativa, reativa e de alta performance.
- Injeção de Dependências Moderna utilizando a função inject().
- Roteamento e Querystring com Router e ActivatedRoute para persistência dos filtros na URL.
- Testes Unitários (Jasmine/Karma) com cobertura completa dos componentes estruturais.

---

## 🛠️ Como Executar o Projeto

Certifique-se de ter o Node.js e o Angular CLI instalados na sua máquina.

1. Clone o repositório e entre na pasta do projeto:
   cd teste_pratico_radio_memory

2. Instale as dependências:
   npm install

3. Inicie o servidor de desenvolvimento:
   ng serve
   A aplicação ficará disponível em http://localhost:4200/.

4. Execute os testes unitários:
   ng test

---

## ⚙️ Configuração do Token / Variáveis de Ambiente

Para garantir a segurança e evitar a exposição de credenciais no repositório, o token de autenticação da API encontra-se isolado no arquivo de ambiente:

- Caminho: src/environments/environment.ts

export const environment = {
  production: false,
  apiUrl: 'https://6fx8kzbiw3.execute-api.us-east-2.amazonaws.com/prod',
  authToken: 'SEU_TOKEN_AQUI'
};

---

## 📐 Decisões Técnicas e Arquiteturais

### 1. Regras de Negócio e Ordenação
- Filtro de Status: Apenas posts que possuem status === 1 são renderizados no portal.
- Pins (Fixados): Um post é considerado fixado se a propriedade data_fixo existir e for maior ou igual ao momento atual (agora).
- Ordenação Estrita: Os cards fixados aparecem sempre no topo (ordenados por data_fixo decrescente), seguidos pelos não fixados (ordenados por data de publicação decrescente).

### 2. Sanitização e Segurança de Conteúdo
Como o campo corpo dos posts retorna marcação HTML estruturada, é aplicada a devida sanitização antes da renderização no modal de detalhes para garantir a segurança contra vulnerabilidades.

### 3. Persistência de Filtros (Bônus Querystring)
Os filtros de busca textual e de categoria selecionada estão sincronizados com os query params da URL. Isso permite que você compartilhe o link exato com o estado atual do filtro aplicado, restaurando automaticamente o estado da aplicação ao carregar a página.

### 4. Experiência do Usuário (UX)
- Skeletons/Shimmers: Implementados nas listagens para mitigar a sensação de espera durante o carregamento assíncrono dos dados.
- Tratamento de Erros: Mensagens amigáveis de falha de requisição com botão integrado para nova tentativa (Tentar novamente).