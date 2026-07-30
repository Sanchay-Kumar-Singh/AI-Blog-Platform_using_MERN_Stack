import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import BlogCard from "../components/BlogCard";
import API from "../api/axios.js";

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

  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);


  useEffect(() => {
    API
      .get("/api/blogs?limit=6")
      .then((res) => {
        setBlogs(res.data.blogs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
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

      {/* Hero */}
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


        <div className="max-w-xl mx-auto mt-10 flex border rounded-xl overflow-hidden shadow-sm">

          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="flex-1 px-4 py-3 outline-none"
          />

          <button className="bg-black text-white px-8 font-medium">
            Search
          </button>

        </div>


        <div className="flex justify-center flex-wrap gap-3 mt-8">

          {categories.map((cat)=>(
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



      {/* Blogs */}

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



        {
          loading ?

          (
            <div className="text-center py-20 text-gray-500">
              Loading blogs...
            </div>
          )

          :

          filteredBlogs.length === 0 ?

          (
            <div className="text-center py-20 text-gray-500">
              No blogs found.
            </div>
          )

          :

          (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {
                filteredBlogs.map((blog)=>(
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                  />
                ))
              }

            </div>

          )

        }


      </section>




      {/* Features */}

      <section className="bg-gray-50 py-20 mt-10">

        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-12">
            Why AI Blog?
          </h2>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">


            {
              [
                {
                  icon:"🤖",
                  title:"AI Writing",
                  desc:"Generate complete blogs instantly using AI."
                },
                {
                  icon:"⚡",
                  title:"Fast Publishing",
                  desc:"Create and publish content in seconds."
                },
                {
                  icon:"🔒",
                  title:"Secure Auth",
                  desc:"JWT authentication keeps your account secure."
                },
                {
                  icon:"📱",
                  title:"Responsive",
                  desc:"Works perfectly on mobile, tablet and desktop."
                }
              ].map((item)=>(
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl border"
                >

                  <div className="text-4xl mb-4">
                    {item.icon}
                  </div>

                  <h3 className="font-bold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {item.desc}
                  </p>

                </div>
              ))
            }


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
                onChange={(e)=>setEmail(e.target.value)}
                className="flex-1 px-5 py-4 outline-none"
              />


              <button
                type="submit"
                disabled={subscribing}
                className="bg-black text-white px-10 py-4"
              >

                {
                  subscribing
                  ? "Subscribing..."
                  : "Subscribe"
                }

              </button>


            </div>


          </form>


        </div>


      </section>


    </div>
  );
};


export default Home;