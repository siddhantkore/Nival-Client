import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {service.image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {service.icon && (
            <span className="text-4xl">{service.icon}</span>
          )}
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {service.description}
        </p>
        
        {service.features && service.features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        <Link
          to="/under-development"
          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group/link"
        >
          Learn More
          <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;

