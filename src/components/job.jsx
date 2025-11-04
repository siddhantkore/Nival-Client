import React, { useState } from "react";
import JobApplicationForm from "./jobApplicationForm";

function Job({ job }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  if (!job) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-2.34 0-4.629.236-6.882.663A3.003 3.003 0 003 18.747v.746c0 .414.336.75.75.75h4.5A3.75 3.75 0 0012 21a3.75 3.75 0 003.75-3.75h4.5A.75.75 0 0021 16.5v-.746a3.003 3.003 0 00-2.118-2.492z" />
                </svg>
                {job.role}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location.location} • {job.location.mode}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed line-clamp-3">
            {job.description}
          </p>
        </div>

        {isExpanded && (
          <div className="mt-6 space-y-6 border-t border-gray-200 pt-6">
            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                <ul className="space-y-2">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.other && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Additional Information</h4>
                <p className="text-gray-700">{job.other}</p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowApplicationForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2"
        >
          {isExpanded ? 'Show Less' : 'View Details'}
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {showApplicationForm && (
        <JobApplicationForm jobId={job._id} onClose={() => setShowApplicationForm(false)} />
      )}
    </div>
  );
}

export default Job;
