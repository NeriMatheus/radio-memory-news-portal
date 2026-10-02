import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsCardComponent } from './news-card.component';
import { Card } from '../../models/card.model';
import { vi } from 'vitest';

// Objeto mock isolado do bloco de testes para manter a configuração limpa
const mockCard: Card = {
  id: 1,
  titulo: 'Notícia de Teste',
  subtitulo: 'Subtítulo de teste',
  corpo: '<p>Conteúdo</p>',
  urlPost: 'https://site.com',
  imgUrl: '',
  autor: 'Autor Teste',
  status: 1,
  data: '2026-03-30T10:00:00Z',
  categoria: 'Tecnologia'
};

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    
    // Injeta o mock respeitando a interface obrigatória do componente
    component.card = { ...mockCard };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Valida se a interação do usuário emite a informação correta para o componente pai
  it('deve emitir o card ao clicar', () => {
    vi.spyOn(component.abrir, 'emit');
    component.onClick();
    expect(component.abrir.emit).toHaveBeenCalledWith(component.card);
  });

  // Valida a regra de negócio: cards com data_fixo maior que a data atual ganham destaque
  it('deve identificar o card como fixado se data_fixo for no futuro', () => {
    const dataFutura = new Date();
    dataFutura.setDate(dataFutura.getDate() + 1);
    component.card.data_fixo = dataFutura.toISOString();
    
    // Re-executa o ciclo de vida para o componente recalcular o estado com a nova data
    component.ngOnInit();
    expect(component.isFixado).toBe(true);
  });

  // Valida a regra de negócio: cards com data_fixo expirada perdem o destaque
  it('não deve identificar como fixado se data_fixo for no passado', () => {
    const dataPassada = new Date();
    dataPassada.setDate(dataPassada.getDate() - 1);
    component.card.data_fixo = dataPassada.toISOString();
    
    // Re-executa o ciclo de vida para o componente recalcular o estado com a nova data
    component.ngOnInit();
    expect(component.isFixado).toBe(false);
  });
});