import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react'; // Added icons for better UX

// Mock API object for demonstration (replace with actual import)
const api = {
    post: async (endpoint, data) => {
        console.log(`[MOCK API] POST to ${endpoint} with data:`, data);
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency

        // Simulate successful booking creation
        if (endpoint === '/bookings') {
            return { data: { id: 'booking-123', data: { id: 'booking-123' } } };
        }
        // Simulate payment session creation (Stripe Checkout)
        if (endpoint === '/bookings/create-payment-intent') {
            // This URL is what Stripe would return for the user to be redirected to for payment.
            return { data: { url: 'https://mock-stripe-checkout.com/session-123', clientSecret: null } }; 
        }
        throw new Error('Mock API endpoint not found.');
    }
};

// Component name matches the import alias in App.jsx
export default function ServiceBookingForm() { 
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieves the service object passed via navigation state, if any.
  const passed = location.state?.service || null; 

  // State variables for form inputs and process status
  const [serviceName, setServiceName] = useState(passed?.title || '');
  const [acres, setAcres] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [loadKg, setLoadKg] = useState('');
  const [sqft, setSqft] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // State for process flow: idle | processing | error | redirect (New state additions)
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectUrl, setRedirectUrl] = useState(''); 

  // Mock service data (IDs must match database records, which are UUID strings based on your schema)
  const services = [
    { id: 'srv001', name: 'Drone Surveillance', type: 'area', rate: 1, unit: 'sqft' },
    { id: 'srv002', name: 'IoT Implementation', type: 'area', rate: 1, unit: 'sqft' },
    { id: 'srv003', name: 'Soil Analysis', type: 'area', rate: 1, unit: 'sqft' },
    { id: 'srv004', name: 'Crop Monitoring', type: 'area', rate: 1, unit: 'sqft' },
    { id: 'srv005', name: 'Logistics Service', type: 'logistics', ratePerKm: 2, ratePerKg: 2 }
  ];

  const SQFT_PER_ACRE = 43560;
  const selectedService = services.find(s => s.name === serviceName);

  // Effect to set the service name if navigating from the services page
  useEffect(() => {
    if (passed?.title) {
        setServiceName(passed.title);
    }
  }, [passed?.title]);


  const handleServiceChange = (e) => {
    const value = e.target.value;
    // Reset state upon service change
    setServiceName(value);
    setAcres('');
    setKilometers('');
    setLoadKg('');
    setSqft(0);
    setTotalCost(0);
    setStatus('idle'); // Reset status
    setErrorMessage('');
    setRedirectUrl('');
  };

  const handleAcreChange = (e) => {
    const value = e.target.value;
    setAcres(value);
    setStatus('idle'); 
    setErrorMessage('');

    if (value && !isNaN(value) && parseFloat(value) > 0 && selectedService) {
      setIsCalculating(true);
      // Simulate calculation delay
      setTimeout(() => {
        const acreValue = parseFloat(value);
        const calculatedSqft = acreValue * SQFT_PER_ACRE;
        const cost = calculatedSqft * selectedService.rate;
        setSqft(calculatedSqft);
        setTotalCost(cost);
        setIsCalculating(false);
      }, 500);
    } else {
      setSqft(0);
      setTotalCost(0);
      setIsCalculating(false);
    }
  };

  const calculateLogisticsCost = (kmVal, kgVal) => {
    if (selectedService && selectedService.type === 'logistics') {
      setIsCalculating(true);
      // Simulate calculation delay
      setTimeout(() => {
        const km = parseFloat(kmVal) || 0;
        const kg = parseFloat(kgVal) || 0;
        const kmCost = km * selectedService.ratePerKm;
        const kgCost = kg * selectedService.ratePerKg;
        setTotalCost(kmCost + kgCost);
        setIsCalculating(false);
      }, 500);
    }
  };

  const handleKmChange = (e) => {
    const value = e.target.value;
    setKilometers(value);
    setStatus('idle');
    setErrorMessage('');
    calculateLogisticsCost(value, loadKg);
  };

  const handleKgChange = (e) => {
    const value = e.target.value;
    setLoadKg(value);
    setStatus('idle');
    setErrorMessage('');
    calculateLogisticsCost(kilometers, value);
  };

  const handleProceedToBooking = async () => {
    setStatus('processing');
    setErrorMessage('');
    setRedirectUrl('');
    
    try {
      if (!serviceName) {
        setErrorMessage('Please select a service.'); 
        setStatus('error');
        return;
      }
      if (!totalCost || totalCost <= 0) {
        setErrorMessage('Total cost must be greater than 0. Please enter a value.');
        setStatus('error');
        return;
      }

      const bookingPayload = {
        // Use the actual service ID for the mock API call
        serviceId: selectedService?.id || selectedService?.name || serviceName, 
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        clientNotes: JSON.stringify({ acres, kilometers, loadKg, sqft, calculatedAmount: totalCost }),
      };

      // 1) create booking (Mock API call)
      const createResp = await api.post('/bookings', bookingPayload);
      const booking = createResp.data;
      const bookingId = booking.id || booking?.data?.id;

      if (!bookingId) {
        console.error('Booking create response missing ID', createResp);
        setErrorMessage('Failed to create booking. Missing ID from server.');
        setStatus('error');
        return;
      }

      // 2) ask backend to create Stripe Checkout session (MOCK API call)
      const payResp = await api.post('/bookings/create-payment-intent', { bookingId });

      const { url } = payResp.data;

      if (url) {
        // SUCCESS: Set status to 'redirect' and store URL to trigger the modal
        setRedirectUrl(url);
        setStatus('redirect');
        return;
      }

      setErrorMessage('Payment initialization failed: Expected a payment URL but received none.');
      setStatus('error');

    } catch (err) {
      console.error("Error in booking:", err);
      // Extract the error message
      const message = err.response?.data?.message || err.message || 'An unexpected error occurred during booking.';
      setErrorMessage(message);
      setStatus('error');
    }
  };
  
  // Dedicated Modal for Payment Redirection Simulation
  const PaymentRedirectModal = () => {
    if (status !== 'redirect') return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform scale-100 transition-transform duration-300">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Booking Created Successfully!</h3>
            <p className="text-gray-600 mb-6">
              Your service has been reserved. The next step is payment.
            </p>
          </div>

          <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 mb-6">
            <p className="font-semibold mb-2">Environment Limitation Notice:</p>
            <p>
              In a live environment, you would be **automatically redirected** to the Stripe Checkout page now. This environment prevents external redirects.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="font-semibold text-gray-700 mb-1">Payment URL (Simulated):</p>
            <a 
              href={redirectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="break-all text-blue-500 hover:text-blue-700 underline text-xs"
            >
              {redirectUrl}
            </a>
            <p className="text-xs text-gray-500 mt-2">
              (Clicking this link will attempt to open the mock page in a new window.)
            </p>
          </div>
          
          <button
            onClick={() => {
              // Reset state and navigate back to the home page or services list
              setStatus('idle');
              setRedirectUrl('');
              navigate('/services'); 
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg text-base font-semibold hover:bg-green-700 transition-colors"
          >
            Go Back to Services
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="w-full bg-gradient-to-br from-amber-50 to-yellow-100 py-16 px-4 min-h-screen">
      
      {/* 1. Payment Simulation Modal */}
      <PaymentRedirectModal />
      
      <div className="max-w-[1440px] mx-auto">
        <div className="flex gap-5 items-center justify-center">
          <div className="hidden lg:block flex-1">
            <img
              src="/images/b.jpg"
              alt="Farmer using agriculture technology"
              className="rounded-3xl shadow-2xl w-full h-[440px] object-cover"
            />
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 w-full lg:flex-1 max-w-xl lg:max-w-none">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Book Your Service</h2>
            
            {/* Error Message Box */}
            {status === 'error' && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-6 flex items-start space-x-3">
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Booking Error</h4>
                  <p className="text-sm">{errorMessage}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-4 mb-8">
              {/* 1. Service Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Service</label>
                <select
                  value={serviceName}
                  onChange={handleServiceChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
                  disabled={status === 'processing' || status === 'redirect'}
                >
                  <option value="">-- Choose a Service --</option>
                  {services.map((s) => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* 2. Conditional Inputs based on Service Type */}
              {selectedService && selectedService.type === 'area' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area (Acres)</label>
                  <input
                    type="number"
                    placeholder="Enter acres (e.g., 2.5)"
                    value={acres}
                    onChange={handleAcreChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
                    disabled={status === 'processing' || status === 'redirect'}
                  />
                  <p className="text-xs text-gray-500 mt-1">Rate: ৳{selectedService.rate} / sqft</p>
                </div>
              )}

              {selectedService && selectedService.type === 'logistics' && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Distance (Km)</label>
                    <input
                      type="number"
                      placeholder="Km"
                      value={kilometers}
                      onChange={handleKmChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
                      disabled={status === 'processing' || status === 'redirect'}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Load (Kg)</label>
                    <input
                      type="number"
                      placeholder="Kg"
                      value={loadKg}
                      onChange={handleKgChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
                      disabled={status === 'processing' || status === 'redirect'}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-green-600 rounded-lg p-6 mb-6">
              <p className="text-sm text-white opacity-90 mb-1">Total Amount Due</p>
              <p className="text-4xl font-bold text-white flex items-center gap-3">
                {isCalculating || status === 'processing' ? (
                  <>
                    <span>Calculating...</span>
                    <RefreshCw className="animate-spin w-8 h-8 text-white" />
                  </>
                ) : totalCost > 0 ? (
                  `৳${totalCost.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
                ) : (
                  '৳0'
                )}
              </p>
            </div>

            {/* Book Button */}
            <button
              onClick={handleProceedToBooking}
              // Disable button if no service, cost is zero, or calculation/processing is active
              disabled={!serviceName || totalCost === 0 || isCalculating || status !== 'idle'}
              className="w-full bg-green-600 text-white py-3 rounded-lg text-base font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
            >
              {status === 'processing' ? (
                <span className="flex items-center justify-center">
                  <RefreshCw className="animate-spin w-5 h-5 mr-2" /> Processing...
                </span>
              ) : (
                'Proceed to Booking'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}