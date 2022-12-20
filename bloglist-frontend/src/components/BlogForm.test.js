import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogForm } from './BlogForm'

describe('<BlogForm />', () => {
  const mockCreateHandler = jest.fn()
  let container

  const formExample = {
    title: 'Title testing',
    author: 'Author testing',
    url: 'Url testing'
  }

  beforeEach(() => {
    container = render(
      <BlogForm createBlog={mockCreateHandler} />
    ).container
  })

  test('a test for the new blog form', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.btnToggleComponent')
    await user.click(button)

    const inputTitle = container.querySelector('input[name="Title"]')
    const inputAuthor = container.querySelector('input[name="Author"]')
    const inputUrl = container.querySelector('input[name="Url"]')
    const sendButton = container.querySelector('.saveBlog')

    await user.type(inputTitle, formExample.title)
    await user.type(inputAuthor, formExample.author)
    await user.type(inputUrl, formExample.url)
    await user.click(sendButton)
    expect(mockCreateHandler.mock.calls).toHaveLength(1)
    expect(mockCreateHandler.mock.calls[0][0].title).toBe(formExample.title)
    expect(mockCreateHandler.mock.calls[0][0].author).toBe(formExample.author)
    expect(mockCreateHandler.mock.calls[0][0].url).toBe(formExample.url)
  })
})