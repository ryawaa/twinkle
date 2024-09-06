export const formatPriceData = (data) => {
    return [
      { name: 'Previous Close', price: data.pc },
      { name: 'Open', price: data.o },
      { name: 'Current', price: data.c }
    ];
  };