import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const categories = ['Technology', 'AI', 'Science', 'Business', 'Health', 'Lifestyle']
const inputCls = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition bg-white'
const labelCls = 'block text-sm font-semibold text-gray-700 mb-1.5'

const CreateBlog = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', content: '', excerpt: '',
    category: 'Technology', tags: '', coverImage: '',
  })
  const [imagePreview, setImagePreview] = useState('')
  const [aiTopic, setAiTopic] = useState('')
  const [aiImage, setAiImage] = useState('')
  const [aiImagePreview, setAiImagePreview] = useState('')
  const [generating, setGenerating] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [isAIGenerated, setIsAIGenerated] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleCoverImageChange = (e) => {
    const url = e.target.value
    setForm({ ...form, coverImage: url })
    setImagePreview(url)
  }

  const handleAiImageChange = (e) => {
    const url = e.target.value
    setAiImage(url)
    setAiImagePreview(url)
  }

  const handleGenerate = async () => {
    if (!aiTopic.trim()) return setError('Enter a topic to generate')
    setGenerating(true)
    setError('')
    try {
      const res = await axios.post('/api/ai/generate', {
        topic: aiTopic,
        category: form.category,
      })
      setForm({
        title: res.data.title,
        content: res.data.content,
        excerpt: res.data.excerpt,
        category: form.category,
        tags: res.data.tags?.join(', ') || '',
        coverImage: aiImage,
      })
      setImagePreview(aiImage)
      setIsAIGenerated(true)
    } catch (err) {
      setError(err.response?.data?.message || 'AI generation failed')
    }
    setGenerating(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        isAIGenerated,
      }
      const res = await axios.post('/api/blogs', payload)
      navigate(`/blogs/${res.data._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog')
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Write a Blog</h1>

      {/* AI Generator Box */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6 mb-8">
        <h3 className="text-indigo-700 font-bold text-lg mb-1">✦ Generate with Gemini AI</h3>
        <p className="text-gray-500 text-sm mb-4">
          Enter a topic + optional cover image URL, then let AI write the blog
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <input
            type="text"
            placeholder="e.g. Future of Electric Cars in India"
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            className="flex-1 border border-indigo-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-500 bg-white"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border border-indigo-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none"
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            placeholder="Paste cover image URL for this AI blog (optional)"
            value={aiImage}
            onChange={handleAiImageChange}
            className="flex-1 border border-indigo-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-indigo-500 bg-white"
          />
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap"
          >
            {generating ? 'Generating...' : 'Generate ✦'}
          </button>
        </div>

        {aiImagePreview && (
          <div className="mt-4">
            <img
              src={aiImagePreview}
              alt="AI cover preview"
              className="w-full max-h-48 object-cover rounded-lg border border-indigo-100"
              onError={() => setAiImagePreview('')}
            />
            <p className="text-xs text-gray-400 mt-1">Cover image preview</p>
          </div>
        )}
      </div>

      {error && (
        <p className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 text-sm mb-5">
          {error}
        </p>
      )}

      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className={labelCls}>Title *</label>
          <input name="title" value={form.title} onChange={handleChange} required placeholder="Blog title" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Excerpt</label>
          <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Short summary (optional)" className={inputCls} />
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
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="react, nodejs, ai" className={inputCls} />
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
            placeholder="Write your blog content here..."
            className={`${inputCls} resize-y leading-relaxed`}
          />
        </div>

        {isAIGenerated && (
          <p className="text-indigo-600 text-sm font-semibold">✦ This content was generated by Gemini AI</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition self-start"
        >
          {submitting ? 'Publishing...' : 'Publish Blog'}
        </button>
      </form>
    </div>
  )
}

export default CreateBlog
