import { useState, useEffect, useRef  } from 'react'
import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { Togglable } from './components/Togglable'
import { Notification } from './components/Notification'
import { blogService } from './services/blogs'
import { loginService } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllData()
    }
  }, [])

  const getAllData = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const pushErrorNotification = (err) => {
    setNotification(err)
    setNotificationType('e')
    autoRemoveNotification()
  }

  const pushSuccessNotification = (err) => {
    setNotification(err)
    setNotificationType('s')
    autoRemoveNotification()
  }

  const autoRemoveNotification = () => {
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, 5000)
  }

  const handleLogin = async  (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogListAppUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      getAllData()
      setUsername('')
      setPassword('')
    } catch (exception) {
      pushErrorNotification('wrong username or password')
    }
  }

  const handleLogut = () => {
    window.localStorage.removeItem('loggedBlogListAppUser')
    setUser(null)
    setBlogs([])
  }

  const handleCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      pushSuccessNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setBlogs(blogs.concat({
        ...returnedBlog,
        user: {
          name: user.name,
          username: user.username,
        }
      }))
    } catch (exception) {
      pushErrorNotification('create failed')
    }
  }

  const handlePlusLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        title: blog.title,
        url: blog.url,
        author: blog.author,
        likes: blog.likes + 1
      })
      // update with like client
      const cloneBlogs = [...blogs]
      const targetBlog = cloneBlogs.find(f => f.id === blog.id)
      if (targetBlog) targetBlog.likes = updatedBlog.likes
      setBlogs(cloneBlogs)
    } catch (exception) {
      pushErrorNotification('Like failed')
    }
  }

  const handleRemove = async (blog) => {
    try {
      await blogService.remove(blog.id)
      const cloneBlogs = [...blogs]
      cloneBlogs.splice(cloneBlogs.indexOf(blog), 1)
      setBlogs(cloneBlogs)
    } catch (exception) {
      pushErrorNotification('remove failed')
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={handleCreate} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification messages={notification} type={notificationType} />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification messages={notification} type={notificationType} />
      <p>{user.name} logged in <button onClick={handleLogut}>logout</button></p>
      { blogForm() }
      {blogs.sort((a, b) => {
        return b.likes - a.likes
      }).map(blog =>
        <Blog key={blog.id} blog={blog} handlePlusLike={handlePlusLike} handleRemove={handleRemove} isRemove={user.username === blog.user.username} />
      )}
    </div>
  )
}

export default App
