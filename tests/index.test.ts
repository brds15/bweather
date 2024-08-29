import { setup, createPage } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

describe('index page', async () => {
  await setup({})

  it('displays the title', async () => {
    const page = await createPage('/')
    const title = await page.getByTestId('title').isVisible()
    const title2 = await page.getByTestId('title2').isVisible()
    const icon = await page.getByTestId('search-form-input').isVisible()

    expect(title).toBe(true)
    expect(title2).toBe(true)
    expect(icon).toBe(true)
  })

  it('displays form', async () => {
    const page = await createPage('/')
    const form = await page.getByTestId('search-form').isVisible()
    const input = await page.getByTestId('search-form-input').isVisible()
    const button = await page.getByTestId('search-form-button').isVisible()

    expect(form).toBe(true)
    expect(input).toBe(true)
    expect(button).toBe(true)
  })
})
