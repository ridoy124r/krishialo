import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

// Mock API function to simulate updating the booking status in the database
const api = {
    // In a real app, this endpoint would verify the Stripe session ID 
    // and update the booking status to 'PAID' and 'CONFIRMED'.
    updateBookingStatus: async (bookingId, status) => {
        console.log(`[MOCK API] Updating Booking ID ${bookingId} to status: ${status}`);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network and database delay
        
        if (status === 'success') {
            return { success: true, message: 'Booking confirmed and payment processed.' };
        } else {
            // Simulate a failure to update if payment failed
            throw new Error('Payment was canceled or failed. Booking status remains pending.');
        }
    }
};

/**
 * Component to handle and display the result of an external payment redirect.
 */
export default function PaymentStatus() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // State to manage the confirmation process
    const [confirmationStatus, setConfirmationStatus] = useState('loading'); // loading | success | failed
    const [message, setMessage] = useState('Verifying payment and confirming your booking...');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentStatus = queryParams.get('status'); // Expected: 'success' or 'cancel'
        const bookingId = queryParams.get('bookingId'); // The ID of the booking to confirm

        // Function to run the confirmation logic
        const processPaymentResult = async () => {
            if (!bookingId) {
                setConfirmationStatus('failed');
                setMessage('Error: Booking ID is missing from the payment return URL.');
                return;
            }

            if (paymentStatus === 'success') {
                try {
                    // Simulate calling the backend to confirm the booking
                    await api.updateBookingStatus(bookingId, 'success');
                    setConfirmationStatus('success');
                    setMessage('Your service has been successfully booked and paid for! A confirmation email has been sent.');
                } catch (error) {
                    setConfirmationStatus('failed');
                    setMessage(`Failed to confirm booking: ${error.message}. Please check your payment status.`);
                }
            } else if (paymentStatus === 'cancel') {
                setConfirmationStatus('failed');
                setMessage('Payment was canceled or failed. Your booking is still pending payment.');
            } else {
                setConfirmationStatus('failed');
                setMessage('Invalid payment response received.');
            }
        };

        // Start processing after a short delay to simulate redirection time
        const timer = setTimeout(processPaymentResult, 500); 
        return () => clearTimeout(timer); // Cleanup timer
    }, [location.search]);


    const renderContent = () => {
        const baseClass = "flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl transition-all duration-500";
        
        if (confirmationStatus === 'loading') {
            return (
                <div className={`${baseClass} bg-white max-w-lg w-full`}>
                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Processing Payment...</h1>
                    <p className="text-gray-600 text-center">{message}</p>
                </div>
            );
        }

        if (confirmationStatus === 'success') {
            return (
                <div className={`${baseClass} bg-green-50 max-w-2xl w-full border-4 border-green-300`}>
                    <CheckCircle2 className="w-20 h-20 text-green-600 mb-6" />
                    <h1 className="text-3xl font-extrabold text-green-800 mb-4">Payment Confirmed!</h1>
                    <p className="text-lg text-green-700 text-center mb-8">{message}</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    >
                        View My Bookings
                    </button>
                    <button
                        onClick={() => navigate('/services')}
                        className="w-full sm:w-auto mt-3 px-8 py-3 text-green-600 font-semibold border border-green-600 rounded-lg hover:bg-green-100 transition-colors"
                    >
                        Explore More Services
                    </button>
                </div>
            );
        }

        if (confirmationStatus === 'failed') {
            return (
                <div className={`${baseClass} bg-red-50 max-w-2xl w-full border-4 border-red-300`}>
                    <XCircle className="w-20 h-20 text-red-600 mb-6" />
                    <h1 className="text-3xl font-extrabold text-red-800 mb-4">Payment Failed/Canceled</h1>
                    <p className="text-lg text-red-700 text-center mb-8">{message}</p>
                    <button
                        onClick={() => navigate('/services')}
                        className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
                    >
                        Try Booking Again
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto mt-3 px-8 py-3 text-red-600 font-semibold border border-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {renderContent()}
        </div>
    );
}