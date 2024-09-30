'use client';
import withRole from '@/hoc/roleGuard';
import axios from 'axios';
import { useRouter } from 'next/router'; // Use Next.js router
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import React from 'react';

type Props = {
  params: { id: number; userId: number };
};
type Transaction = {
  id: number;
  userId: string;
  eventId: string;
  qty: string;
  total: string;
  status: string;
  transactionDate: string;
};
const Balance: React.FC = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState({
    address: '',
    image: '',
    dateOfBirth: '',
    firstName: '',
    lastName: '',
    gender: '',
    user: { balance: '', points: '', email: '', identificationId: '' },
    location: { locationName: '..' },
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<Transaction[]>([]); // Ensure array type for transactions
  const [balance, setBalance] = useState(true);
  const [balanceValue, setBalanceValue] = useState('');
  // const router = useRouter();

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const response = await axios.get(
        'http://localhost:8000/api/user/profile',
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setData(response.data.result[0]);
    } catch (error) {
      setError('Failed to fetch profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `http://localhost:8000/api/transaction/transaction/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setTransaction(response.data.data);
    } catch (error) {
      setError('Failed to fetch transactions');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const updateBalance = async () => {
    const token = localStorage.getItem('token');
    if (!balanceValue) {
      setError('Please enter a valid balance');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/api/balance-point/user/`,
        { balance: parseFloat(balanceValue) }, // Parse balance value to float
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      fetchUser(); // Refresh profile data after updating balance
    } catch (error) {
      setError('Failed to update balance');
      console.error(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBalanceValue(e.target.value);
  };

  return (
    <div className="h-full pt-20 px-32">
      <div className="h-screen flex items-center justify-center space-x-5 flex-nowrap flex-col">
        <div className="pb-12 text-4xl"> Your balance </div>
        <div className="flex items-center justify-center space-x-5"> 
          <div className=' border-black border-[1px] h-96'> 
          {data && Object.keys(data.address).length > 0 ? (
            <div className=" w-[400px] border-black border-[1px] p-7">
              <h3 className="text-2xl pb-4">Owner Balance profile </h3>
              <h1>
                Name: {data.firstName} {data.lastName}
              </h1>
              <p>Gender: {data.gender}</p>
              <p>Address: {data.address}</p>
              <p>Phone: {data.phoneNumber}</p>
              <p>Date of Birth: {data.dateOfBirth}</p>
              <p>Location : {data.location.locationName || 'data error'}</p>
              <p>Identification: {data.user.identificationId}</p>
              <p>Email: {data.user.email}</p>
              <p>Balance: {data.user.balance}</p>
              <p>Point: {data.user.points}</p>
            </div>
          ) : (
            <p className='py-20 h-full flex items-center px-4'>  Data profile not found please create </p>
          )} </div>
          <div className=" w-[400px] border-black border-[1px] p-7">
            <h3 className="pb-5 text-2xl">Top up</h3>
            {balance && (
              <div>
                <input
                  type="number"
                  name="Balance"
                  placeholder="Add your balance"
                  value={balanceValue}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded mb-4"
                  required
                />
                <button
                  onClick={updateBalance}
                  disabled={loading}
                  className="border-black border-2 py-1 px-2 rounded-full"
                >
                  {loading ? 'Adding...' : 'Free balance'}
                </button>
                <button
                  onClick={updateBalance}
                  disabled={loading}
                  className="border-black border-2 py-1 px-2 rounded-full mx-2"
                >
                  {loading ? 'Adding...' : 'Midtrans'}
                </button>
              </div>
            )}
          </div>{' '}
        </div>{' '}
      </div>
      <div className="h-screen flex justify-center space-x-5 flex-nowrap pt-20">
        <div className="">
          <h3 className="text-4xl pb-2">Transactions event </h3>
          <div>
            {Array.isArray(transaction) && transaction.length > 0 ? (
              transaction.map((tx) => (
                <div key={tx.id} className="py-4">
                  <p>Transaction ID: {tx.id}</p>
                  <p>User ID: {tx.userId}</p>
                  <p>Event ID: {tx.eventId}</p>
                  <p>Quantity: {tx.qty}</p>
                  <p>Total: {tx.total}</p>
                  <p>Status: {tx.status}</p>
                  <p>Status: {tx.transactionDate}</p>
                </div>
              ))
            ) : (
              <p className="text-red-900 w-full text-center flex justify-center">
                No transactions found.
              </p>
            )}
          </div>{' '}
        </div>
      </div>
    </div>
  );
};

export default Balance; // Use role guard for component access
