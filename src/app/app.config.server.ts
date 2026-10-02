import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

// Configurações específicas para o ambiente de servidor (SSR)
const serverConfig: ApplicationConfig = {
  providers: [
    
    // Habilita a renderização no lado do servidor integrada com as rotas SSR
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

// Faz a fusão entre a configuração principal da aplicação e a configuração de servidor
export const config = mergeApplicationConfig(appConfig, serverConfig);