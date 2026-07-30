import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import BlogCard from "../components/BlogCard";

const categories = [
  "Technology",
  "AI",
  "Science",
  "Business",
  "Health",
  "Lifestyle",
];

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Newsletter States
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    axios
      .get("/api/blogs?limit=6")
      .then((res) => {
        setBlogs(res.data.blogs || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribing(true);

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_key: "17067777-eb0c-4d4b-8039-e3b51331296e",
            subject: "New Newsletter Subscription 📩",
            email,
            message: `New subscriber: ${email}`,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you for subscribing!");
        setEmail("");
      } else {
        toast.error("Subscription failed. Try again.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm bg-gray-50">
          ✨ AI Powered Blogging Platform
        </div>

        <h1 className="mt-8 text-5xl md:text-6xl font-black text-gray-900 leading-tight">
          Your own blogging
          <br />
          platform.
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-gray-500 text-lg">
          Create, publish and explore amazing blogs with AI-powered
          content generation. Share your stories with the world.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto mt-10 flex border rounded-xl overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 outline-none"
          />

          <button className="bg-black text-white px-8 font-medium">
            Search
          </button>
        </div>

        {/* Categories */}
        <div className="flex justify-center flex-wrap gap-3 mt-8">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/blogs?category=${cat}`}
              className="px-5 py-2 border border-gray-200 rounded-full text-sm hover:bg-black hover:text-white transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Latest Articles
          </h2>

          <Link
            to="/blogs"
            className="font-semibold text-black hover:underline"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading blogs...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No blogs found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20 mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why AI Blog?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-bold mb-2">AI Writing</h3>
              <p className="text-gray-500 text-sm">
                Generate complete blogs instantly using AI.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold mb-2">Fast Publishing</h3>
              <p className="text-gray-500 text-sm">
                Create and publish content in seconds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-bold mb-2">Secure Auth</h3>
              <p className="text-gray-500 text-sm">
                JWT authentication keeps your account secure.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-bold mb-2">Responsive</h3>
              <p className="text-gray-500 text-sm">
                Works perfectly on mobile, tablet and desktop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold mb-4">
            Never Miss a Blog!
          </h2>

          <p className="text-gray-500 mb-8">
            Subscribe to get the latest blogs, AI updates and news.
          </p>

          <form onSubmit={handleSubscribe}>
            <div className="flex flex-col md:flex-row border rounded-xl overflow-hidden shadow-sm">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 outline-none"
              />

              <button
                type="submit"
                disabled={subscribing}
                className="bg-black text-white px-10 py-4"
              >
                {subscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;


// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import BlogCard from '../components/BlogCard.jsx'

// const categories = ['Technology', 'AI', 'Science', 'Business', 'Health', 'Lifestyle']

// const Home = () => {
//   const [blogs, setBlogs] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     axios.get('/api/blogs?limit=6').then((res) => {
//       setBlogs(res.data.blogs)
//       setLoading(false)
//     })
//   }, [])

//   return (
//     <div>
//       {/* ── Hero ── */}
//       <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
//         <div>
//           <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
//             ✦ Powered by Gemini AI
//           </span>
//           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900 mb-4">
//             Write. Generate.<br />
//             <span className="text-indigo-600">Publish.</span>
//           </h1>
//           <p className="text-gray-500 text-lg mb-8 max-w-md">
//             A modern blog platform where AI helps you create compelling content.
//             Generate full blog posts from just a topic — in seconds.
//           </p>
//           <div className="flex gap-3 flex-wrap">
//             <Link to="/blogs" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
//               Explore Blogs
//             </Link>
//             <Link to="/create" className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition">
//               Write with AI
//             </Link>
//           </div>
//         </div>

//         {/* Demo card */}
//         <div className="hidden md:flex justify-center">
//           <div className="bg-white rounded-2xl shadow-xl p-8 w-72 flex flex-col gap-3">
//             <div className="h-3 bg-gray-200 rounded-full w-3/5"></div>
//             <div className="h-3 bg-gray-100 rounded-full"></div>
//             <div className="h-3 bg-gray-100 rounded-full"></div>
//             <div className="h-3 bg-gray-200 rounded-full w-4/5"></div>
//             <div className="h-3 bg-gray-100 rounded-full w-2/3"></div>
//             <span className="text-indigo-600 text-sm font-semibold mt-2">✦ AI is writing...</span>
//           </div>
//         </div>
//       </section>

//       {/* ── Categories ── */}
//       <section className="border-t border-b border-gray-200 py-8 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-lg font-bold mb-4 text-gray-800">Browse by Category</h2>
//           <div className="flex gap-3 flex-wrap">
//             {categories.map((cat) => (
//               <Link
//                 key={cat}
//                 to={`/blogs?category=${cat}`}
//                 className="border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition"
//               >
//                 {cat}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Latest Blogs ── */}
//       <section className="max-w-6xl mx-auto px-4 py-14">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
//           <Link to="/blogs" className="text-indigo-600 font-semibold text-sm hover:underline">
//             View All →
//           </Link>
//         </div>
//         {loading ? (
//           <p className="text-center text-gray-400 py-16">Loading blogs...</p>
//         ) : blogs.length === 0 ? (
//           <p className="text-center text-gray-400 py-16">No blogs yet. Be the first to write one!</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {blogs.map((blog) => (
//               <BlogCard key={blog._id} blog={blog} />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* ── Features ── */}
//       <section className="bg-white border-t border-gray-200 py-16">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Why AI Blog?</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { icon: '🤖', title: 'AI-Powered Writing', desc: 'Generate full blog posts from a single topic using Google Gemini AI.' },
//               { icon: '🔐', title: 'Secure Auth', desc: 'JWT-based authentication keeps your account and content safe.' },
//               { icon: '📝', title: 'Full CRUD', desc: 'Create, edit, and delete your blogs anytime from your dashboard.' },
//               { icon: '📱', title: 'Responsive Design', desc: 'Works beautifully on all screen sizes, mobile to desktop.' },
//             ].map((f) => (
//               <div key={f.title} className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
//                 <span className="text-3xl block mb-3">{f.icon}</span>
//                 <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
//                 <p className="text-gray-500 text-sm">{f.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Home
