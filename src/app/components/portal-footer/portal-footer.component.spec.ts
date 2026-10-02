import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalFooterComponent } from './portal-footer.component';

describe('PortalFooterComponent', () => {
  let component: PortalFooterComponent;
  let fixture: ComponentFixture<PortalFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Valida se o componente do rodapé é instanciado corretamente na árvore de testes
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});