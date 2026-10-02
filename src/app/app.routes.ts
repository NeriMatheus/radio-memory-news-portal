import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rota raiz que carrega o componente principal do portal
  { 
    path: '', 
    loadComponent: () => import('./app.component').then(m => m.AppComponent) 
  },
  // Redirecionamento de segurança para rotas inválidas
  { 
    path: '**', 
    redirectTo: '' 
  }
];