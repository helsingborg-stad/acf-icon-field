import { createViteConfig } from 'vite-config-factory'

const entries = {
    'css/main-map': './source/sass/main.scss',
}

export default createViteConfig(entries, {
  outDir: 'dist',
  manifestFile: 'manifest.json'
})