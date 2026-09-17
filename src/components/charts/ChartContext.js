import { createContext, useContext } from 'react';

export const ChartContext = createContext(null);

export function useChartContext() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChartContext must be used within an AreaChart');
  }
  return context;
}
