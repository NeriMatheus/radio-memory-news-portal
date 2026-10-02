import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterSectionComponent } from './filter-section.component';
import { vi } from 'vitest'; 

describe('FilterSectionComponent', () => {
  let component: FilterSectionComponent;
  let fixture: ComponentFixture<FilterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TESTES
  // Verifica se o componente foi criado com sucesso
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verifica se a alteração no termo de busca emite corretamente os eventos para o componente pai
  it('deve emitir o termo de busca e acionar o filtro', () => {
    vi.spyOn(component.termoBuscaChange, 'emit');
    vi.spyOn(component.filtrar, 'emit');

    const novoTermo = 'Radio Memory';
    component.onBuscaChange(novoTermo);

    expect(component.termoBusca).toBe(novoTermo);
    expect(component.termoBuscaChange.emit).toHaveBeenCalledWith(novoTermo);
    expect(component.filtrar.emit).toHaveBeenCalled();
  });

  // Verifica se a alteração na categoria selecionada emite corretamente os eventos para o componente pai.
  it('deve emitir a categoria selecionada e acionar o filtro', () => {
    vi.spyOn(component.categoriaSelecionadaChange, 'emit');
    vi.spyOn(component.filtrar, 'emit');

    const novaCategoria = 'blog';
    component.onCategoriaChange(novaCategoria);

    expect(component.categoriaSelecionada).toBe(novaCategoria);
    expect(component.categoriaSelecionadaChange.emit).toHaveBeenCalledWith(novaCategoria);
    expect(component.filtrar.emit).toHaveBeenCalled();
  });
});