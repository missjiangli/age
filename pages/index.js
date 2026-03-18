import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  // 状态管理
  const [activeTab, setActiveTab] = useState('age');
  const [birthDate, setBirthDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ageResult, setAgeResult] = useState(null);
  const [zodiacResult, setZodiacResult] = useState(null);
  const [diffResult, setDiffResult] = useState(null);

  // 初始化日期
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setEndDate(today);
    // 设置生日输入框最大值为今天
    document.getElementById('birthDate')?.setAttribute('max', today);
  }, []);

  // 切换标签
  const switchTab = (tabName) => {
    setActiveTab(tabName);
  };

  // 生肖数据（英文版本）
  const zodiacData = {
    0: { 
      name: 'Monkey', 
      icon: '🐵', 
      trait: 'Clever and smart, curious, good at solving problems, excellent adaptability', 
      element: 'Metal', 
      numbers: '4, 9', 
      match: 'Rat, Dragon' 
    },
    1: { 
      name: 'Rooster', 
      icon: '🐔', 
      trait: 'Hardworking and steady, detail-oriented, honest and trustworthy, strong sense of responsibility', 
      element: 'Metal', 
      numbers: '5, 7', 
      match: 'Ox, Snake' 
    },
    2: { 
      name: 'Dog', 
      icon: '🐶', 
      trait: 'Loyal and reliable, strong sense of justice, kind and friendly, protective', 
      element: 'Earth', 
      numbers: '3, 4', 
      match: 'Tiger, Rabbit' 
    },
    3: { 
      name: 'Pig', 
      icon: '🐷', 
      trait: 'Honest and kind, optimistic and open-minded, sincere to others, compassionate', 
      element: 'Water', 
      numbers: '2, 5', 
      match: 'Goat, Rabbit' 
    },
    4: { 
      name: 'Rat', 
      icon: '🐭', 
      trait: 'Witty and flexible, adaptable, good at socializing, creative', 
      element: 'Water', 
      numbers: '2, 3', 
      match: 'Ox, Dragon, Monkey' 
    },
    5: { 
      name: 'Ox', 
      icon: '🐮', 
      trait: 'Hardworking and steady, perseverance, honest and trustworthy, patient and persistent', 
      element: 'Earth', 
      numbers: '1, 4', 
      match: 'Rat, Snake, Rooster' 
    },
    6: { 
      name: 'Tiger', 
      icon: '🐯', 
      trait: 'Brave and confident, strong leadership, enthusiastic, adventurous', 
      element: 'Wood', 
      numbers: '3, 8', 
      match: 'Horse, Dog' 
    },
    7: { 
      name: 'Rabbit', 
      icon: '🐰', 
      trait: 'Gentle and kind, delicate mind, elegant and quiet, considerate', 
      element: 'Wood', 
      numbers: '3, 6', 
      match: 'Goat, Dog, Pig' 
    },
    8: { 
      name: 'Dragon', 
      icon: '🐲', 
      trait: 'Full of vitality, confident, ambitious, creative', 
      element: 'Earth', 
      numbers: '1, 6', 
      match: 'Rat, Monkey, Rooster' 
    },
    9: { 
      name: 'Snake', 
      icon: '🐍', 
      trait: 'Wise and profound, quick thinking, mysterious and elegant, strong insight', 
      element: 'Fire', 
      numbers: '2, 8', 
      match: 'Ox, Rooster' 
    },
    10: { 
      name: 'Horse', 
      icon: '🐴', 
      trait: 'Passionate and unrestrained, free-spirited, quick thinking, good at socializing', 
      element: 'Fire', 
      numbers: '2, 7', 
      match: 'Tiger, Goat, Dog' 
    },
    11: { 
      name: 'Goat', 
      icon: '🐑', 
      trait: 'Gentle and elegant, kind and considerate, compassionate, artistic talent', 
      element: 'Earth', 
      numbers: '3, 9', 
      match: 'Rabbit, Horse, Pig' 
    }
  };

  // 计算年龄 + 生肖
  const calculateAgeAndZodiac = () => {
    if (!birthDate) {
      alert('Please select your birth date');
      return;
    }
    
    const birth = new Date(birthDate);
    const now = new Date();
    
    if (birth > now) {
      alert('Birth date cannot be later than today');
      return;
    }
    
    // 计算年龄
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const diffTime = Math.abs(now - birth);
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // 下次生日
    let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const nextBirthdayStr = nextBirthday.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
    
    // 设置年龄结果
    setAgeResult({
      years,
      months,
      days,
      totalDays,
      mainText: `You are ${years} years old`,
      nextBirthday: nextBirthdayStr
    });
    
    // 计算生肖
    const birthYear = birth.getFullYear();
    const zodiacIndex = birthYear % 12;
    const data = zodiacData[zodiacIndex];
    
    setZodiacResult({
      ...data,
      yearText: `Born in ${birthYear}`
    });
  };

  // 计算日期间隔
  const calculateDiff = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      alert('Start date cannot be later than end date');
      return;
    }
    
    const diffTime = end - start;
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    
    // 计算年月日
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    
    if (days < 0) {
      months--;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    
    let text = '';
    if (years > 0) text += `${years} years `;
    if (months > 0) text += `${months} months `;
    if (days > 0 || (years === 0 && months === 0)) text += `${days} days`;
    
    setDiffResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      mainText: text.trim(),
      totalText: `Total: ${totalDays.toLocaleString()} days (about ${totalWeeks} weeks)`
    });
  };

  return (
    <>
      <Head>
        <title>AgeCalcFast - Age Calculator | Date Difference | Chinese Zodiac | Pension Calculator (Estonia)</title>
        <meta name="description" content="Simple and easy-to-use age calculation tool: calculate exact age, zodiac personality, date intervals, and Estonian pension" />
        <meta name="keywords" content="age calculator, date difference calculator, chinese zodiac calculator, birthday calculator, how old am I, estonian pension calculator, pensionikalkulaator" />
        <meta name="google-site-verification" content="001C0BjF7D8IdDOLz19yQBrXpYVhwVhgmlU4RgBY8kdsA" />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <style jsx global>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #3b82f6;
            --primary-dark: #2563eb;
            --secondary: #8b5cf6;
            --success: #10b981;
            --warning: #f59e0b;
            --bg: #f8fafc;
            --card: #ffffff;
            --text: #1e293b;
            --text-light: #64748b;
            --border: #e2e8f0;
            --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
            min-height: 100vh;
        }

        /* Header */
        header {
            background: var(--card);
            border-bottom: 1px solid var(--border);
            position: sticky;
            top: 0;
            z-index: 100;
            backdrop-filter: blur(10px);
            background-color: rgba(255, 255, 255, 0.9);
        }

        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .logo svg {
            width: 32px;
            height: 32px;
            fill: var(--primary);
        }

        /* Navigation */
        nav {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap; /* 适配移动端换行 */
        }

        .nav-btn {
            padding: 0.5rem 1.25rem;
            border: none;
            background: transparent;
            color: var(--text-light);
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            border-radius: 0.5rem;
            transition: all 0.2s;
            white-space: nowrap;
        }

        .nav-btn:hover {
            background: var(--bg);
            color: var(--text);
        }

        .nav-btn.active {
            background: var(--primary);
            color: white;
        }

        /* 爱沙尼亚语导航按钮特殊样式（区分语种） */
        .nav-btn.et-btn {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
        }

        .nav-btn.et-btn:hover {
            background: linear-gradient(135deg, #059669, #047857);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }

        /* Main Container */
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem 1.5rem;
        }

        /* Tool Sections */
        .tool-section {
            display: none;
            animation: fadeIn 0.3s ease;
        }

        .tool-section.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .tool-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .tool-header h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            color: var(--text);
        }

        .tool-header p {
            color: var(--text-light);
            font-size: 1.1rem;
        }

        /* Card */
        .card {
            background: var(--card);
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border);
            margin-bottom: 1.5rem;
        }

        /* Form Elements */
        .form-group {
            margin-bottom: 1.5rem;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--text);
            font-size: 0.95rem;
        }

        input[type="date"] {
            width: 100%;
            padding: 0.875rem 1rem;
            border: 2px solid var(--border);
            border-radius: 0.5rem;
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.2s;
            background: var(--card);
            color: var(--text);
        }

        input[type="date"]:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .date-inputs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        @media (max-width: 640px) {
            .date-inputs {
                grid-template-columns: 1fr;
            }
            
            .nav-btn {
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
            }
        }

        /* Button */
        .btn {
            width: 100%;
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            margin-top: 0.5rem;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn-secondary {
            background: linear-gradient(135deg, var(--secondary), #7c3aed);
        }

        .btn-secondary:hover {
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }

        /* Results */
        .result {
            margin-top: 1.5rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
            border-radius: 0.75rem;
            border-left: 4px solid var(--primary);
            display: none;
        }

        .result.show {
            display: block;
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .result-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .result-item {
            text-align: center;
            padding: 1.25rem 1rem;
            background: white;
            border-radius: 0.75rem;
            box-shadow: var(--shadow);
            transition: transform 0.2s;
        }

        .result-item:hover {
            transform: translateY(-2px);
        }

        .result-number {
            font-size: 2rem;
            font-weight: 800;
            color: var(--primary);
            line-height: 1;
        }

        .result-label {
            font-size: 0.875rem;
            color: var(--text-light);
            margin-top: 0.5rem;
            font-weight: 500;
        }

        .result-highlight {
            font-size: 1.25rem;
            color: var(--text);
            font-weight: 600;
            text-align: center;
            margin-bottom: 1rem;
        }

        /* Zodiac Section within Age Tool */
        .zodiac-section {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 2px dashed var(--border);
            display: none;
        }

        .zodiac-section.show {
            display: block;
            animation: fadeIn 0.5s ease;
        }

        .zodiac-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .zodiac-icon-large {
            font-size: 3.5rem;
            line-height: 1;
        }

        .zodiac-info h3 {
            font-size: 1.5rem;
            color: var(--text);
            margin: 0;
        }

        .zodiac-info p {
            color: var(--text-light);
            margin: 0.25rem 0 0 0;
            font-size: 0.9rem;
        }

        .zodiac-trait-box {
            background: white;
            padding: 1rem 1.25rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            font-style: italic;
            color: var(--text-light);
            text-align: center;
            border-left: 3px solid var(--secondary);
        }

        .zodiac-meta {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-top: 1rem;
        }

        @media (max-width: 480px) {
            .zodiac-meta {
                grid-template-columns: 1fr;
            }
        }

        .zodiac-meta-item {
            background: white;
            padding: 0.75rem;
            border-radius: 0.5rem;
            text-align: center;
            font-size: 0.875rem;
        }

        .zodiac-meta-label {
            color: var(--text-light);
            font-size: 0.8rem;
            margin-bottom: 0.25rem;
        }

        .zodiac-meta-value {
            color: var(--text);
            font-weight: 600;
            font-size: 1rem;
        }

        /* Date Diff Specific */
        .diff-breakdown {
            background: white;
            padding: 1.5rem;
            border-radius: 0.75rem;
            margin-bottom: 1rem;
            text-align: center;
            font-size: 1.5rem;
            color: var(--text);
            font-weight: 700;
            box-shadow: var(--shadow);
        }

        .diff-total {
            text-align: center;
            color: var(--text-light);
            font-size: 1rem;
            margin-bottom: 1rem;
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 2rem;
            color: var(--text-light);
            font-size: 0.875rem;
            border-top: 1px solid var(--border);
            margin-top: 2rem;
        }

        /* Section Title */
        .section-title {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .section-title::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 1.2em;
            background: var(--primary);
            border-radius: 2px;
        }
      `}</style>

      <header>
          <div className="header-content">
              <div className="logo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                  </svg>
                  AgeCalcFast
              </div>
              <nav>
                  <button 
                      className={`nav-btn ${activeTab === 'age' ? 'active' : ''}`} 
                      onClick={() => switchTab('age')}
                  >
                      Age & Zodiac
                  </button>
                  <button 
                      className={`nav-btn ${activeTab === 'diff' ? 'active' : ''}`} 
                      onClick={() => switchTab('diff')}
                  >
                      Date Difference
                  </button>
                  {/* 新增爱沙尼亚语养老金计算器导航按钮 */}
                  <a 
                      href="/et/pensionikalkulaator/" 
                      className="nav-btn et-btn"
                      target="_self" // 同页面跳转
                  >
                      Pensionikalkulaator (ET)
                  </a>
              </nav>
          </div>
      </header>

      <div className="container">
          {/* 1. Age + Zodiac */}
          <section id="age" className={`tool-section ${activeTab === 'age' ? 'active' : ''}`}>
              <div className="tool-header">
                  <h1>🎂 Age Calculator & Chinese Zodiac</h1>
                  <p>Select your birth date to get your exact age and zodiac information</p>
              </div>
              
              <div className="card">
                  <div className="form-group">
                      <label htmlFor="birthDate">Your Birth Date</label>
                      <input 
                          type="date" 
                          id="birthDate" 
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                      />
                  </div>
                  
                  <button className="btn" onClick={calculateAgeAndZodiac}>
                      Calculate Age & Check Zodiac
                  </button>
                  
                  {/* Age Result */}
                  <div id="ageResult" className={`result ${ageResult ? 'show' : ''}`}>
                      <div className="section-title">Age Information</div>
                      <div className="result-highlight">
                          {ageResult?.mainText}
                      </div>
                      <div className="result-grid">
                          <div className="result-item">
                              <div className="result-number">{ageResult?.years || 0}</div>
                              <div className="result-label">Years</div>
                          </div>
                          <div className="result-item">
                              <div className="result-number">{ageResult?.months || 0}</div>
                              <div className="result-label">Months</div>
                          </div>
                          <div className="result-item">
                              <div className="result-number">{ageResult?.days || 0}</div>
                              <div className="result-label">Days</div>
                          </div>
                          <div className="result-item">
                              <div className="result-number">{ageResult?.totalDays?.toLocaleString() || 0}</div>
                              <div className="result-label">Total Days</div>
                          </div>
                      </div>
                      <div style={{marginTop: '1rem', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.9rem', padding: '0.75rem', background: 'rgba(255,255,255,0.5)', borderRadius: '0.5rem'}}>
                          🎉 Next Birthday: <span style={{color: 'var(--primary)', fontWeight: 700}}>{ageResult?.nextBirthday}</span>
                      </div>
                  </div>
                  
                  {/* Zodiac Result */}
                  <div id="zodiacResult" className={`zodiac-section ${zodiacResult ? 'show' : ''}`}>
                      <div className="section-title" style={{'--primary': 'var(--secondary)'}}>Zodiac Information</div>
                      <div className="zodiac-header">
                          <div className="zodiac-icon-large">{zodiacResult?.icon || '🐭'}</div>
                          <div className="zodiac-info">
                              <h3>{zodiacResult?.name || 'Rat'} Year</h3>
                              <p>{zodiacResult?.yearText || 'Born in 2000'}</p>
                          </div>
                      </div>
                      <div className="zodiac-trait-box">
                          {zodiacResult?.trait || 'Witty and flexible, adaptable, good at socializing, creative'}
                      </div>
                      <div className="zodiac-meta">
                          <div className="zodiac-meta-item">
                              <div className="zodiac-meta-label">Element</div>
                              <div className="zodiac-meta-value">{zodiacResult?.element || 'Water'}</div>
                          </div>
                          <div className="zodiac-meta-item">
                              <div className="zodiac-meta-label">Lucky Numbers</div>
                              <div className="zodiac-meta-value">{zodiacResult?.numbers || '2, 3'}</div>
                          </div>
                          <div className="zodiac-meta-item">
                              <div className="zodiac-meta-label">Compatible Zodiacs</div>
                              <div className="zodiac-meta-value">{zodiacResult?.match || 'Dragon, Monkey'}</div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* 2. Date Difference */}
          <section id="diff" className={`tool-section ${activeTab === 'diff' ? 'active' : ''}`}>
              <div className="tool-header">
                  <h1>📅 Date Difference Calculator</h1>
                  <p>Calculate the time difference between two dates</p>
              </div>
              
              <div className="card">
                  <div className="date-inputs">
                      <div className="form-group">
                          <label htmlFor="startDate">Start Date</label>
                          <input 
                              type="date" 
                              id="startDate" 
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="endDate">End Date</label>
                          <input 
                              type="date" 
                              id="endDate" 
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                          />
                      </div>
                  </div>
                  
                  <button className="btn btn-secondary" onClick={calculateDiff}>
                      Calculate Difference
                  </button>
                  
                  <div id="diffResult" className={`result ${diffResult ? 'show' : ''}`}>
                      <div className="diff-breakdown">{diffResult?.mainText || '0 days'}</div>
                      <div className="diff-total">{diffResult?.totalText || 'Total: 0 days (about 0 weeks)'}</div>
                      <div className="result-grid">
                          <div className="result-item">
                              <div className="result-number">{diffResult?.years || 0}</div>
                              <div className="result-label">Years</div>
                          </div>
                          <div className="result-item">
                              <div className="result-number">{diffResult?.months || 0}</div>
                              <div className="result-label">Months</div>
                          </div>
                          <div className="result-item">
                              <div className="result-number">{diffResult?.days || 0}</div>
                              <div className="result-label">Days</div>
                          </div>
                          <div className="result-item">
                              <div className="result-number">{diffResult?.totalWeeks || 0}</div>
                              <div className="result-label">Weeks</div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>

      <footer>
          <p>© 2024 AgeCalcFast.com - Simple and easy-to-use age calculation tool</p>
      </footer>
    </>
  );
}
