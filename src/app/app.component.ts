import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CardService } from './services/card.service';
import { Card } from './models/card.model';

import { PortalHeaderComponent } from './components/portal-header/portal-header.component';
import { PortalFooterComponent } from './components/portal-footer/portal-footer.component';
import { FilterSectionComponent } from './components/filter-section/filter-section.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsDetailModalComponent } from './components/news-detail-modal/news-detail-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PortalHeaderComponent,
    PortalFooterComponent,
    FilterSectionComponent,
    NewsCardComponent,
    NewsDetailModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private cardService = inject(CardService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  // Estados
  cards = signal<Card[]>([]);
  loading = signal<boolean>(true);
  erroMensagem = signal<string | null>(null);

  // Card selecionado para o modal
  cardSelecionado = signal<Card | null>(null);

  // Filtros
  termoBusca = signal<string>('');
  categoriaSelecionada = signal<string>('todas');

  ngOnInit(): void {

    // Lê os parâmetros da URL ao iniciar para persistir os filtros (Bônus)
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['categoria']) {
        this.categoriaSelecionada.set(params['categoria']);
      }
      if (params['busca']) {
        this.termoBusca.set(params['busca']);
      }
    });

    this.carregarCards();
  }

  // Carrega os cards da API
  carregarCards(): void {
    this.loading.set(true);
    this.erroMensagem.set(null);

    this.cardService.getTodosCards().subscribe({
      next: (dados: Card[]) => {
        this.cards.set(dados);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar os cards:', err);
        this.erroMensagem.set('Não foi possível carregar os posts. Tente novamente mais tarde.');
        this.loading.set(false);
      }
    });
  }

  // Categorias disponíveis extraídas dinamicamente
  categoriasDisponiveis = computed(() => {
    const lista = this.cards();
    const cats = lista.map(card => card.categoria).filter((categoria): categoria is string => !!categoria);
    return Array.from(new Set(cats));
  });

  // Filtro e ordenação dos cards
  cardsFiltrados = computed(() => {
    const agora = new Date();
    const termo = this.termoBusca().toLowerCase().trim();
    const categoriaFiltro = this.categoriaSelecionada();

    // Somente cards ativos
    const listaAtiva = this.cards().filter(card => card.status === 1);
    
    const fixados: Card[] = [];
    const naoFixados: Card[] = [];

    // Separação entre fixados e não fixados
    listaAtiva.forEach(card => {
      const temDataFixoValida = !!card.data_fixo && new Date(card.data_fixo) >= agora;
      if (temDataFixoValida) {
        fixados.push(card);
      } else {
        naoFixados.push(card);
      }
    });

    // Ordenação dos fixados
    fixados.sort((a, b) => new Date(b.data_fixo!).getTime() - new Date(a.data_fixo!).getTime());
    
    // Ordenação dos não fixados
    naoFixados.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

    // Fixados aparecem primeiro
    const todosOrdenados = [...fixados, ...naoFixados];

    // Aplicação dos filtros de busca e categoria
    return todosOrdenados.filter(card => {
      const matchCategoria = categoriaFiltro === 'todas' || card.categoria === categoriaFiltro;
      const matchBusca = !termo || 
        card.titulo.toLowerCase().includes(termo) || 
        card.subtitulo.toLowerCase().includes(termo);

      return matchCategoria && matchBusca;
    });
  });

  // Controles do modal
  abrirDetalhes(card: Card): void {
    this.cardSelecionado.set(card);
  }

  fecharDetalhes(): void {
    this.cardSelecionado.set(null);
  }

  // Controles de filtros com sincronização na URL
  filtrarCards(): void {
    this.sincronizarUrlComFiltros();
  }

  onCategoriaChange(categoria: string): void {
    this.categoriaSelecionada.set(categoria);
    this.sincronizarUrlComFiltros();
  }

  onBuscaChange(termo: string): void {
    this.termoBusca.set(termo);
    this.sincronizarUrlComFiltros();
  }

  // Sincroniza o estado atual com os query params sem recarregar a página
  private sincronizarUrlComFiltros(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        categoria: this.categoriaSelecionada() !== 'todas' ? this.categoriaSelecionada() : null,
        busca: this.termoBusca() ? this.termoBusca() : null
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }
}