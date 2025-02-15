import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    eslintPlugin({
      // Параметры плагина
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'], // Указываем, какие файлы должны быть проверены
    }),
  ],
});
