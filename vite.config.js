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
        calcularApp: resolve(__dirname, 'ferramentas/calcular-app-rio/index.html'),
        calcularRL: resolve(__dirname, 'ferramentas/calcular-reserva-legal/index.html'),
        visualizadorGis: resolve(__dirname, 'ferramentas/visualizador-gis-online/index.html'),
        calcularAreaBasal: resolve(__dirname, 'ferramentas/calcular-area-basal/index.html'),
        calcularArvoresHa: resolve(__dirname, 'ferramentas/calcular-arvores-por-hectare/index.html'),
        calcularVolumeLenha: resolve(__dirname, 'ferramentas/calcular-volume-lenha/index.html'),
        calcularDeclividade: resolve(__dirname, 'ferramentas/conversor-declividade/index.html'),
        conversorDapCap: resolve(__dirname, 'ferramentas/conversor-dap-cap/index.html'),
        moduloFiscal: resolve(__dirname, 'ferramentas/modulo-fiscal/index.html'),
      }
    }
  }
});
