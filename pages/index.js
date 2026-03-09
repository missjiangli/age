// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import { Lunar, Solar, FiveElement } from 'lunar-javascript';

// 12 Zodiac Animals (English + Icon)
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

// Five Elements Mapping (Lunar-javascript CN → EN)
const ELEMENT_MAP = {
  '木': 'Wood',
  '火': 'Fire',
  '土': 'Earth',
  '金': 'Metal',
  '水': 'Water'
};
const ALL_ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

export default function AgeCalculator() {
  // Default: March 8, 1990 00:00 (month starts at 0)
  const [birthDateTime, setBirthDateTime] = useState(new Date(1990, 2, 8, 0, 0));
  const [ageResult, setAgeResult] = useState(null);
  const [lunarInfo, setLunarInfo] = useState(null);
  const [fiveElements, setFiveElements] = useState(null);
  const [zodiacDetail, setZodiacDetail] = useState(null);

  const calculateAge = () => {
    if (!birthDateTime) return;
    
    const birth = new Date(birthDateTime);
    const now = new Date();
    
    // Exact Age Calculation
    const diffMs = now - birth;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365.25);
    const remainingDays = totalDays % 365.25;
    const months = Math.floor(remainingDays / 30.44);
    const days = Math.floor(remainingDays % 30.44);
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // Lunar & Zodiac
    const solar = Solar.fromDate(birth);
    const lunar = solar.getLunar();
    const zodiacCn = lunar.getYearZodiac();
    const zodiacItem = ZODIAC_LIST.find(item => item.cn === zodiacCn) || ZODIAC_LIST[0];

    // Five Elements (CN → EN)
    const yearEl = ELEMENT_MAP[FiveElement.fromYear(lunar.getYear()).getName()] || 'Unknown';
    const monthEl = ELEMENT_MAP[FiveElement.fromMonth(lunar.getMonth()).getName()] || 'Unknown';
    const dayEl = ELEMENT_MAP[FiveElement.fromDay(lunar.getDay()).getName()] || 'Unknown';
    const hourEl = ELEMENT_MAP[FiveElement.fromHour(lunar.getHour(0)).getName()] || 'Unknown';
    const presentElements = [yearEl, monthEl, dayEl, hourEl].filter(el => el !== 'Unknown');
    const missingElements = ALL_ELEMENTS.filter(el => !presentElements.includes(el));

    // Set States
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
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-8 w-full max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-2">
            Exact Age Calculator
          </h1>
          <p className="text-neutral-500 text-lg">
            Precise to Minute | Lunar Calendar | 12 Zodiac | Five Elements
          </p>
        </div>

        {/* Input Card (Dual-Month DatePicker) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md">
          <div className="mb-6">
            <label className="block text-neutral-700 font-medium mb-2">
              Select Your Birth Date & Time
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
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                placeholderText="Select birth date and time"
              />
            </div>
          </div>

          <button
            onClick={calculateAge}
            disabled={!birthDateTime}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-98"
          >
            Calculate Now
          </button>
        </div>

        {/* Results */}
        {ageResult && (
          <div className="mt-8 w-full max-w-md space-y-6">
            {/* Age Result */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-neutral-900">
                  You are {ageResult.years} Years Old
                </h2>
                <p className="text-neutral-500 text-lg">
                  {ageResult.months} Months, {ageResult.days} Days, {ageResult.hours} Hrs, {ageResult.minutes} Mins
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 text-center">
                <p className="text-neutral-700">
                  Total Days Lived: <span className="text-blue-600 font-bold text-xl">{ageResult.totalDays}</span>
                </p>
              </div>
            </div>

            {/* Lunar & Zodiac */}
            {lunarInfo && zodiacDetail && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-teal-500">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Lunar Calendar & Zodiac</h3>
                <div className="space-y-3 text-neutral-700">
                  <p>📅 Lunar Date: {lunarInfo.lunarDate}</p>
                  <p className="text-lg">
                    {zodiacDetail.icon} Chinese Zodiac: {zodiacDetail.name}
                    <span className="ml-2 text-sm text-neutral-500">({lunarInfo.lunarYear})</span>
                  </p>
                  <p>♈ Constellation: {lunarInfo.constellation}</p>
                </div>
                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-neutral-600">
                  {zodiacDetail.name} Personality Traits: {
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

            {/* Five Elements (100% English) */}
            {fiveElements && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">Five Elements Analysis</h3>
                <div className="space-y-2 text-neutral-700">
                  <p>🔮 Present Elements: {fiveElements.present}</p>
                  <p>
                    📿 Missing Elements:
                    <span className={fiveElements.missing === 'All Elements Present' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      {fiveElements.missing}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-neutral-500 text-sm text-center">
          © {new Date().getFullYear()} AgeCalcFast.com | Exact Age Calculation · Zodiac & Five Elements
        </footer>
      </div>
    </>
  );
}
