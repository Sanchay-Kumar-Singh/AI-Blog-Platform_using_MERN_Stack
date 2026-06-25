import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 mt-auto">
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h3 className="text-white text-xl font-bold mb-3">✦ AI Blog</h3>
        <p className="text-sm leading-relaxed">
          Powered by Google Gemini AI. Write smarter, publish faster.
        </p>
      </div>
      <div>
        <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Navigate</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/" className="hover:text-white transition">Home</Link></li>
          <li><Link to="/blogs" className="hover:text-white transition">All Blogs</Link></li>
          <li><Link to="/create" className="hover:text-white transition">Write a Blog</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Account</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
          <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
          <li><Link to="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
      © 2025 AI Blog. Built with MERN + Gemini AI.
    </div>
  </footer>
)

export default Footer
