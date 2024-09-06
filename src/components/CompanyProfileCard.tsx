import { useState, useEffect } from 'react';

interface CompanyProfileProps {
  ticker: string;
}

interface CompanyProfileData {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

const CompanyProfileCard = ({ ticker }: CompanyProfileProps) => {
  const [profile, setProfile] = useState<CompanyProfileData | null>(null);
  const [error, setError] = useState('');

  const fetchCompanyProfile = async (ticker: string) => {
    setError('');
    try {
      const res = await fetch(`/api/profile?symbol=${ticker}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err) {
      setError('Failed to fetch company profile');
      setProfile(null);
    }
  };

  useEffect(() => {
    if (ticker) {
      fetchCompanyProfile(ticker);
    }
  }, [ticker]);

  if (!profile) {
    return error ? <p className="text-red-500">{error}</p> : <p>Loading...</p>;
  }

  return (
    <div className="p-4 border bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-4 flex-col">
      <h1 className="mb-4 font-bold">About this company</h1>
      <div className="flex items-center space-x-4 mb-4">
        <img src={profile.logo} alt={`${profile.name} logo`} className="w-16 h-16 object-cover rounded-lg" />
        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.ticker} | {profile.finnhubIndustry}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p><span className="font-semibold">Country:</span> {profile.country}</p>
          <p><span className="font-semibold">Currency:</span> {profile.currency}</p>
          <p><span className="font-semibold">Exchange:</span> {profile.exchange}</p>
          <p><span className="font-semibold">Market Cap:</span> ${profile.marketCapitalization.toFixed(2)}B</p>
        </div>
        <div>
          <p><span className="font-semibold">IPO Date:</span> {new Date(profile.ipo).toLocaleDateString()}</p>
          <p><span className="font-semibold">Outstanding Shares:</span> {profile.shareOutstanding.toFixed(2)}M</p>
          <p><span className="font-semibold">Phone:</span> {profile.phone}</p>
          <p><span className="font-semibold">Website:</span> <a href={profile.weburl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{profile.weburl}</a></p>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileCard;