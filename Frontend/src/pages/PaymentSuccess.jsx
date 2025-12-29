// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      const sessionId = searchParams.get('session_id');

      if (!sessionId) {
        setStatus('failed');
        setMessage('Missing session id in URL');
        return;
      }

      try {
        // Use GET request with session_id as query parameter
        // The backend will verify the payment and update the booking status via the webhook
        const res = await api.get(`/bookings/verify-payment?session_id=${sessionId}`);
        
        if (res.data.success && res.data.paymentStatus === 'paid') {
          setStatus('success');
          setMessage('Payment confirmed — thank you!');
        } else {
          setStatus('failed');
          setMessage('Payment verification failed. Please contact support.');
        }
      } catch (err) {
        console.error('Verification failed', err);
        setStatus('failed');
        // Check if it's an authentication error
        if (err.response?.status === 401) {
          setMessage('Session expired. Please log in again and try the payment.');
        } else {
          setMessage(err.response?.data?.message || 'Payment verification failed');
        }
      }
    };

    verify();
  }, [searchParams]);

  // Auto-redirect to dashboard after 3 seconds on success
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-lg w-full bg-white p-8 rounded shadow-lg">
        {status === 'verifying' && (
          <div className="text-center">
            <p className="text-lg text-gray-700">Verifying your payment — please wait...</p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          </div>
        )}
        {status === 'success' && (
          <>
            <h2 className="text-2xl font-bold mb-2 text-green-600">✓ Payment Successful</h2>
            <p className="text-gray-700 mb-4">{message}</p>
            <p className="text-sm text-gray-500 mb-4">Redirecting to home in 3 seconds...</p>
            <button onClick={() => navigate('/')} className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Go Home</button>
          </>
        )}
        {status === 'failed' && (
          <>
            <h2 className="text-2xl font-bold mb-2 text-red-600">✗ Verification Failed</h2>
            <p className="text-gray-700 mb-4">{message}</p>
            <div className="flex gap-2">
              <button onClick={() => navigate('/services')} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Try Again</button>
              <button onClick={() => navigate('/')} className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Go Home</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
