import React, { useEffect, useState } from "react";
import { loadMDXFiles } from "../../utils/loadMDX";
import WorkCard from "../../components/workCard";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

function Work() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorks() {
      try {
        const loadedWorks = await loadMDXFiles('works');
        setWorks(loadedWorks);
      } catch (error) {
        console.error("Error loading works:", error);
      } finally {
        setLoading(false);
      }
    }
    loadWorks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Work</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real projects, real results. See how we've helped companies transform their infrastructure and accelerate growth.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : works.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <WorkCard key={work.slug || index} work={work} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Work;