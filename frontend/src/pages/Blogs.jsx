import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import BlogCard from '../components/BlogCard.jsx'

const categories = ['All', 'Technology', 'AI', 'Science', 'Business', 'Health', 'Lifestyle']

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All'

  const fetchBlogs = async (cat, pg) => {
    setLoading(true)
    const query = cat && cat !== 'All' ? `?category=${cat}&page=${pg}` : `?page=${pg}`
    const res = await axios.get(`/api/blogs${query}`)
    setBlogs(res.data.blogs)
    setTotalPages(res.data.pages)
    setLoading(false)
  }

  useEffect(() => {
    fetchBlogs(activeCategory, page)
  }, [activeCategory, page])

  const handleCategory = (cat) => {
    setPage(1)
    if (cat === 'All') setSearchParams({})
    else setSearchParams({ category: cat })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">All Blogs</h1>
        <p className="text-gray-500 mt-1">Explore human and AI-generated articles</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm border transition font-medium ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-20">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-400 py-20">No blogs found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:bg-indigo-600 hover:text-white hover:border-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:bg-indigo-600 hover:text-white hover:border-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

export default Blogs
