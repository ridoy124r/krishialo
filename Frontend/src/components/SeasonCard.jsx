import React, { useState } from 'react';

const SeasonCard = () => {
  const [lang, setLang] = useState('eng');

  const content = {
    eng: {
      title: 'Season: Autumn',
      date: '22 Agrahayan, 1432',
      desc:
        'In this season, farmers should harvest ripe paddy, dry and store the grains, start sowing wheat, mustard, and lentils, and protect crops from cold and fog. 🌾',
    },
    bn: {
      title: 'ঋতু: হেমন্ত',
      date: '২২ অগ্রহায়ণ, ১৪৩২',
      desc:
        'এই ঋতুতে কৃষকদের পাকা ধান কেটে শুকিয়ে সংরক্ষণ করা উচিত, গম, সরিষা ও মসুর ডাল বপন শুরু করতে হবে এবং শীত ও কুয়াশা থেকে ফসল রক্ষা করতে হবে। 🌾',
    },
  };

  const data = content[lang];

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-green-200">
      
      <div className="h-56 w-full overflow-hidden">
        <img
          src="/images/Seasion.png"
          alt="Farmer"
          className="w-full h-full object-cover"
        />
      </div>

    
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-semibold text-green-900">{data.title}</h3>
            <p className="text-sm text-gray-600">{data.date}</p>
          </div>

         
          <div className="flex gap-2">
            <button
              onClick={() => setLang('eng')}
              className={`px-4 py-1 rounded-lg text-md font-semibold border ${
                lang === 'eng'
                  ? 'bg-green-700 text-white border-green-800'
                  : 'bg-white text-green-800 border-green-400'
              }`}
            >
              ENG
            </button>

            <button
              onClick={() => setLang('bn')}
              className={`px-4 py-1 rounded-lg text-sm font-semibold border ${
                lang === 'bn'
                  ? 'bg-red-600 text-white border-red-700'
                  : 'bg-white text-red-600 border-red-400'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>

        
        <div className="bg-green-50 p-4 rounded-xl text-green-900 leading-relaxed text-sm">
          {data.desc}
        </div>
      </div>
    </div>
  );
};

export default SeasonCard;