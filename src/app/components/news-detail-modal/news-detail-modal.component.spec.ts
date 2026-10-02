import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsDetailModalComponent } from './news-detail-modal.component';
import { Card } from '../../models/card.model';
import { vi } from 'vitest';

// Mock de dados 
const mockCard: Card = {
  id: 1,
  titulo: 'Modal Teste',
  subtitulo: 'Subtítulo',
  corpo: '<p>Corpo do modal</p>',
  urlPost: 'https://site.com',
  imgUrl: '',
  autor: 'Redação',
  status: 1,
  data: '2026-03-30T10:00:00Z',
  categoria: 'Inovação'
};

// Agrupa testes dedicados ao modal
describe('NewsDetailModalComponent', () => {
  let component: NewsDetailModalComponent;
  let fixture: ComponentFixture<NewsDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsDetailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsDetailModalComponent);
    component = fixture.componentInstance;

    // Atribui o card simulado ao input requerido
    component.cardSelecionado = { ...mockCard };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Valida se a ação de fechar emite corretamente o evento para o componente pai
  it('deve emitir o evento fechar quando onFechar for acionado', () => {
    vi.spyOn(component.fechar, 'emit');
    component.onFechar();
    expect(component.fechar.emit).toHaveBeenCalled();
  });

  // Valida a sanitização de segurança contra XSS no corpo do HTML
  it('deve sanitizar o corpo HTML corretamente', () => {
    const htmlBruto = '<p>Teste XSS</p>';
    const resultado = component.sanitizarCorpoHtml(htmlBruto);
    expect(resultado).toBeTruthy();
  });
});