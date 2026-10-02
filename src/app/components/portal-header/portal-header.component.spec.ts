import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalHeaderComponent } from './portal-header.component';

// Agrupa testes dedicados ao componente de cabeçalho
describe('PortalHeaderComponent', () => {
  let component: PortalHeaderComponent;
  let fixture: ComponentFixture<PortalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Valida se o componente do cabeçalho é instanciado corretamente na árvore de testes
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});