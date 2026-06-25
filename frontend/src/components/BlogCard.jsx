import { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  const [imgError, setImgError] = useState(false)

  const date = new Date(blog.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      {blog.coverImage && !imgError && (
        <div className="h-44 overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wide text-indigo-600">
            {blog.category}
          </span>
          {blog.isAIGenerated && (
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
              ✦ AI
            </span>
          )}
        </div>

        <h3 className="font-bold text-gray-900 text-base leading-snug">
          <Link to={`/blogs/${blog._id}`} className="hover:text-indigo-600 transition">
            {blog.title}
          </Link>
        </h3>

        <p className="text-gray-500 text-sm flex-1 line-clamp-2">
          {blog.excerpt || blog.content.slice(0, 120) + '...'}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-3 mt-1">
          <span>
            By <span className="font-medium text-gray-600">{blog.author?.name || 'Unknown'}</span>
          </span>
          <span>{date}</span>
        </div>

        <Link
          to={`/blogs/${blog._id}`}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition mt-1"
        >
          Read More →
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
