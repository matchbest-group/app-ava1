import React from 'react';
import Image from 'next/image';

const FutureBlog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16">
          {/* Main Heading */}
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Future Technology Trends 2025
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Exploring the cutting-edge technologies that will shape tomorrow's world, from quantum computing to space exploration and everything in between.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 min-h-screen">
          {/* Article Content */}
          <div className="lg:col-span-2 space-y-8">
            <article className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Technological Horizon: What's Coming Next
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                As we stand on the cusp of a new era, emerging technologies are poised to reshape every aspect of human
                civilization. From revolutionary computing paradigms to breakthroughs in biotechnology, the next decade
                promises innovations that will challenge our understanding of what's possible. These technologies aren't
                just incremental improvements—they represent fundamental shifts in how we interact with reality itself.
              </p>

              <div className="my-8">
                <Image
                  src="/future tech 2025.jpeg"
                  alt="Future Technology 2025"
                  width={600}
                  height={300}
                  className="rounded-lg shadow-md w-full"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Quantum Computing: Breaking Computational Barriers
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                Quantum computers promise to solve problems that are currently impossible for classical computers.
                Unlike traditional bits that can be either 0 or 1, quantum bits (qubits) can exist in multiple states
                simultaneously through superposition. This allows quantum computers to perform certain calculations
                exponentially faster than current supercomputers.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Industries from drug discovery to financial modeling will be transformed. Pharmaceutical companies will
                be able to simulate molecular interactions with unprecedented accuracy, leading to faster drug development.
                Financial institutions will optimize complex portfolios and detect fraud patterns that are currently
                undetectable.
              </p>

              <div className="my-8">
                <Image
                  src="/cybersecurity-dashboard-with-encryption-and-protec.png"
                  alt="Advanced Cybersecurity Systems"
                  width={600}
                  height={300}
                  className="rounded-lg shadow-md w-full"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Biotechnology and Genetic Engineering
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                CRISPR gene editing technology is advancing rapidly, offering the potential to cure genetic diseases,
                enhance agricultural crops, and even modify human traits. Synthetic biology is creating artificial
                life forms designed for specific purposes, from environmental cleanup to drug production.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Brain-computer interfaces are becoming more sophisticated, with companies like Neuralink developing
                systems that could restore mobility to paralyzed individuals and potentially enhance human cognition.
                The line between human and machine is becoming increasingly blurred.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Space Technology and Commercialization
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                The space industry is experiencing a renaissance with private companies leading the charge. Reusable
                rocket technology has dramatically reduced the cost of reaching orbit, making space more accessible
                than ever before. Companies like SpaceX, Blue Origin, and Rocket Lab are competing to build the
                infrastructure for the future space economy.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Satellite internet constellations are bringing high-speed connectivity to remote areas, while asteroid
                mining ventures are exploring the potential for extraterrestrial resources. Space tourism is becoming
                a reality, with commercial flights carrying civilians to the edge of space.
              </p>

              <div className="my-8">
                <Image
                  src="/api-management-dashboard.png"
                  alt="Advanced API Management Systems"
                  width={600}
                  height={300}
                  className="rounded-lg shadow-md w-full"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Advanced Materials and Nanotechnology
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                Scientists are developing materials with extraordinary properties—self-healing concrete, invisibility
                cloaking materials, and superconductors that operate at room temperature. Nanotechnology is enabling
                the creation of materials at the atomic level, leading to advances in electronics, medicine, and energy
                storage.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Carbon nanotubes and graphene are revolutionizing electronics, enabling faster, smaller, and more
                energy-efficient devices. Smart materials that can change their properties in response to environmental
                conditions are finding applications in everything from adaptive clothing to intelligent infrastructure.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Autonomous Systems and Robotics
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                Robotics technology is advancing beyond traditional industrial applications into service and companionship
                roles. Advanced AI algorithms are enabling robots to navigate complex environments, understand human
                emotions, and perform increasingly sophisticated tasks.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Autonomous vehicles are becoming safer and more capable, with some companies predicting fully autonomous
                taxi services within the next few years. Delivery drones and autonomous cargo ships are transforming
                logistics and supply chain management.
              </p>

              <div className="my-8">
                <Image
                  src="/professional-video-conference-call-with-multiple-p.png"
                  alt="Advanced Communication Systems"
                  width={600}
                  height={300}
                  className="rounded-lg shadow-md w-full"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                The Convergence of Technologies
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                The most significant developments will come from the convergence of multiple technologies. For example,
                combining AI with biotechnology could lead to personalized medicine based on an individual's genetic
                profile and real-time health data. Quantum computing combined with AI could solve complex optimization
                problems in drug discovery, climate modeling, and financial systems.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                The integration of IoT devices with edge computing and 5G/6G networks will create intelligent environments
                that anticipate our needs and optimize resource usage. Smart cities will use AI to manage traffic flow,
                energy distribution, and public services more efficiently than ever before.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Challenges and Considerations
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                With great technological power comes great responsibility. As these technologies mature, society will need
                to address important questions about privacy, security, job displacement, and equitable access. Regulatory
                frameworks will need to evolve to ensure that technological progress benefits all of humanity.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Ethical considerations will become increasingly important, particularly in areas like genetic engineering,
                autonomous weapons systems, and AI decision-making. International cooperation will be essential to ensure
                that emerging technologies are developed and deployed responsibly.
              </p>
            </article>

            {/* Technology Timeline */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Technology Readiness Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">2024-2025: Advanced AI Integration</h4>
                    <p className="text-sm text-gray-600">AI becomes ubiquitous in daily applications</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">2025-2027: Quantum Advantage</h4>
                    <p className="text-sm text-gray-600">First practical quantum computing applications</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">2027-2030: Space Economy Boom</h4>
                    <p className="text-sm text-gray-600">Commercial space activities become mainstream</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold">2030+: Technological Singularity Approaches</h4>
                    <p className="text-sm text-gray-600">Convergence of multiple advanced technologies</p>
                  </div>
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
                  <h5 className="font-medium text-gray-900">Dr. Priya Sharma</h5>
                  <p className="text-sm text-gray-600">Futurist & Technology Strategist</p>
                </div>
              </div>
            </div>

            {/* Emerging Technologies */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Emerging Technologies to Watch</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Quantum Computing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Gene Editing (CRISPR)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Brain-Computer Interfaces
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Advanced Robotics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Space Mining
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Nanotechnology
                  </a>
                </li>
              </ul>
            </div>

            {/* Technology Impact Areas */}
            <div className="bg-gradient-to-r from-slate-500 to-gray-500 rounded-lg shadow-md p-6 text-white">
              <h4 className="text-lg font-semibold mb-4">Impact Areas</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium">Healthcare</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium">Transportation</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium">Environment</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium">Education</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium">Manufacturing</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-sm font-medium">Communication</div>
                </div>
              </div>
            </div>

            {/* Future Predictions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold mb-4">Bold Predictions for 2030</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Autonomous vehicles will be commonplace in major cities</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Space tourism will be accessible to middle class</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">AI companions will be as common as smartphones</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Genetic medicine will cure most inherited diseases</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold mb-4">Stay Ahead of the Curve</h4>
              <p className="text-gray-600 mb-4">Get weekly insights on emerging technologies and future trends.</p>
              <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-900 transition-colors">
                Subscribe to Future Tech Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureBlog;
