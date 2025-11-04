import React from "react";
import { Link } from "react-router-dom";

function WorkCard({ work }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {work.image && (
        <div className="h-64 overflow-hidden relative">
          <img 
            src={work.image} 
            alt={work.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white mb-2">{work.title}</h3>
            {work.client && (
              <p className="text-blue-200 text-sm">{work.client}</p>
            )}
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {work.technologies && work.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
          {work.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {work.duration && (
            <span className="text-sm text-gray-500">
              Duration: {work.duration}
            </span>
          )}
          <Link
            to={`/work/${work.slug}`}
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group/link"
          >
            View Case Study
            <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WorkCard;

