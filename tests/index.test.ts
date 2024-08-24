import { setup, createPage } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

describe('index page', async () => {
  await setup({})

  it('displays the component', async () => {
    const page = await createPage('/')
    console.log('page::', page)
    const lala = await page.getByTestId('title').isVisible()
    console.log('lala:::', lala)

    expect(lala).toBe(true)
  })
})
