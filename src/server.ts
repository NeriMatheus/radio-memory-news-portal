import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

// Define o diretório onde se encontram os ficheiros estáticos do cliente compilados
const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Configuração para servir ficheiros estáticos a partir da pasta /browser
 * com cache otimizada por 1 ano para máxima performance.
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Processa todas as demais requisições renderizando a aplicação Angular no servidor (SSR).
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Inicia o servidor HTTP caso o módulo seja executado diretamente ou via PM2.
 * Utiliza a porta definida na variável de ambiente PORT ou assume a porta 4000 por defeito.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Gestor de requisições utilizado pelo Angular CLI (servidor de desenvolvimento/build) ou funções de nuvem.
 */
export const reqHandler = createNodeRequestHandler(app);