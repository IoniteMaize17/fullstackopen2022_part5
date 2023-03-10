import { useState } from 'react'

export const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
                    title:
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
                    author:
          <input type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
                    url:
          <input type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button className='saveBlog' type="submit">create</button>
        </div>
      </form>
    </div>
  )
}