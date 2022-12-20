import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog } from './Blog'

describe('<Blog />', () => {
  const mockLikeHandler = jest.fn()
  const blog = {
    'title': 'Bai viet cua A.1',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    'likes': 13,
    'user': {
      'name': 'Nguyen Van A',
      'username': 'nguyenvana',
      'id': '639e7af0bc33b1675fa47e70'
    },
    'id': '639ec4889b2eb97483496ff6'
  }
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} handlePlusLike={mockLikeHandler} />
    ).container
  })

  test('renders blog infomation', () => {
    const divTitleAndAuthor = container.querySelector('.titleAndAuthor')
    const divBlogInfoDetail = container.querySelector('.blogInfoDetail')
    expect(divTitleAndAuthor).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )
    expect(divBlogInfoDetail).not.toBeInTheDocument()
  })

  test('renders blog detail infomation', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.btnDetailInfo')
    await user.click(button)
    const divBlogInfoDetail = container.querySelector('.blogInfoDetail')
    expect(divBlogInfoDetail).toBeInTheDocument()
  })

  test('like button is clicked twice', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.btnDetailInfo')
    await user.click(button)
    const btnLike = container.querySelector('.btnLike')
    await user.dblClick(btnLike)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})