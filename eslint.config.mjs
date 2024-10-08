// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default withNuxt({
  plugins: {
    prettier: eslintPluginPrettier
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': 'error'
  }
})
