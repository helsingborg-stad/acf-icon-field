import { createViteConfig } from 'vite-config-factory'

const entries = {
    'js/acf-icon-field-initializer': './source/js/acfIconFieldInitializer.ts',
    'css/main-map': './source/sass/main.scss',
}

export default createViteConfig(entries, {
  outDir: 'dist',
  manifestFile: 'manifest.json'
})