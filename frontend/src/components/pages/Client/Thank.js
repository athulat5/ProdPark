
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import successAnimation from '../pay.json';


const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/BuyProduct'); // redirect to BuyProduct page
    }, 3000); // duration of the animation in milliseconds

    return () => clearTimeout(timer); // cleanup on unmount
  }, [navigate]);

  return (
    <div>
      <Lottie animationData={successAnimation} loop={false} />
      <h1>Payment Successful!</h1>
    </div>
  );
};

export default PaymentSuccess;
