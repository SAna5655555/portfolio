import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

const REPO_NAME = 'portfolio'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'watch-public-md',
      configureServer(server) {
        const projectsDir = path.resolve('public/projects')
        if (!fs.existsSync(projectsDir)) return

        try {
          fs.watch(projectsDir, { recursive: true }, (_, filename) => {
            if (filename && filename.endsWith('.md')) {
              server.ws.send({ type: 'full-reload' })
            }
          })
        } catch {}
      },
    },
  ],
  base: `/${REPO_NAME}/`,
})