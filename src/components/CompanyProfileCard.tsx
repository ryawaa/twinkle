import { useState, useEffect } from 'react';
import PeersWidget from './PeersWidget';

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
  const [loading, setLoading] = useState(true);

  const fetchCompanyProfile = async (ticker: string) => {
    setError('');
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticker) {
      fetchCompanyProfile(ticker);
    }
  }, [ticker]);

  const SkeletonLoader = () => (
    <div className="p-6 bg-surface0 dark:bg-surface0 rounded-lg gap-4 shadow-md animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 bg-surface0 dark:bg-surface0 rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-text dark:text-text">About this company</h1>
      <div className="flex items-center gap-4 mt-4">
        <img src={profile.logo} alt={`${profile.name} logo`} className="w-16 h-16 object-cover rounded-lg" />
        <div>
          <h2 className="text-2xl font-bold text-text dark:text-text">{profile.name}</h2>
          <p className="text-sm text-text dark:text-subtext1">{profile.ticker} | {profile.finnhubIndustry}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-text dark:text-subtext1"><span className="font-semibold text-text dark:text-subtext1">Country:</span> {profile.country}</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold text-text dark:text-subtext1">Currency:</span> {profile.currency}</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold text-text dark:text-subtext1">Exchange:</span> {profile.exchange}</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold text-text dark:text-subtext1">Market Cap:</span> ${profile.marketCapitalization.toFixed(2)}B</p>
        </div>
        <div>
          <p className="text-text dark:text-subtext1"><span className="font-semibold text-text dark:text-subtext1">IPO Date:</span> {new Date(profile.ipo).toLocaleDateString()}</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold text-text dark:text-subtext1">Outstanding Shares:</span> {profile.shareOutstanding.toFixed(2)}M</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold text-text dark:text-subtext1">Phone:</span> {profile.phone}</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold text-text dark:text-subtext1">Website:</span> <a href={profile.weburl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{profile.weburl}</a></p>
        </div>
      </div>
      <PeersWidget symbol={ticker} />
    </div>
  );
};

export default CompanyProfileCard;