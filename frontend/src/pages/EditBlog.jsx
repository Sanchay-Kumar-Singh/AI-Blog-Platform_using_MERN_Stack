import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const categories = ['Technology', 'AI', 'Science', 'Business', 'Health', 'Lifestyle']
const inputCls = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition bg-white'
const labelCls = 'block text-sm font-semibold text-gray-700 mb-1.5'

const EditBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', content: '', excerpt: '',
    category: '', tags: '', coverImage: '',
  })
  const [imagePreview, setImagePreview] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    axios.get(`/api/blogs/${id}`).then((res) => {
      const b = res.data
      setForm({
        title: b.title,
        content: b.content,
        excerpt: b.excerpt || '',
        category: b.category,
        tags: b.tags?.join(', ') || '',
        coverImage: b.coverImage || '',
      })
      if (b.coverImage) setImagePreview(b.coverImage)
    })
  }, [id])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleCoverImageChange = (e) => {
    const url = e.target.value
    setForm({ ...form, coverImage: url })
    setImagePreview(url)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      }
      await axios.put(`/api/blogs/${id}`, payload)
      navigate(`/blogs/${id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Edit Blog</h1>

      {error && (
        <p className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 text-sm mb-5">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className={labelCls}>Title *</label>
          <input name="title" value={form.title} onChange={handleChange} required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Excerpt</label>
          <input name="excerpt" value={form.excerpt} onChange={handleChange} className={inputCls} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Tags (comma separated)</label>
            <input name="tags" value={form.tags} onChange={handleChange} className={inputCls} />
          </div>
        </div>

        {/* Cover Image URL */}
        <div>
          <label className={labelCls}>Cover Image URL</label>
          <input
            type="url"
            name="coverImage"
            value={form.coverImage}
            onChange={handleCoverImageChange}
            placeholder="https://example.com/image.jpg"
            className={inputCls}
          />
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Cover preview"
                className="w-full max-h-52 object-cover rounded-lg border border-gray-200"
                onError={() => setImagePreview('')}
              />
              <p className="text-xs text-gray-400 mt-1">Cover image preview</p>
            </div>
          )}
        </div>

        <div>
          <label className={labelCls}>Content *</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={14}
            className={`${inputCls} resize-y leading-relaxed`}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition self-start"
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

export default EditBlog
