import { useState, useEffect } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import WebApp from '@twa-dev/sdk';
import './App.css';

function App() {
  const { connected, wallet } = useTonConnect();
  const [tonBalance, setTonBalance] = useState('0.00');
  const [rapBalance, setRapBalance] = useState('0.00');
  const [amount, setAmount] = useState('');

  // Contract address
  const PRESALE_ADDRESS = 'EQDBziMwzxZBqZ0nvyuLdR0-6DUqcNTVCJAMjqQ-Y5dbGLAO';

  // Update balances when wallet connects
  useEffect(() => {
    if (wallet) {
      updateBalances();
    }
  }, [wallet]);

  // Update balances
  const updateBalances = async () => {
    try {
      const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${wallet.account.address}`);
      const data = await response.json();
      if (data.ok) {
        const balance = data.result / 1e9;
        setTonBalance(balance.toFixed(2));
      }
      // Mock RAP balance for now
      setRapBalance('0.00');
    } catch (error) {
      console.error('Error updating balances:', error);
    }
  };

  // Handle amount input
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (value >= 0.5 && value <= 1000)) {
      setAmount(value);
    }
  };

  // Handle buy button click
  const handleBuyClick = async () => {
    if (!connected || !amount) return;

    try {
      // Here we'll add the transaction logic
      console.log('Buying RAP tokens...');
      WebApp.showAlert(`Buying ${amount} RAP tokens...`);
    } catch (error) {
      console.error('Error buying tokens:', error);
      WebApp.showAlert('Error buying tokens. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>RAP Token Presale</h1>
          <p className="balance">Balance: {tonBalance} TON</p>
        </div>

        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount (0.5 - 1000 TON)"
            min="0.5"
            max="1000"
            step="0.1"
          />
          <span className="currency">TON</span>
        </div>

        <div className="info">
          <p>You will receive: {amount || '0'} RAP</p>
          <p>Rate: 1 TON = 1 RAP</p>
        </div>

        <div className="buttons">
          {!connected ? (
            <TonConnectButton />
          ) : (
            <button
              className="buy-button"
              onClick={handleBuyClick}
              disabled={!amount || amount < 0.5 || amount > 1000}
            >
              Buy RAP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
