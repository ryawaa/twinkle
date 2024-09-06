import { useState, useEffect, useCallback } from 'react';
import PeersWidget from './PeersWidget';

// Props interface for the CompanyProfileCard component, including the stock ticker symbol
interface CompanyProfileProps {
  ticker: string;
}

// Interface for the company profile data fetched from the API
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

// Component to display a loading skeleton while data is being fetched
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

// Main component to load and display company profile information based on a stock ticker symbol
const CompanyProfileCard = ({ ticker }: CompanyProfileProps) => {
  // State to hold the company profile data
  const [profile, setProfile] = useState<CompanyProfileData | null>(null);
  // State to manage loading state
  const [loading, setLoading] = useState<boolean>(true);
  // State to handle any errors that might occur during fetch
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the company profile from the API
  const fetchCompanyProfile = useCallback(async (ticker: string) => {
    setError(null); // Clear any previous errors
    setLoading(true); // Set loading to true at the start of the fetch operation

    try {
      // Fetch data from the API using the provided ticker symbol
      const res = await fetch(`/api/profile?symbol=${ticker}`);
      const data = await res.json();

      // Handle response: check if the request was successful
      if (res.ok) {
        setProfile(data); // Set the profile data in state
      } else {
        // If not successful, set the error message from response
        throw new Error(data.error || 'Failed to fetch company profile data');
      }
    } catch (err) {
      // If an error occurs, set the error message in state
      setError(err instanceof Error ? err.message : 'Failed to fetch company profile');
      setProfile(null); // Reset profile data
    } finally {
      // Set loading to false after the fetch operation is complete
      setLoading(false);
    }
  }, []);

  // Effect that runs when the component mounts or when the ticker changes
  useEffect(() => {
    if (ticker) {
      fetchCompanyProfile(ticker); // Fetch profile when the ticker is available
    }
  }, [ticker, fetchCompanyProfile]);

  // If loading, display SkeletonLoader component
  if (loading) {
    return <SkeletonLoader />;
  }

  // If an error occurred, display the error message
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Render the company profile information
  return (
    <div className="p-6 bg-surface0 dark:bg-surface0 rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-text dark:text-text">About this company</h1>
      <div className="flex items-center gap-4 mt-4">
        <img src={profile?.logo} alt={`${profile?.name} logo`} className="w-16 h-16 object-cover rounded-lg" />
        <div>
          <h2 className="text-2xl font-bold text-text dark:text-text">{profile?.name}</h2>
          <p className="text-sm text-text dark:text-subtext1">Ticker: {profile?.ticker} | Industry: {profile?.finnhubIndustry}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-text dark:text-subtext1"><span className="font-semibold">Country:</span> {profile?.country}</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold">Currency:</span> {profile?.currency}</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold">Exchange:</span> {profile?.exchange}</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold">Market Cap:</span> ${profile?.marketCapitalization.toFixed(2)}B</p>
        </div>
        <div>
          <p className="text-text dark:text-subtext1"><span className="font-semibold">IPO Date:</span> {new Date(profile?.ipo).toLocaleDateString()}</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold">Outstanding Shares:</span> {profile?.shareOutstanding.toFixed(2)}M</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold">Phone:</span> {profile?.phone}</p>
          <p className="text-text dark:text-subtext1"><span className="font-semibold">Website:</span> <a href={profile?.weburl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{profile?.weburl}</a></p>
        </div>
      </div>
      <PeersWidget symbol={ticker} />
    </div>
  );
};

export default CompanyProfileCard;