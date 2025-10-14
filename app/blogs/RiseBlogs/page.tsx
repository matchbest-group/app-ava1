import React from 'react';
import Image from 'next/image';

const RiseBlogs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16">
          {/* Main Heading */}
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Rise of Green Technology
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Exploring how sustainable innovations are transforming industries and paving the way for a cleaner, more efficient future.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 min-h-screen">
          {/* Article Content */}
          <div className="lg:col-span-2 space-y-8">
            <article className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Green Revolution: Transforming Our World
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                In recent years, green technology has emerged as one of the most significant forces reshaping our world.
                From renewable energy solutions to sustainable manufacturing processes, the green tech revolution is not just
                an environmental movement—it's a fundamental shift in how we approach business, technology, and daily life.
              </p>

              <div className="my-8">
                <Image
                  src="/diverse-business-professionals-using-technology-in.png"
                  alt="Sustainable Business Practices"
                  width={600}
                  height={300}
                  className="rounded-lg shadow-md w-full"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Renewable Energy: Powering the Future
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                Solar and wind energy technologies have advanced dramatically, making renewable energy more accessible and
                cost-effective than ever before. Major corporations are investing billions in clean energy infrastructure,
                signaling a permanent shift away from fossil fuels.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                The integration of smart grid technology and energy storage solutions is solving one of renewable energy's
                biggest challenges: intermittency. Advanced battery technologies and AI-powered grid management systems
                ensure that clean energy is available when and where it's needed most.
              </p>

              <div className="my-8">
                <Image
                  src="/modern-office-workspace-with-multiple-screens-show.png"
                  alt="Modern Green Technology Workspace"
                  width={600}
                  height={300}
                  className="rounded-lg shadow-md w-full"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Sustainable Manufacturing and Circular Economy
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                The concept of circular economy is gaining traction across industries. Companies are redesigning products
                with their entire lifecycle in mind—from sourcing sustainable materials to ensuring products can be easily
                recycled or repurposed at end of life.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                3D printing and advanced materials science are enabling more efficient manufacturing processes that produce
                less waste and use fewer resources. Smart factories equipped with IoT sensors and AI optimization are
                minimizing energy consumption while maximizing output.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                The Economic Impact
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                The green technology sector is creating millions of jobs worldwide. From research and development to
                installation and maintenance of renewable energy systems, green jobs are becoming some of the most
                in-demand positions in the global economy.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Investors are taking notice too. Green technology startups attracted record levels of funding, with
                venture capital firms recognizing that sustainability and profitability can go hand in hand.
              </p>
            </article>

            {/* Statistics Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Green Technology Impact Statistics
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$2.4T</div>
                  <p className="text-gray-600">Global green technology market value by 2027</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">11M</div>
                  <p className="text-gray-600">Jobs created in renewable energy sector</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">80%</div>
                  <p className="text-gray-600">Reduction in solar panel costs since 2010</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-8 lg:self-start lg:max-h-screen lg:overflow-y-auto space-y-6">
            {/* Author Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h4>
              <div className="flex items-center space-x-4">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Author"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h5 className="font-medium text-gray-900">Dr. Sarah Chen</h5>
                  <p className="text-sm text-gray-600">Sustainability Technology Expert</p>
                </div>
              </div>
            </div>

            {/* Related Topics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Related Topics</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Electric Vehicle Revolution
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Carbon Capture Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Sustainable Agriculture Tech
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Green Building Innovations
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-md p-6 text-white">
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="mb-4">Get the latest insights on green technology and sustainability trends.</p>
              <button className="w-full bg-white text-green-600 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiseBlogs;
