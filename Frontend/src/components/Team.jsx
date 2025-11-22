import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';

export default function LeadingTeam() {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: "Sahin Alam",
      role: "UI/UX Designer",
      image: "/public/images/sahin.png"
    },
    {
      name: "Shamim Ahmmed",
      role: "Full Stack Developer",
      image: "/public/images/shamim.png"
    },
    {
      name: "Sheikh Ridoy",
      role: "Full Stack Developer",
      image: "/public/images/ridoy.jpg"
    }
  ];

  return (
    <div className=" bg-linear-to-b from-green-50 to-green-100 py-16 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#003B15] text-center mb-16">
          Meet with our <span className='text-red-600'>Leading</span> Team
        </h2>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-[400px] overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Name Card */}
              <div className="relative bg-white border-t-4 border-green-600 px-6 py-5 flex items-center justify-between group-hover:bg-green-50 transition-colors duration-300">
                <h3 className="text-xl font-bold tracking-[+1px] text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                  {member.name}
                </h3>
                <button 
                  onClick={() => setSelectedMember(member)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-600 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden transform animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="md:w-1/2 h-64 md:h-auto">
                <img 
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Team Member
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-[#003B15]">
                    {selectedMember.name}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1 bg-green-600 rounded-full"></div>
                    <p className="text-xl text-green-600 font-semibold">
                      {selectedMember.role}
                    </p>
                  </div>

                  <p className="text-gray-600 leading-relaxed pt-4">
                    Passionate professional dedicated to delivering excellence in every project. 
                    Committed to innovation and creating impactful solutions for sustainable growth.
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => window.open('#', '_blank')}
                      className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2 text-sm"
                    >
                      Portfolio
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 rounded-lg font-medium transition-colors duration-200 text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}