import React, { useState, useEffect } from 'react';
import { Leaf, Calculator, Truck } from 'lucide-react';

export default function ServiceBookingForm() {
  const [serviceName, setServiceName] = useState('');
  const [acres, setAcres] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [loadKg, setLoadKg] = useState('');
  const [sqft, setSqft] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const services = [
    { name: 'Drone Surveillance', type: 'area', rate: 1, unit: 'sqft' },
    { name: 'IoT Implementation', type: 'area', rate: 1, unit: 'sqft' },
    { name: 'Soil Analysis', type: 'area', rate: 1, unit: 'sqft' },
    { name: 'Crop Monitoring', type: 'area', rate: 1, unit: 'sqft' },
    { name: 'Logistics Service', type: 'logistics', ratePerKm: 2, ratePerKg: 2 }
  ];

  const SQFT_PER_ACRE = 43560;
  const selectedService = services.find(s => s.name === serviceName);

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setServiceName(value);
    setAcres('');
    setKilometers('');
    setLoadKg('');
    setSqft(0);
    setTotalCost(0);
  };

  const handleAcreChange = (e) => {
    const value = e.target.value;
    setAcres(value);
    
    if (value && !isNaN(value) && parseFloat(value) > 0 && selectedService) {
      setIsCalculating(true);
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

  const handleKmChange = (e) => {
    const value = e.target.value;
    setKilometers(value);
    
    if (selectedService && selectedService.type === 'logistics') {
      setIsCalculating(true);
      setTimeout(() => {
        const km = parseFloat(value) || 0;
        const kg = parseFloat(loadKg) || 0;
        const kmCost = km * selectedService.ratePerKm;
        const kgCost = kg * selectedService.ratePerKg;
        setTotalCost(kmCost + kgCost);
        setIsCalculating(false);
      }, 500);
    }
  };

  const handleKgChange = (e) => {
    const value = e.target.value;
    setLoadKg(value);
    
    if (selectedService && selectedService.type === 'logistics') {
      setIsCalculating(true);
      setTimeout(() => {
        const km = parseFloat(kilometers) || 0;
        const kg = parseFloat(value) || 0;
        const kmCost = km * selectedService.ratePerKm;
        const kgCost = kg * selectedService.ratePerKg;
        setTotalCost(kmCost + kgCost);
        setIsCalculating(false);
      }, 500);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-amber-50 to-yellow-100 py-16 px-4">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex gap-5 items-center justify-center">
          {/* Left side - Image (hidden on tablet and mobile) */}
          <div className="hidden lg:block flex-1">
            <img
              src="/images/b.jpg"
              alt="Farmer using agriculture technology"
              className="rounded-3xl shadow-2xl w-full h-[440px] object-cover"
            />
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 w-full lg:flex-1 max-w-xl lg:max-w-none">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-green-600 p-3 rounded-lg">
                <Leaf className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Book a Service</h1>
            </div>

            {/* Service Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Name
              </label>
              <select
                value={serviceName}
                onChange={handleServiceChange}
                className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors bg-white"
              >
                <option value="">Select a Service</option>
                {services.map((service) => (
                  <option key={service.name} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Area-based Service Inputs */}
            {selectedService && selectedService.type === 'area' && (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Land Area (Acres)
                  </label>
                  <input
                    type="number"
                    value={acres}
                    onChange={handleAcreChange}
                    placeholder="Enter area in acres"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Calculation Display for Area Services */}
                {acres && parseFloat(acres) > 0 && (
                  <div className="bg-green-50 rounded-lg p-6 mb-6 border border-green-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Calculator className="text-green-600" size={18} />
                      <h3 className="font-semibold text-gray-700 text-sm">Calculation Details</h3>
                      {isCalculating && (
                        <div className="ml-auto">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Area in Square Feet:</span>
                        <span className="font-semibold text-gray-800">
                          {isCalculating ? 'Calculating...' : `${sqft.toLocaleString('en-US', { maximumFractionDigits: 2 })} sqft`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Rate per Square Foot:</span>
                        <span className="font-semibold text-gray-800">৳{selectedService.rate}</span>
                      </div>
                      <div className="h-px bg-green-300 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold text-sm">Total Cost:</span>
                        <span className="text-2xl font-bold text-green-600">
                          {isCalculating ? 'Calculating...' : `৳${totalCost.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Logistics Service Inputs */}
            {selectedService && selectedService.type === 'logistics' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Distance (Kilometers)
                  </label>
                  <input
                    type="number"
                    value={kilometers}
                    onChange={handleKmChange}
                    placeholder="Enter distance in km"
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Load Weight (Kilograms)
                  </label>
                  <input
                    type="number"
                    value={loadKg}
                    onChange={handleKgChange}
                    placeholder="Enter weight in kg"
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Calculation Display for Logistics */}
                {(kilometers || loadKg) && (parseFloat(kilometers) > 0 || parseFloat(loadKg) > 0) && (
                  <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Truck className="text-blue-600" size={18} />
                      <h3 className="font-semibold text-gray-700 text-sm">Logistics Calculation</h3>
                      {isCalculating && (
                        <div className="ml-auto">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      {parseFloat(kilometers) > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Distance Cost:</span>
                          <span className="font-semibold text-gray-800">
                            {isCalculating ? 'Calculating...' : `${kilometers} km × ৳${selectedService.ratePerKm} = ৳${(parseFloat(kilometers) * selectedService.ratePerKm).toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}`}
                          </span>
                        </div>
                      )}
                      {parseFloat(loadKg) > 0 && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Load Cost:</span>
                          <span className="font-semibold text-gray-800">
                            {isCalculating ? 'Calculating...' : `${loadKg} kg × ৳${selectedService.ratePerKg} = ৳${(parseFloat(loadKg) * selectedService.ratePerKg).toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}`}
                          </span>
                        </div>
                      )}
                      <div className="h-px bg-blue-300 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold text-sm">Total Cost:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {isCalculating ? 'Calculating...' : `৳${totalCost.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Result Box */}
            <div className="bg-green-600 rounded-lg p-6 mb-6">
              <p className="text-sm text-white opacity-90 mb-1">Total Amount</p>
              <p className="text-4xl font-bold text-white flex items-center gap-3">
                {isCalculating ? (
                  <>
                    <span>Calculating...</span>
                    <div className="animate-spin rounded-full h-8 w-8 border-3 border-white border-t-transparent"></div>
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
              disabled={!serviceName || totalCost === 0}
              className="w-full bg-green-600 text-white py-3 rounded-lg text-base font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Proceed to Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}