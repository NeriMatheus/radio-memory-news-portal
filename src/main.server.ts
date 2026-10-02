import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; 
import { config } from './app/app.config.server';

// Função de bootstrap responsável por iniciar a aplicação no servidor (SSR)
const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(AppComponent, config, context);

export default bootstrap;