import { setup, createPage } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

describe('weather page', async () => {
  await setup({})

  it('displays the container', async () => {
    const page = await createPage('/weather')
    const container = await page.getByTestId('weather-viewer-container').isVisible()

    expect(container).toBe(true)
  })
})
