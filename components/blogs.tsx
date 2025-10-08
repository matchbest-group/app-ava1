"use client"

import Image from "next/image"
import Link from "next/link"

export function Blogs() {
  const blogItems = [
    {
      id: 1,
      title: "FutureTech Trends 2025",
      description:
        "An ebook that predicts upcoming technology trends for the next year, including AI developments",
      image: "/FutureTech Trends 2024.png",
      link: "/blogs/FutureBlogs",
    },
    {
      id: 2,
      title: "AI in Everyday Life",
      description:
        "An insightful ebook exploring how artificial intelligence is transforming daily routines, workplaces, and personal experiences worldwide.",
      image: "/AI in Everyday Life.jpeg",
      link: "/blogs/AiBlogs",
    },
    {
      id: 3,
      title: "The Rise of Green Technology",
      description:
        "A detailed guide on sustainable innovations shaping the future — from renewable energy breakthroughs to eco-friendly digital solutions.",
      image: "/The Rise of Green Technology.png",
      link: "/blogs/RiseBlogs",
    },
  ]

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
          <Link key={blog.id} href={blog.link} className="block">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition h-full">
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
          </Link>
        ))}
      </div>
    </section>
  )
}
