// src/pages/ServiceBookingForm.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import api from '../../api/api';

export default function ServiceBookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const passed = location.state?.service || null;

 
  const services = [
    { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Drone Surveillance', type: 'area', rate: 1, unit: 'sqft' },
    { id: '550e8400-e29b-41d4-a716-446655440002', name: 'IoT Implementation', type: 'area', rate: 1, unit: 'sqft' },
    { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Soil Analysis', type: 'area', rate: 1, unit: 'sqft' },
    { id: '550e8400-e29b-41d4-a716-446655440004', name: 'Crop Monitoring', type: 'area', rate: 1, unit: 'sqft' },
    { id: '550e8400-e29b-41d4-a716-446655440005', name: 'Logistics Service', type: 'logistics', ratePerKm: 2, ratePerKg: 2 },
    { id: '550e8400-e29b-41d4-a716-446655440006', name: 'Digital Surveying', type: 'area', rate: 1, unit: 'sqft' },
  ];

  const SQFT_PER_ACRE = 43560;

  const [selectedServiceId, setSelectedServiceId] = useState(passed?.id || '');
  const [acres, setAcres] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [loadKg, setLoadKg] = useState('');
  const [sqft, setSqft] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const selectedService = services.find(s => s.id === selectedServiceId);

  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    setSelectedServiceId(serviceId);
    setAcres('');
    setKilometers('');
    setLoadKg('');
    setSqft(0);
    setTotalCost(0);
    setStatus('idle');
    setErrorMessage('');
  };

  const handleAcreChange = (e) => {
    const value = e.target.value;
    setAcres(value);
    setStatus('idle');
    setErrorMessage('');

    if (value && !isNaN(value) && parseFloat(value) > 0 && selectedService?.type === 'area') {
      setIsCalculating(true);
      setTimeout(() => {
        const calculatedSqft = parseFloat(value) * SQFT_PER_ACRE;
        setSqft(calculatedSqft);
        setTotalCost(calculatedSqft * selectedService.rate);
        setIsCalculating(false);
      }, 300);
    } else {
      setSqft(0);
      setTotalCost(0);
      setIsCalculating(false);
    }
  };

  const calculateLogisticsCost = (kmVal, kgVal) => {
    if (selectedService?.type === 'logistics') {
      setIsCalculating(true);
      setTimeout(() => {
        const km = parseFloat(kmVal) || 0;
        const kg = parseFloat(kgVal) || 0;
        const cost = (km * selectedService.ratePerKm) + (kg * selectedService.ratePerKg);
        setTotalCost(cost);
        setIsCalculating(false);
      }, 300);
    }
  };

  const handleKmChange = (e) => {
    setKilometers(e.target.value);
    setStatus('idle');
    setErrorMessage('');
    calculateLogisticsCost(e.target.value, loadKg);
  };

  const handleKgChange = (e) => {
    setLoadKg(e.target.value);
    setStatus('idle');
    setErrorMessage('');
    calculateLogisticsCost(kilometers, e.target.value);
  };

  
  const handleProceedToBooking = async () => {
    if (!selectedServiceId) {
      setErrorMessage('Please select a service.');
      setStatus('error');
      return;
    }

    if (!totalCost || totalCost <= 0) {
      setErrorMessage('Total cost must be greater than 0.');
      setStatus('error');
      return;
    }

    setStatus('processing');
    setErrorMessage('');

    const bookingPayload = {
      serviceId: selectedServiceId,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      clientNotes: JSON.stringify({ acres, kilometers, loadKg, sqft, calculatedAmount: totalCost }),
      amount: Math.round(totalCost),
    };

    try {
     
      const createResp = await api.post('/bookings', bookingPayload);
      const bookingId = createResp.data?.id;

      if (!bookingId) {
        throw new Error('Booking creation failed - no ID returned');
      }

  
      const checkoutResp = await api.post('/bookings/create-checkout-session', {
        bookingId,
        amount: Math.round(totalCost),
      });

      const { url } = checkoutResp.data;

      if (!url) {
        throw new Error('Failed to create payment session');
      }

      
      window.location.href = url;

    } catch (err) {
      console.error('Booking Error:', err);
      setErrorMessage(err.response?.data?.message || err.message || 'Unexpected error.');
      setStatus('error');
    }
  };

  return (
    <div className="w-full bg-linear-to-br from-amber-50 to-yellow-100 py-16 px-6 ">
      <div className="max-w-[1440px] mx-auto flex gap-5 justify-center items-center">
        <div className="hidden lg:block flex-1">
          <img
            src="/images/b.jpg"
            alt="Farmer using agriculture technology"
            className="rounded-3xl shadow-2xl w-full object-cover"
          />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full lg:flex-1 max-w-xl">
          <h2 className="text-3xl font-extrabold mb-6">Book Your Service</h2>

          {status === 'error' && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-6 flex items-start space-x-3">
              <XCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold">Booking Error</h4>
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Service</label>
              <select
                value={selectedServiceId}
                onChange={handleServiceChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
                disabled={status === 'processing'}
              >
                <option value="">-- Choose a Service --</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {selectedService?.type === 'area' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area (Acres)</label>
                <input
                  type="number"
                  placeholder="Enter acres"
                  value={acres}
                  onChange={handleAcreChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
                  disabled={status === 'processing'}
                />
                <p className="text-xs text-gray-500 mt-1">Rate: ৳{selectedService.rate} / sqft</p>
              </div>
            )}

            {selectedService?.type === 'logistics' && (
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Km"
                  value={kilometers}
                  onChange={handleKmChange}
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
                  disabled={status === 'processing'}
                />
                <input
                  type="number"
                  placeholder="Kg"
                  value={loadKg}
                  onChange={handleKgChange}
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
                  disabled={status === 'processing'}
                />
              </div>
            )}
          </div>

          <div className="bg-green-600 rounded-lg p-6 mb-6">
            <p className="text-sm text-white opacity-90 mb-1">Total Amount Due</p>
            <p className="text-4xl font-bold text-white flex items-center gap-3">
              {isCalculating || status === 'processing'
                ? <><span>Calculating...</span><RefreshCw className="animate-spin w-8 h-8 text-white" /></>
                : totalCost > 0
                  ? `৳${totalCost.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
                  : '৳0'}
            </p>
          </div>

          <button
            onClick={handleProceedToBooking}
            disabled={!selectedServiceId || totalCost === 0 || isCalculating || status === 'processing'}
            className="w-full bg-green-600 text-white py-3 rounded-lg text-base font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
          >
            {status === 'processing' ? (
              <span className="flex items-center justify-center">
                <RefreshCw className="animate-spin w-5 h-5 mr-2" /> Redirecting to Payment...
              </span>
            ) : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}