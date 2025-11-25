import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

export default function HighlightedBlog() {
  const blogs = [
    {
      image: "/images/b1.jpg",
      category: "Agriculture/Farming",
      categoryColor: "text-red-600",
      title: "Precision Farming's Role in Bangladesh.",
      description: "Smart IoT maximizes resource efficiency, boosting sustainable yields.",
      date: "October 11, 2025"
    },
    {
      image: "/images/b2.jpg",
      category: "Soil Science/Farming",
      categoryColor: "text-red-600",
      title: "Soil Testing: The Yield Blueprint",
      description: "Regular soil testing pinpoints nutrient needs, reducing fertilizer waste and boosting yield with precise application.",
      date: "October 13, 2025"
    },
    {
      image: "/images/b3.jpg",
      category: "Field/Management",
      categoryColor: "text-red-600",
      title: "Crop Rotation: Securing Soil Health",
      description: "Alternating crops naturally maintains soil fertility and disrupts harmful pest and disease cycles.",
      date: "October 14, 2025"
    },
    {
      image: "/images/b4.jpg",
      category: "Resource/Efficiency",
      categoryColor: "text-red-600",
      title: "Smart Water Use: More Crop, Less Water",
      description: "Optimized Water Management (e.g. drip irrigation) ensures crops receive the right amount of water at the right time.",
      date: "October 16, 2025"
    },
    {
      image: "/images/b5.jpg",
      category: "Pest Control",
      categoryColor: "text-red-600",
      title: "IPM: Safe and Sustainable Pest Control",
      description: "Integrated Pest Management (IPM) reduces chemical reliance by utilizing natural controls and resistant crop varieties.",
      date: "October 18, 2025"
    },
    {
      image: "/images/b6.jpg",
      category: "Input Quality",
      categoryColor: "text-red-600",
      title: "Quality Seeds: Foundation of High Yields",
      description: "Selecting disease-resistant, High-Yielding Varieties (HYVs) is a key investment that significantly boosts overall production.",
      date: "October 21, 2025"
    }
  ];

  return (
    <div className="w-full bg-[#F9FCFF] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d3e50] mb-3 sm:mb-4">
            Our Highlighted blog
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4">
            Explore Our Resources: Industry insights, real case studies, and expert analysis.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {blogs.map((blog, index) => (
            <div 
              key={index}
              className="bg-[#EEF5FB] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Blog Image */}
              <div className="relative overflow-hidden shrink-0">
                <img 
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Blog Content */}
              <div className="p-4 sm:p-5 lg:p-6 bg-[#EEF5FB] flex flex-col flex-grow">
                {/* Category */}
                <p className={`text-xs sm:text-sm font-semibold ${blog.categoryColor} mb-2`}>
                  {blog.category}
                </p>

                {/* Title */}
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2d3e50] mb-2 sm:mb-3">
                  {blog.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed flex-grow">
                  {blog.description}
                </p>

                {/* Footer with Date and Link */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2 mt-auto">
                  <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                    <Calendar size={16} className="flex-shrink-0" />
                    <span>{blog.date}</span>
                  </div>
                  
                  <button className="flex items-center gap-2 text-green-600 font-semibold text-xs sm:text-sm hover:text-green-700 transition-colors">
                    Learn more
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}