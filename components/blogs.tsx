"use client"

import Image from "next/image"

export function Blogs() {
  const blogItems = [
    {
      id: 1,
      title: "FutureTech Trends 2024",
      description:
        "An ebook that predicts upcoming technology trends for the next year, including AI developments",
      image: "/blog1.png",
    },
    {
      id: 2,
      title: "FutureTech Trends 2024",
      description:
        "An ebook that predicts upcoming technology trends for the next year, including AI developments",
      image: "/blog1.png",
    },
    {
      id: 3,
      title: "FutureTech Trends 2024",
      description:
        "An ebook that predicts upcoming technology trends for the next year, including AI developments",
      image: "/blog1.png",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-4 text-center">
        Latest <span className="text-[#4B6CEB]">Insights</span> & Blogs
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Stay updated with the latest trends, guides, and tips from our experts.
      </p>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogItems.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            {/* Blog Image */}
            <Image
              src={blog.image}
              alt={blog.title}
              width={400}
              height={250}
              className="w-full h-56 object-cover"
            />

            {/* Blog Content */}
            <div className="p-6 flex flex-col justify-between h-[220px]">
              <div>
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-600">{blog.description}</p>
              </div>

              <button className="mt-4 w-full border border-[#4B6CEB] text-[#4B6CEB] py-2 rounded-md hover:bg-[#4B6CEB] hover:text-white transition">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
