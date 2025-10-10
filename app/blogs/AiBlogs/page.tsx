import React from 'react';
import Image from 'next/image';

const AIBlogs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16">
          {/* Main Heading */}
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI in Everyday Life: Transforming the Ordinary
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how artificial intelligence is revolutionizing daily experiences, from smart homes to personalized healthcare, making technology more intuitive and accessible than ever before.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 min-h-screen">
          {/* Article Content */}
          <div className="lg:col-span-2 space-y-8">
            <article className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The AI Revolution in Daily Living
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                Artificial Intelligence has moved beyond the realm of science fiction and research labs into our everyday lives.
                From the moment we wake up to when we go to bed, AI systems are working behind the scenes to make our lives
                easier, safer, and more efficient. This seamless integration of AI into daily routines represents one of the
                most significant technological shifts in human history.
              </p>

              <div className="my-8">
                <Image
                  src="/ai-data-analysis-interface-with-machine-learning-v.png"
                  alt="AI Data Analysis Interface"
                  width={600}
                  height={300}
                  className="rounded-lg shadow-md w-full"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Smart Homes and IoT Integration
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                Modern smart homes use AI to learn our preferences and habits. Smart thermostats automatically adjust
                temperature based on our schedule and weather patterns. Lighting systems can detect when we're in a room
                and adjust brightness according to natural light availability. Security systems use AI-powered cameras
                that can distinguish between family members, pets, and potential intruders.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Voice assistants like Alexa, Google Home, and Siri have become household staples, controlling everything
                from music playback to grocery ordering. These AI systems are constantly learning from our interactions,
                becoming more accurate and personalized over time.
              </p>

              <div className="my-8">
                <Image
                  src="/professional-team-collaborating-with-various-softw.png"
                  alt="AI-Powered Team Collaboration"
                  width={600}
                  height={300}
                  className="rounded-lg shadow-md w-full"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Healthcare and Personalized Medicine
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                AI is revolutionizing healthcare in remarkable ways. Wearable devices use AI algorithms to detect irregular
                heartbeats, predict potential health issues, and even alert users to seek medical attention. AI-powered apps
                can analyze skin moles for signs of melanoma with accuracy comparable to trained dermatologists.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                In mental health, AI chatbots provide 24/7 support for people dealing with anxiety, depression, and other
                conditions. These AI companions offer coping strategies, mood tracking, and can even detect when a user
                might need professional intervention.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Transportation and Autonomous Systems
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                Self-driving cars represent one of the most visible applications of AI in daily life. Companies like Tesla,
                Waymo, and others are using AI to make transportation safer and more efficient. These systems can detect
                pedestrians, predict other drivers' behavior, and navigate complex traffic situations.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                AI-powered navigation apps have transformed how we travel. They can predict traffic patterns, suggest optimal
                routes, and even learn our commuting preferences to provide personalized recommendations.
              </p>

              <div className="my-8">
                <Image
                  src="/modern-team-chat-interface-with-video-calls-and-fi.png"
                  alt="AI-Powered Communication Interface"
                  width={600}
                  height={300}
                  className="rounded-lg shadow-md w-full"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Entertainment and Content Creation
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                Streaming services use AI to recommend movies and TV shows based on our viewing history and preferences.
                Music streaming platforms create personalized playlists that evolve with our tastes. AI even helps create
                new content—generating movie scripts, composing music, and even creating artwork.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                In gaming, AI creates more realistic and challenging opponents. Procedural generation algorithms create
                infinite unique game worlds, ensuring that no two playthroughs are exactly the same.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                The Future of AI in Daily Life
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                As AI continues to evolve, we'll see even more integration into our daily lives. AI tutors will provide
                personalized education, adapting to each student's learning style and pace. Smart cities will use AI to
                optimize traffic flow, manage energy consumption, and improve public services.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                The key to successful AI integration will be ensuring these systems remain transparent, ethical, and
                beneficial to humanity. As AI becomes more sophisticated, the focus will shift from what AI can do to
                how we can use it to create a better world for everyone.
              </p>
            </article>

            {/* AI Applications Grid */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                AI Applications in Daily Life
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl mb-2">🏠</div>
                  <h4 className="font-semibold text-sm">Smart Homes</h4>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl mb-2">🏥</div>
                  <h4 className="font-semibold text-sm">Healthcare</h4>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl mb-2">🚗</div>
                  <h4 className="font-semibold text-sm">Transportation</h4>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl mb-2">🎵</div>
                  <h4 className="font-semibold text-sm">Entertainment</h4>
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
                  <h5 className="font-medium text-gray-900">Dr. Michael Torres</h5>
                  <p className="text-sm text-gray-600">AI Research Scientist</p>
                </div>
              </div>
            </div>

            {/* AI Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Categories</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Machine Learning
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Natural Language Processing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Computer Vision
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Robotics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                    Expert Systems
                  </a>
                </li>
              </ul>
            </div>

            {/* Featured AI Tools */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-md p-6 text-white">
              <h4 className="text-lg font-semibold mb-4">Featured AI Tools</h4>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <h5 className="font-medium">ChatGPT</h5>
                  <p className="text-sm opacity-90">Conversational AI assistant</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <h5 className="font-medium">Midjourney</h5>
                  <p className="text-sm opacity-90">AI image generation</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <h5 className="font-medium">TensorFlow</h5>
                  <p className="text-sm opacity-90">Machine learning framework</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-600 mb-4">Get the latest AI trends and innovations delivered to your inbox.</p>
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors">
                Subscribe to AI Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBlogs;
