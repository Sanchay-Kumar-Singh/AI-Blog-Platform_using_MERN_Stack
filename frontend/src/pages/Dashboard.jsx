import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

const Dashboard = () => {
  const { user } = useAuth()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/blogs/my').then((res) => {
      setBlogs(res.data)
      setLoading(false)
    })
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return
    await axios.delete(`/api/blogs/${id}`)
    setBlogs(blogs.filter((b) => b._id !== id))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back,{' '}
            <span className="font-semibold text-gray-700">{user?.name}</span>
            {' '}— {blogs.length} blog{blogs.length !== 1 ? 's' : ''} published
          </p>
        </div>
        <Link
          to="/create"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition text-sm self-start sm:self-auto"
        >
          + New Blog
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-20">Loading...</p>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-4">
          <p className="text-gray-400">You haven&apos;t written any blogs yet.</p>
          <Link
            to="/create"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition text-sm"
          >
            Write your first blog
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Title</th>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Category</th>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Date</th>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">AI</th>
                <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="font-medium text-gray-900 hover:text-indigo-600 transition line-clamp-1"
                    >
                      {blog.title}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-indigo-500 font-bold">
                    {blog.isAIGenerated ? '✦' : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/edit/${blog._id}`}
                        className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-200 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Dashboard
