// 年龄计算器核心代码 - 适配 GitHub + Vercel
import { useState } from 'react';
import Head from 'next/head';

export default function AgeCalculator() {
  // 定义页面状态：生日输入、计算结果、错误提示
  const [birthDate, setBirthDate] = useState('');
  const [ageResult, setAgeResult] = useState(null);
  const [error, setError] = useState('');

  // 核心年龄计算逻辑
  const calculateAge = () => {
    // 清空之前的结果和错误
    setAgeResult(null);
    setError('');

    // 验证：未输入生日
    if (!birthDate) {
      setError('Please enter your date of birth!');
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);

    // 验证：生日不能是未来日期
    if (birth > today) {
      setError('Birth date cannot be in the future!');
      return;
    }

    // 计算年、月、日
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // 处理天数不足的情况（比如今天1号，生日5号）
    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // 处理月份不足的情况（比如今天1月，生日3月）
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // 保存计算结果
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
      {/* 页面标题和SEO配置 */}
      <Head>
        <title>Age Calculator Fast | Calculate Exact Age</title>
        <meta name="description" content="Free online age calculator to calculate your exact age in years, months and days." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* 计算器主体 */}
      <div style={{ 
        maxWidth: '400px', 
        width: '100%', 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
        padding: '30px' 
      }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          textAlign: 'center', 
          color: '#1f2937', 
          marginBottom: '30px' 
        }}>Age Calculator Fast</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label style={{ color: '#4b5563' }}>Enter Your Date of Birth:</label>
          
          {/* 生日输入框 */}
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={{ 
              border: '1px solid #d1d5db', 
              borderRadius: '6px', 
              padding: '10px', 
              outline: 'none' 
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />

          {/* 错误提示 */}
          {error && <p style={{ color: '#ef4444', fontSize: '14px', margin: 0 }}>{error}</p>}

          {/* 计算按钮 */}
          <button
            onClick={calculateAge}
            style={{ 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              padding: '10px', 
              fontSize: '16px', 
              cursor: 'pointer' 
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Calculate My Age
          </button>

          {/* 结果展示 */}
          {ageResult && (
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              backgroundColor: '#ecfdf5', 
              borderRadius: '6px', 
              border: '1px solid #d1fae5' 
            }}>
              <h2 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#065f46', 
                margin: 0 0 10px 0 
              }}>Your Exact Age:</h2>
              <p style={{ color: '#1f2937', margin: 0 }}>
                You are <strong>{ageResult.years}</strong> years, 
                <strong>{ageResult.months}</strong> months, 
                and <strong>{ageResult.days}</strong> days old!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* 底部版权 */}
    <p style={{ 
      color: '#6b7280', 
      fontSize: '14px', 
      textAlign: 'center', 
      marginTop: '20px' 
    }}>
      © 2026 AgeCalculatorFast.com
    </p>
  );
}
