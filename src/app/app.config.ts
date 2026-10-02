import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [

    // Registo de escuta de erros globais do navegador
    provideBrowserGlobalErrorListeners(),

    // Configuração das rotas da aplicação
    provideRouter(routes), 

    // Habilita a hidratação do cliente integrada com SSR
    provideClientHydration(),
    
    // Fornece o HttpClient para injeção global de serviços de rede
    provideHttpClient()
  ]
};