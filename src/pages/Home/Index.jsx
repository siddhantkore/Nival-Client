import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import { loadMDXFiles } from "../../utils/loadMDX";
import ServiceCard from "../../components/serviceCard";
import WorkCard from "../../components/workCard";
import BlogPost from "../../components/blogPostComponent";

function HomePage() {
  const [services, setServices] = useState([]);
  const [works, setWorks] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [whyChooseUs, setWhyChooseUs] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const [loadedServices, loadedWorks, loadedBlogs, loadedContent] = await Promise.all([
          loadMDXFiles('services'),
          loadMDXFiles('works'),
          loadMDXFiles('blogs'),
          loadMDXFiles('content')
        ]);
        setServices(loadedServices.slice(0, 3));
        setWorks(loadedWorks.slice(0, 3));
        setBlogs(loadedBlogs.slice(0, 3));
        const whyChooseUsContent = loadedContent.find(item => item.slug === 'why-choose-us');
        setWhyChooseUs(whyChooseUsContent);
        console.log("Loaded content:", whyChooseUsContent);
      } catch (error) {
        console.error("Error loading content:", error);
      }
    }
    loadContent();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Nival Cloud Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Empowering startups and enterprises with DevOps expertise, cloud infrastructure, and automation solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Our Services
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive DevOps and cloud solutions tailored to your needs
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {services.map((service, index) => (
                <ServiceCard key={service.slug || index} service={service} />
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/services"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 text-lg"
              >
                View All Services
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Work Section */}
      {works.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real projects, real results. See how we've helped companies succeed
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {works.map((work, index) => (
                <WorkCard key={work.slug || index} work={work} />
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/work"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 text-lg"
              >
                View All Projects
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      {whyChooseUs && whyChooseUs.cards && (
        <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{whyChooseUs.title}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {whyChooseUs.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.cards.map((card, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  {card.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {blogs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Stay updated with the latest in DevOps, cloud infrastructure, and modern development
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {blogs.map((blog, index) => (
                <BlogPost key={blog.slug || index} blog={blog} />
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/blogs"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 text-lg"
              >
                Read All Blogs
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Infrastructure?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how we can help you scale efficiently and reduce costs
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;



