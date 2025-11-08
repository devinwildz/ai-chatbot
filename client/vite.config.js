import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        widget: './src/Widget-entry.jsx', // widget entry
      },
      output: {
        entryFileNames: (chunk) => {
          return chunk.name === "widget"
            ? "agent-widget-bundle.js" // output name for widget
            : "assets/[name]-[hash].js"
        }
      }
    }
  },
  server: {
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173
    }
  }
})
