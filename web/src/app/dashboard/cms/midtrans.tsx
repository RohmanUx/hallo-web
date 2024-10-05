import { useEffect } from 'react';
import Head from 'next/head';
// global.d.ts
interface window {
    snap: {
      pay: (token: string) => void;
      // Add other methods and properties of snap if needed
    };
  }
  
const MidtransPage = () => {
  useEffect(() => {
    // Load Midtrans Snap.js from the CDN
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', 'YOUR_CLIENT_KEY'); // ganti dengan Client Key dari Midtrans
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Function to call Midtrans Snap payment
  const handlePay = ( ) => {
   //   window.snap.pay('TRANSACTION_TOKEN'); // Ganti dengan  token transaksi dari Midtrans
  };

    return (                        
    <>
      <Head>
        <title>Midtrans Payment</title>
      </Head>
      <div className="container">
        <h1>Midtrans Payment Page</h1>
        <button onClick={handlePay}>Pay with Midtrans</button>
      </div>
    </>
  );
};

export default MidtransPage;
