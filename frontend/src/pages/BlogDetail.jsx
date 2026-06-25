import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

const BlogDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    axios.get(`/api/blogs/${id}`).then((res) => {
      setBlog(res.data)
      setLoading(false)
    })
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this blog?')) return
    await axios.delete(`/api/blogs/${id}`)
    navigate('/blogs')
  }

  if (loading) return <p className="text-center text-gray-400 py-20">Loading...</p>
  if (!blog) return <p className="text-center text-gray-400 py-20">Blog not found.</p>

  const isAuthor = user && user._id === blog.author?._id
  const date = new Date(blog.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Cover Image */}
      {blog.coverImage && !imgError && (
        <div className="w-full max-h-96 overflow-hidden rounded-xl mb-8">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            {blog.category}
          </span>
          {blog.isAIGenerated && (
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
              ✦ AI Generated
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>By <span className="font-semibold text-gray-600">{blog.author?.name}</span></span>
          <span>•</span>
          <span>{date}</span>
        </div>
        {isAuthor && (
          <div className="flex gap-3 mt-1">
            <Link
              to={`/edit/${blog._id}`}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="text-gray-700 leading-relaxed space-y-5 text-[1.05rem]">
        {blog.content.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-200">
          {blog.tags.map((tag) => (
            <span key={tag} className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <Link to="/blogs" className="inline-block mt-8 text-gray-400 text-sm hover:text-indigo-600 transition">
        ← Back to Blogs
      </Link>
    </div>
  )
}

export default BlogDetail
