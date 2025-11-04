import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { loadMDXFile } from "../../utils/loadMDX";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

function WorkDetail() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWork() {
      try {
        const loadedWork = await loadMDXFile('works', id);
        setWork(loadedWork);
      } catch (error) {
        console.error("Error loading work:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadWork();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <NavBar />
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!work) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <NavBar />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link to="/work" className="text-blue-600 hover:underline">
            ← Back to Work
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/work" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Work
        </Link>
        
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {work.image && (
            <div className="h-96 overflow-hidden">
              <img 
                src={work.image} 
                alt={work.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {work.title}
              </h1>
              {work.description && (
                <p className="text-xl text-gray-600 mb-6">
                  {work.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-4 mb-6">
                {work.client && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="font-medium">Client:</span>
                    <span>{work.client}</span>
                  </div>
                )}
                {work.duration && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Duration:</span>
                    <span>{work.duration}</span>
                  </div>
                )}
                {work.industry && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-2.34 0-4.629.236-6.882.663A3.003 3.003 0 003 18.747v.746c0 .414.336.75.75.75h4.5A3.75 3.75 0 0012 21a3.75 3.75 0 003.75-3.75h4.5A.75.75 0 0021 16.5v-.746a3.003 3.003 0 00-2.118-2.492z" />
                    </svg>
                    <span className="font-medium">Industry:</span>
                    <span>{work.industry}</span>
                  </div>
                )}
              </div>
              
              {work.technologies && work.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {work.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </header>
            
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {work.content}
              </ReactMarkdown>
            </div>

            {work.gallery && work.gallery.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {work.gallery.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`${work.title} - Image ${idx + 1}`}
                      className="rounded-lg shadow-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}

export default WorkDetail;

