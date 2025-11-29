// src/pages/BookingCancelled.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function BookingCancelled() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center">
        <XCircle className="w-20 h-20 text-orange-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-8">
          Your booking was not completed. No charges were made to your account.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/services')}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
          >
            Go to Home
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Contact our support team if you encountered any issues.
          </p>
        </div>
      </div>
    </div>
  );
}