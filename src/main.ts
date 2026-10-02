import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; 

// Inicializa a aplicação no lado do cliente (browser) utilizando a arquitetura Standalone
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));