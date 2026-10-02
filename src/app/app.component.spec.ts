import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

// Agrupa testes dedicados ao componente raiz
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])] 
    }).compileComponents();
  });

  // Verifica se o aplicativo inicializa corretamente
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Verifica se o cabeçalho corporativo está visível na tela
  it('deve renderizar o cabeçalho do portal', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-portal-header')).toBeTruthy();
  });

  // Verifica se o rodapé institucional está visível
  it('deve renderizar o rodapé do portal', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-portal-footer')).toBeTruthy();
  });
});