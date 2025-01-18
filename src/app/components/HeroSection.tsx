export const HeroSection = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-gray-900 to-gray-800 pb-20">
        <div className="container mx-auto px-6 text-center lg:text-left">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-extrabold leading-tight mb-6 text-white">
                Decentralised AI model MarketPlace
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                Join a decentralized marketplace where developers can deploy AI
                models, and users can access them seamlessly.
              </p>
              <div className="space-x-4">
                <button className="px-6 py-3 bg-purple-800 text-white font-semibold rounded hover:bg-blue-600">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-gray-700 text-gray-300 font-semibold rounded hover:bg-gray-600">
                  Learn More
                </button>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 lg:w-1/2">
              <img
                src="./robot.svg"
                alt="AI Marketplace"
                className="rounded-lg  shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
<section className="bg-gray-800 py-20">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-5xl font-extrabold mb-8 text-white">Revolutionizing AI Model Deployment</h2>
    <p className="text-lg mb-12 text-gray-300 leading-relaxed">
      At AI Nexa, we provide developers and businesses with a secure, transparent, and decentralized platform to host and monetize AI models. 
      By integrating cutting-edge blockchain technology, we ensure every transaction is trustless, every interaction is fair, and every user is empowered.
    </p>
    <div className="flex flex-col md:flex-row justify-center gap-8">
      {/* Card 1 */}
      <div className="bg-gray-700 hover:bg-gray-600 transform hover:scale-105 transition duration-300 p-8 rounded-lg shadow-xl w-full md:w-1/3 text-left">
        <h3 className="text-2xl font-semibold text-white mb-4">Decentralized Marketplace</h3>
        <p className="text-gray-300">
          Explore a blockchain-based marketplace where developers can trade, share, and monetize AI models with no intermediaries.
        </p>
      </div>
      {/* Card 2 */}
      <div className="bg-gray-700 hover:bg-gray-600 transform hover:scale-105 transition duration-300 p-8 rounded-lg shadow-xl w-full md:w-1/3 text-left">
        <h3 className="text-2xl font-semibold text-white mb-4">Accessible AI APIs</h3>
        <p className="text-gray-300">
          Empower applications with ready-to-use AI services through our seamless and secure API integrations, tailored for scalability.
        </p>
      </div>
      {/* Card 3 */}
      <div className="bg-gray-700 hover:bg-gray-600 transform hover:scale-105 transition duration-300 p-8 rounded-lg shadow-xl w-full md:w-1/3 text-left">
        <h3 className="text-2xl font-semibold text-white mb-4">Transparent Payments</h3>
        <p className="text-gray-300">
          Rely on blockchain-based payment systems that guarantee fairness, traceability, and efficiency for all transactions.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Features Section */}
<section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
  <div className="container mx-auto px-6">
    <h2 className="text-5xl font-extrabold text-center mb-12 text-white">What Makes Us Stand Out</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Feature 1 */}
      <div className="bg-gray-800 hover:bg-gray-700 transform hover:-translate-y-2 transition duration-300 p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <img
            src="ai.svg"
            alt="Scalable AI Models"
            className="w-16 h-16 mx-auto"
          />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white">Scalable AI Models</h3>
        <p className="text-gray-300 leading-relaxed">
          Deploy AI models that grow with demand. Our platform optimizes resource allocation to ensure top-tier performance under any load.
        </p>
      </div>
      {/* Feature 2 */}
      <div className="bg-gray-800 hover:bg-gray-700 transform hover:-translate-y-2 transition duration-300 p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <img
            src="blockchain.svg"
            alt="Blockchain Security"
            className="w-16 h-16 mx-auto"
          />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white">Blockchain Security</h3>
        <p className="text-gray-300 leading-relaxed">
          Trust in the integrity of your transactions and data. Blockchain ensures every operation is tamper-proof and verifiable.
        </p>
      </div>
      {/* Feature 3 */}
      <div className="bg-gray-800 hover:bg-gray-700 transform hover:-translate-y-2 transition duration-300 p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <img
            src="simple.svg"
            alt="Easy Integration"
            className="w-16 h-16 mx-auto"
          />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white">Easy Integration</h3>
        <p className="text-gray-300 leading-relaxed">
          Simplify your workflow with APIs designed for intuitive integration. Focus on innovation while we handle the infrastructure.
        </p>
      </div>
    </div>
  </div>
</section>


      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} Decentralized AI Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  
    );
  };
  