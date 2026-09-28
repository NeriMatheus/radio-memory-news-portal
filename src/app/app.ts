import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Card } from './models/card.model';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class App implements OnInit {
  title = 'teste_pratico_radio_memory';

  cards: Card[] = [];
  cardsFiltrados: Card[] = [];
  categoriasDisponiveis: string[] = [];

  termoBusca: string = '';
  categoriaSelecionada: string = '';
  loading: boolean = true;
  erroMensagem: string | null = null;
  cardSelecionado: Card | null = null;

  constructor(
    private cardService: CardService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.carregarCards();
  }

  carregarCards(): void {
    this.loading = true;
    this.erroMensagem = null;

    this.cardService.getTodosCards().subscribe({
      next: (res: any) => {
        const dados = res?.data || res;
        if (Array.isArray(dados)) {
          this.cards = dados;
          this.processarCards();
        } else {
          this.erroMensagem = 'Formato de resposta inválido da API.';
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao buscar cards:', err);
        this.erroMensagem = 'Não foi possível carregar os posts. Verifique sua conexão ou token.';
        this.loading = false;
      }
    });
  }

  isFixado(card: Card): boolean {
    if (!card.data_fixo) return false;
    const agora = new Date();
    const dataFixo = new Date(card.data_fixo);
    return dataFixo >= agora;
  }

  processarCards(): void {
    const agora = new Date();

    // Filtrar apenas status === 1
    const cardsAtivos = this.cards.filter(c => c.status === 1);

    // Extrair categorias únicas
    this.categoriasDisponiveis = Array.from(
      new Set(cardsAtivos.map(c => c.categoria).filter(Boolean))
    );

    // Separar fixados válidos e não fixados
    const fixados = cardsAtivos.filter(c => {
      if (!c.data_fixo) return false;
      return new Date(c.data_fixo) >= agora;
    });

    const naoFixados = cardsAtivos.filter(c => !this.isFixado(c));

    // Ordenações exigidas
    fixados.sort((a, b) => new Date(b.data_fixo!).getTime() - new Date(a.data_fixo!).getTime());
    naoFixados.sort((a, b) => new Date(b.data).getTime() - new Date(b.data).getTime());

    // Juntar: Fixados primeiro, seguidos dos não fixados
    this.cards = [...fixados, ...naoFixados];
    this.cardsFiltrados = [...this.cards];
  }

  filtrarCards(): void {
    this.cardsFiltrados = this.cards.filter(card => {
      const matchBusca =
        card.titulo.toLowerCase().includes(this.termoBusca.toLowerCase()) ||
        card.subtitulo.toLowerCase().includes(this.termoBusca.toLowerCase());

      const matchCategoria =
        !this.categoriaSelecionada || card.categoria === this.categoriaSelecionada;

      return matchBusca && matchCategoria;
    });
  }

  formatarData(dataStr: string): string {
    if (!dataStr) return '';
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  sanitizarHtml(conteudo: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustHtml(conteudo);
  }

  abrirDetalhes(card: Card): void {
    this.cardSelecionado = card;
  }

  fecharDetalhes(): void {
    this.cardSelecionado = null;
  }
}