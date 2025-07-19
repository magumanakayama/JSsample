import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // グローバル変数を有効にする
    environment: 'jsdom' // JSDOM環境でテストを実行
  }
});