import { setup, createPage } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

describe('index page', async () => {
  await setup({})

  it('displays the component', async () => {
    const page = await createPage('/')
    const element = await page.getByTestId('title').isVisible()

    expect(element).toBe(true)
  })
})
