import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Define a rota curinga para abranger todas as páginas do portal
    path: '**',
    
    // Configura o modo de renderização estática antecipada (Prerender) via SSR
    renderMode: RenderMode.Prerender
  }
];