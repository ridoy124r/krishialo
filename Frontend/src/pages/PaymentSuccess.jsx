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
      const bookingId = searchParams.get('bookingId');

      if (!sessionId || !bookingId) {
        setStatus('failed');
        setMessage('Missing session or booking id in URL');
        return;
      }

      try {
        const res = await api.post('/bookings/verify-payment', { sessionId, bookingId });
        setStatus('success');
        setMessage('Payment confirmed — thank you!');
      } catch (err) {
        console.error('Verification failed', err);
        setStatus('failed');
        setMessage(err.response?.data?.message || 'Payment verification failed');
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded shadow">
        {status === 'verifying' && <p>Verifying your payment — please wait...</p>}
        {status === 'success' && (
          <>
            <h2 className="text-2xl font-bold mb-2">Payment successful</h2>
            <p>{message}</p>
            <button onClick={() => navigate('/')} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Go home</button>
          </>
        )}
        {status === 'failed' && (
          <>
            <h2 className="text-2xl font-bold mb-2">Payment verification failed</h2>
            <p className="text-red-600">{message}</p>
            <button onClick={() => navigate('/')} className="mt-4 bg-gray-200 px-4 py-2 rounded">Back</button>
          </>
        )}
      </div>
    </div>
  );
}
