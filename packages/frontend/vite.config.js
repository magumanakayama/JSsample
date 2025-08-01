import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  // baseオプションは、GitHub Pagesでホスティングする際に必要
  // リポジトリ名に合わせて変更する
  // 例: https://ユーザー名.github.io/リポジトリ名
  base: '/JSsample/'
})
