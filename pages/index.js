// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import { Lunar, Solar, FiveElement } from 'lunar-javascript';

// 全局样式（统一配色+现代风格）
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
  
  :root {
    --primary: #3b82f6; /* 主色调：柔和蓝 */
    --primary-hover: #2563eb;
    --secondary: #14b8a6; /* 生肖模块色：青绿色 */
    --success: #22c55e; /* 五行模块色：绿色 */
    --neutral-50: #f9fafb;
    --neutral-100: #f3f4f6;
    --neutral-200: #e5e7eb;
    --neutral-700: #374151;
    --neutral-900: #111827;
    --red-600: #dc2626;
    --green-600: #16a34a;
  }
  
  body {
    background-color: var(--neutral-50);
    color: var(--neutral-700);
  }
  
  /* 自定义日期选择器样式 */
  .react-datepicker {
    border: none !important;
    border-radius: 12px !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1) !important;
    padding: 1rem !important;
    font-family: 'Inter', sans-serif !important;
  }
  
  .react-datepicker__header {
    background-color: white !important;
    border-bottom: 1px solid var(--neutral-100) !important;
    padding: 1rem !important;
  }
  
  .react-datepicker__current-month {
    font-size: 1rem !important;
    font-weight: 600 !important;
    color: var(--neutral-900) !important;
  }
  
  .react-datepicker__day {
    border-radius: 8px !important;
    margin: 2px !important;
    width: 2.5rem !important;
    height: 2.5rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  .react-datepicker__day--selected {
    background-color: var(--primary) !important;
    color: white !important;
  }
  
  .react-datepicker__day--hover:not(.react-datepicker__day--selected) {
    background-color: var(--neutral-100) !important;
  }
  
  .react-datepicker__time-container {
    border-left: 1px solid var(--neutral-100) !important;
  }
  
  .react-datepicker__time-list-item {
    border-radius: 8px !important;
    margin: 2px 0 !important;
  }
  
  .react-datepicker__time-list-item--selected {
    background-color: var(--primary) !important;
  }
`;

// 十二生肖配置
const ZODIAC_LIST = [
  { name: 'Rat', cn: '鼠', icon: '🐭' },
  { name: 'Ox', cn: '牛', icon: '🐂' },
  { name: 'Tiger', cn: '虎', icon: '🐯' },
  { name: 'Rabbit', cn: '兔', icon: '🐰' },
  { name: 'Dragon', cn: '龙', icon: '🐲' },
  { name: 'Snake', cn: '蛇', icon: '🐍' },
  { name: 'Horse', cn: '马', icon: '🐴' },
  { name: 'Goat', cn: '羊', icon: '🐐' },
  { name: 'Monkey', cn: '猴', icon: '🐒' },
  { name: 'Rooster', cn: '鸡', icon: '🐔' },
  { name: 'Dog', cn: '狗', icon: '🐶' },
  { name: 'Pig', cn: '猪', icon: '🐷' }
];

// 五行映射
const ELEMENT_MAP = {
  '木': 'Wood', '火': 'Fire', '土': 'Earth', '金': 'Metal', '水': 'Water'
};
const ALL_ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

export default function AgeCalculator() {
  // 默认时间：1990年3月8日
  const [birthDateTime, setBirthDateTime] = useState(new Date(1990, 2, 8, 0, 0));
  const [ageResult, setAgeResult] = useState(null);
  const [lunarInfo, setLunarInfo] = useState(null);
  const [fiveElements, setFiveElements] = useState(null);
  const [zodiacDetail, setZodiacDetail] = useState(null);

  const calculateAge = () => {
    if (!birthDateTime) return;
    
    const birth = new Date(birthDateTime);
    const now = new Date();
    
    // 精准年龄计算
    const diffMs = now - birth;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365.25);
    const remainingDays = totalDays % 365.25;
    const months = Math.floor(remainingDays / 30.44);
    const days = Math.floor(remainingDays % 30.44);
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // 农历+生肖
    const solar = Solar.fromDate(birth);
    const lunar = solar.getLunar();
    const zodiacCn = lunar.getYearZodiac();
    const zodiacItem = ZODIAC_LIST.find(item => item.cn === zodiacCn) || ZODIAC_LIST[0];

    // 五行转换（中文→英文）
    const yearEl = ELEMENT_MAP[FiveElement.fromYear(lunar.getYear()).getName()] || 'Unknown';
    const monthEl = ELEMENT_MAP[FiveElement.fromMonth(lunar.getMonth()).getName()] || 'Unknown';
    const dayEl = ELEMENT_MAP[FiveElement.fromDay(lunar.getDay()).getName()] || 'Unknown';
    const hourEl = ELEMENT_MAP[FiveElement.fromHour(lunar.getHour(0)).getName()] || 'Unknown';
    const presentElements = [yearEl, monthEl, dayEl, hourEl].filter(el => el !== 'Unknown');
    const missingElements = ALL_ELEMENTS.filter(el => !presentElements.includes(el));

    // 更新状态
    setLunarInfo({
      lunarDate: lunar.toFullString(),
      zodiac: zodiacItem.name,
      constellation: solar.getConstellation(),
      lunarYear: lunar.getYear() + ' (Lunar Year)'
    });
    setZodiacDetail(zodiacItem);
    setFiveElements({
      present: presentElements.join(', '),
      missing: missingElements.length > 0 ? missingElements.join(', ') : 'All Elements Present'
    });
    setAgeResult({
      years, months, days, hours, minutes, totalDays
    });
  };

  return (
    <>
      <Head>
        <title>Age Calculator | Exact Age, Days, Hours & Chinese Zodiac</title>
        <meta name="description" content="Free online age calculator with Chinese lunar calendar, 12 zodiac animals and Five Elements analysis (Wood, Fire, Earth, Metal, Water)." />
        <meta name="keywords" content="age calculator, exact age calculator, birthday calculator, lunar calendar age, Chinese zodiac, 12 zodiac animals, Five Elements, Wood Fire Earth Metal Water, free age calculator" />
        <meta property="og:title" content="Age Calculator | Exact Age & Chinese Zodiac" />
        <meta property="og:description" content="Free online age calculator with lunar calendar, 12 zodiac animals and Five Elements analysis." />
        <meta property="og:url" content="https://agecalcfast.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="AgeCalcFast" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Age Calculator | Exact Age & Chinese Zodiac" />
        <meta name="twitter:description" content="Free online age calculator with lunar calendar and 12 zodiac animals." />
        <meta name="robots" content="index, follow" />
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-start pt-8 pb-16 px-4 sm:px-6">
        {/* 顶部标题区 */}
        <div className="text-center mb-10 w-full max-w-2xl">
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-neutral-900 mb-3">
            Exact Age Calculator
          </h1>
          <p className="text-lg text-neutral-600">
            Calculate your precise age (to the minute) + Chinese zodiac & five elements
          </p>
        </div>

        {/* 输入卡片（核心交互区） */}
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 mb-8 transition-shadow hover:shadow-xl">
          <div className="mb-7">
            <label className="block text-neutral-700 font-medium mb-3 text-lg">
              Your Birth Date & Time
            </label>
            <div className="relative">
              <DatePicker
                selected={birthDateTime}
                onChange={(date) => setBirthDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                monthsShown={2}
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date()}
                className="w-full px-5 py-4 rounded-lg border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
                placeholderText="Select your birth date and time"
              />
            </div>
          </div>

          <button
            onClick={calculateAge}
            disabled={!birthDateTime}
            className="w-full bg-primary hover:bg-primary-hover disabled:bg-neutral-200 disabled:text-neutral-500 text-white font-semibold py-4 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-98 text-lg"
          >
            Calculate My Age
          </button>
        </div>

        {/* 结果展示区 */}
        {ageResult && (
          <div className="w-full max-w-md space-y-5">
            {/* 年龄结果卡片 */}
            <div className="bg-white rounded-2xl shadow-lg p-7 border-l-4 border-primary">
              <div className="text-center mb-5">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  You are {ageResult.years} Years Old
                </h2>
                <p className="text-neutral-600 text-lg">
                  {ageResult.months} Months, {ageResult.days} Days, {ageResult.hours} Hrs, {ageResult.minutes} Mins
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 text-center">
                <p className="text-neutral-700 text-lg">
                  Total Days Lived: <span className="text-primary font-bold text-xl">{ageResult.totalDays}</span>
                </p>
              </div>
            </div>

            {/* 生肖+农历卡片 */}
            {lunarInfo && zodiacDetail && (
              <div className="bg-white rounded-2xl shadow-lg p-7 border-l-4 border-secondary">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Chinese Zodiac & Lunar Calendar</h3>
                <div className="space-y-4 text-neutral-700">
                  <p className="text-base">
                    📅 Lunar Date: <span className="text-neutral-800 font-medium">{lunarInfo.lunarDate}</span>
                  </p>
                  <p className="text-xl">
                    {zodiacDetail.icon} Zodiac: <span className="font-semibold">{zodiacDetail.name}</span>
                    <span className="ml-2 text-sm text-neutral-500">({lunarInfo.lunarYear})</span>
                  </p>
                  <p className="text-base">
                    ♈ Constellation: <span className="text-neutral-800 font-medium">{lunarInfo.constellation}</span>
                  </p>
                </div>
                <div className="mt-5 p-4 bg-neutral-50 rounded-lg text-sm text-neutral-600">
                  <span className="font-medium">{zodiacDetail.name} Personality:</span> {
                    zodiacDetail.name === 'Rat' ? 'Intelligent, adaptable and quick-witted' :
                    zodiacDetail.name === 'Ox' ? 'Hardworking, reliable and patient' :
                    zodiacDetail.name === 'Tiger' ? 'Courageous, confident and decisive' :
                    zodiacDetail.name === 'Rabbit' ? 'Gentle, kind and meticulous' :
                    zodiacDetail.name === 'Dragon' ? 'Dignified, ambitious and visionary' :
                    zodiacDetail.name === 'Snake' ? 'Calm, wise and perceptive' :
                    zodiacDetail.name === 'Horse' ? 'Enthusiastic, outgoing and action-oriented' :
                    zodiacDetail.name === 'Goat' ? 'Amiable, polite and loyal' :
                    zodiacDetail.name === 'Monkey' ? 'Lively, clever and agile-minded' :
                    zodiacDetail.name === 'Rooster' ? 'Diligent, trustworthy and thorough' :
                    zodiacDetail.name === 'Dog' ? 'Loyal, upright and responsible' : 'Easygoing, optimistic and sincere'
                  }
                </div>
              </div>
            )}

            {/* 五行分析卡片 */}
            {fiveElements && (
              <div className="bg-white rounded-2xl shadow-lg p-7 border-l-4 border-success">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Five Elements Analysis</h3>
                <div className="space-y-3 text-neutral-700 text-base">
                  <p>
                    🔮 Present Elements: <span className="text-neutral-800 font-medium">{fiveElements.present}</span>
                  </p>
                  <p>
                    📿 Missing Elements:
                    <span className={fiveElements.missing === 'All Elements Present' ? 'text-green-600 font-medium ml-2' : 'text-red-600 font-medium ml-2'}>
                      {fiveElements.missing}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 底部版权 */}
        <footer className="mt-12 text-neutral-500 text-sm text-center">
          © {new Date().getFullYear()} AgeCalcFast.com | All rights reserved
        </footer>
      </div>
    </>
  );
}
