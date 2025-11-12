"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [blogs, setBlogs] = useState<any[]>([])
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) console.log("complete the data")
    try {
      let res = await axios.post("/api/create", { title, content })
      setTitle("")
      setContent("")
      console.log("Blog Saved Successfully")
    } catch (error) {
      console.log("error in blog saving :", error)
    }
  }
  async function handlePosts(e: React.FormEvent) {
    try {

      let res = await axios.get("/api/getblog")
      setBlogs(res.data.blogs)
    } catch (error) {
      console.log("error in blog saving :", error)
    }
  }
  async function handleDelete(id: number) {
    try {

      await axios.delete(`/api/delete/${id}`);
      setBlogs(prev => prev.filter(b => b.id !== id))

    } catch (error) {
      console.log("error in blog saving :", error)
    }
  }
  async function handleEdit(id: number) {
    try {
      const [blog] = blogs.filter(b => b.id === id)
      const { title, content } = blog
      setTitle(title)
      setContent(content)
      await axios.delete(`/api/delete/${id}`);
      setBlogs(prev => prev.filter(b => b.id !== id))
    } catch (error) {
      console.log("error in blog editing :", error)
    }
  }
  useEffect(() => {
    handlePosts(new Event('submit') as any);
  }, [handleSubmit])

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">BlogNest</h1>
            <h5 className="text-lg md:text-xl text-purple-200 font-light">Create your blogs here</h5>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 mb-10 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={title}
                className="w-full px-5 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-lg"
                key={"title"}
                onChange={(t) => setTitle(t.target.value)}
                placeholder="Enter the Title"
              />
              <textarea
                value={content}
                className="w-full px-5 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent transition-all duration-300 h-40 resize-none text-base"
                key={"content"}
                onChange={(t) => setContent(t.target.value)}
                placeholder="Enter the Content"
              />
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 text-lg"
              >
                Save
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-8 text-center md:text-left">
              Your Blog Posts
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map(b => (
                <div
                  key={b.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 border border-white/20 hover:shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-2 transition-all duration-500 group"
                >
                  <div className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {b.title}
                  </div>
                  <div className="text-gray-300 mb-5 line-clamp-3">
                    {b.content}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(b.id)}
                      className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg shadow-md hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="flex-1 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}