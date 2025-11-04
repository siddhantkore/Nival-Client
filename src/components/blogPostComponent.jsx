import React from "react";
import { Link } from "react-router-dom";

function BlogPost({ blog }) {
  return (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4">
          {blog.keywords && blog.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.keywords.slice(0, 2).map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {blog.title}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {blog.description}
          </p>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              {blog.date && (
                <time dateTime={blog.date}>
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </time>
              )}
            </div>
            <Link
              to={`/blogs/${blog.slug}`}
              className="text-blue-600 font-semibold hover:text-blue-700 text-sm flex items-center gap-1 group/link"
            >
              Read More
              <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogPost;
