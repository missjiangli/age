// pages/et/pensionikalkulaator/index.js
import Head from 'next/head';
import { useState } from 'react';

export default function EstonianPensionCalculator() {
  // 状态管理：工资、工龄、计算结果
  const [monthlySalary, setMonthlySalary] = useState('');
  const [workYears, setWorkYears] = useState('');
  const [result, setResult] = useState('Sisesta andmed ja vajuta "Arvuta pension"');

  // 爱沙尼亚养老金计算逻辑
  const calculatePension = () => {
    const salary = parseFloat(monthlySalary) || 0;
    const years = parseFloat(workYears) || 0;
    
    // 爱沙尼亚官方简化公式
    const fullWorkYears = 40; // 40年工龄=满额养老金
    const replacementRate = 0.4; // 工资替代率40%
    const pensionRatio = years / fullWorkYears;
    const estimatedPension = salary * replacementRate * pensionRatio;
    
    // 显示结果（保底0欧元，保留2位小数）
    const finalPension = Math.max(0, estimatedPension).toFixed(2);
    setResult(`Näidis-vanaduspension: ${finalPension} € kuus`);
  };

  return (
    <div style={pageStyle}>
      <Head>
        <title>Pensionikalkulaator | Arvuta oma vanaduspensioni Eestis</title>
        <meta 
          name="description" 
          content="Tasuta pensionikalkulaator – arvuta oma tulevane pension põhjal töötasu ja tööaega. Lihtne ja kiire kasutada!" 
        />
        <link rel="canonical" href="https://missjiangli.github.io/age/et/pensionikalkulaator/" />
        <link rel="alternate" hreflang="et" href="https://missjiangli.github.io/age/et/pensionikalkulaator/" />
        <link rel="alternate" hreflang="x-default" href="https://missjiangli.github.io/age/" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* 语言切换按钮 */}
      <div style={langSwitcherStyle}>
        <a href="/" style={langLinkStyle}>EN</a>
        <a href="#" style={{...langLinkStyle, fontWeight: 'bold'}}>ET</a>
      </div>

      {/* 页面标题 */}
      <h1 style={titleStyle}>Pensionikalkulaator – Arvuta oma vanaduspensioni Eestis</h1>

      {/* 计算器核心 */}
      <div style={calculatorStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Kuu töötasu (€):</label>
          <input
            type="number"
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(e.target.value)}
            placeholder="Näiteks: 1500"
            min="0"
            step="0.01"
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Tööaeg (aastad):</label>
          <input
            type="number"
            value={workYears}
            onChange={(e) => setWorkYears(e.target.value)}
            placeholder="Näiteks: 30"
            min="0"
            max="45"
            style={inputStyle}
          />
        </div>

        <button onClick={calculatePension} style={buttonStyle}>
          Arvuta pension
        </button>

        <div style={resultStyle}>{result}</div>
      </div>

      {/* 本地化说明 */}
      <div style={infoStyle}>
        <h2 style={infoTitleStyle}>Kuidas töötab see pensionikalkulaator?</h2>
        <p style={infoTextStyle}>
          See tasuta kalkulaator annab näidisarvu oma tulevase vanaduspensioni kohta Eestis. 
          Arvutus põhineb lihtsustatud valemit – täpse pensioni arvutab Eesti Sotsiaalkindlustusamet (SKA).
        </p>
        <p style={infoTextStyle}>
          Tulemus on ainult viide – ametlikku pensioni arvutust teostab SKA oma portaalis.
        </p>
      </div>
    </div>
  );
}

// 内联样式（适配 Next.js，无需额外 CSS 文件）
const pageStyle = {
  maxWidth: '800px',
  margin: '20px auto',
  padding: '0 20px',
  fontFamily: 'Arial, sans-serif',
};

const langSwitcherStyle = {
  textAlign: 'right',
  marginBottom: '20px',
};

const langLinkStyle = {
  color: '#0066cc',
  textDecoration: 'none',
  marginLeft: '10px',
};

const titleStyle = {
  margin: '20px 0',
  color: '#333',
};

const calculatorStyle = {
  margin: '30px 0',
  padding: '20px',
  border: '1px solid #eee',
  borderRadius: '8px',
};

const inputGroupStyle = {
  margin: '15px 0',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
  color: '#444',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '12px 24px',
  backgroundColor: '#0066cc',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px',
};

const resultStyle = {
  marginTop: '20px',
  padding: '15px',
  backgroundColor: '#f5f8ff',
  borderRadius: '4px',
  fontSize: '18px',
  color: '#333',
};

const infoStyle = {
  marginTop: '30px',
  color: '#666',
  lineHeight: '1.6',
};

const infoTitleStyle = {
  marginBottom: '10px',
  color: '#444',
};

const infoTextStyle = {
  marginBottom: '10px',
};
