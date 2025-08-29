import { createViteConfig } from 'vite-config-factory'

const entries = {
    'js/acf-icon-field-initializer': './source/js/acfIconFieldInitializer.ts',
    'css/acf-icon-field': './source/sass/acfIconField.scss',
}

export default createViteConfig(entries, {
  outDir: 'dist',
  manifestFile: 'manifest.json'
})