export const generateMockHistoricalData = (symbol: string) => {
    // Mock data for the past 10 days
    const mockData = [];
    const now = new Date();
    
    for (let i = 10; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      mockData.push({
        date: date.toISOString().split('T')[0],
        close: (Math.random() * 100 + 100).toFixed(2), // Generate a random closing price
      });
    }
  
    return mockData;
  };