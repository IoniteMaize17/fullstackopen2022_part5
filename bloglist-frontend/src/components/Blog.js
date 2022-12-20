import { useState } from 'react'

export const Blog = ({ blog, handlePlusLike, handleRemove, isRemove }) => {
  const [toggleDetail, setToggleDetail] = useState(false)

  const handelToggleDetail = () => {
    setToggleDetail(!toggleDetail)
  }

  const handleLike = () => {
    handlePlusLike(blog)
  }

  const handleRemoveBlog = async () => {
    const status = await window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (status) handleRemove(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div><span className='titleAndAuthor'>{blog.title} {blog.author}</span> <button className='btnDetailInfo' onClick={handelToggleDetail}>{toggleDetail ? 'hide' : 'view'}</button></div>
      {toggleDetail ? (
        <div className='blogInfoDetail'>
          <div>{blog.url}</div>
          <div className='infoLike'>likes {blog.likes} <button className='btnLike' onClick={handleLike}>like</button></div>
          <div>{blog.user.name}</div>
          {isRemove ? (
            <div><button className='btnRemove' onClick={handleRemoveBlog}>remove</button></div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}