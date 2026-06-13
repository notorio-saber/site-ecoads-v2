import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre/index.html'),
        servicos: resolve(__dirname, 'servicos/index.html'),
        apps: resolve(__dirname, 'apps/index.html'),
        cursos: resolve(__dirname, 'cursos/index.html'),
        ferramentas: resolve(__dirname, 'ferramentas/index.html'),
        coordenadas: resolve(__dirname, 'ferramentas/coordenadas.html'),
        unidades: resolve(__dirname, 'ferramentas/unidades.html'),
      }
    }
  }
});
