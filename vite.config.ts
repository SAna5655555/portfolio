import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

const REPO_NAME = 'portfolio'

function watchPublicMdPlugin(): import('vite').Plugin {
  const mdFiles = new Set<string>()

  function scanMd(dir: string) {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        scanMd(full)
      } else if (entry.name.endsWith('.md')) {
        mdFiles.add(full)
      }
    }
  }

  return {
    name: 'watch-public-md',
    configResolved() {
      scanMd(path.resolve('public/projects'))
    },
    configureServer(server) {
      for (const file of mdFiles) {
        server.watcher.add(file)
      }
      server.watcher.on('change', (changedPath) => {
        if (changedPath.endsWith('.md') && changedPath.includes('public' + path.sep + 'projects')) {
          server.ws.send({ type: 'full-reload' })
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), watchPublicMdPlugin()],
  base: `/${REPO_NAME}/`,
})