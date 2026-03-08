import { useState } from 'react';
import Head from 'next/head';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [ageResult, setAgeResult] = useState(null);
  const [error, setError] = useState('');

  const calculateAge = () => {
    setAgeResult(null);
    setError('');
    if (!birthDate) {
      setError('Please enter your date of birth!');
      return;
    }
    const today = new Date();
    const birth = new Date(birthDate);
    if (birth > today) {
      setError('Birth date cannot be in the future!');
      return;
    }
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    setAgeResult({ years, months, days });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px' 
    }}>
      <Head>
        <title>Age Calculator Fast</title>
        <meta name="description" content="Free online age calculator" />
      </Head>
      <div style={{ 
        maxWidth: '400px', 
        width: '100%', 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
        padding: '30px' 
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}>Age Calculator Fast</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label>Enter Your Date of Birth:</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={{ border: '1px solid #d1d5db', borderRadius: '6px', padding: '10px', outline: 'none' }}
          />
          {error && <p style={{ color: '#ef4444', fontSize: '14px', margin: 0 }}>{error}</p>}
          <button
            onClick={calculateAge}
            style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', padding: '10px', cursor: 'pointer' }}
          >
            Calculate My Age
          </button>
          {ageResult && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#ecfdf5', borderRadius: '6px' }}>
              <p>You are <strong>{ageResult.years}</strong> years, <strong>{ageResult.months}</strong> months, <strong>{ageResult.days}</strong> days old!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}