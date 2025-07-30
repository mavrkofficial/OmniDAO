import React, { useState } from 'react';
import { Button } from '@inkonchain/ink-kit';

const RevenueAnalytics: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false); // Mock connection state
  const [timeframe, setTimeframe] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const revenueData = {
    totalRevenue: '$45,230',
    bondRevenue: '$28,450',
    tradingFees: '$12,680',
    lpFees: '$4,100',
    dailyAverage: '$1,507',
    weeklyGrowth: '+12.5%',
    monthlyGrowth: '+8.3%'
  };

  const distributionData = {
    stakers: '70%',
    treasury: '20%',
    development: '10%'
  };

  const mockChartData = [
    { date: '2024-01-01', revenue: 1200, bonds: 800, fees: 400 },
    { date: '2024-01-02', revenue: 1350, bonds: 900, fees: 450 },
    { date: '2024-01-03', revenue: 1100, bonds: 700, fees: 400 },
    { date: '2024-01-04', revenue: 1600, bonds: 1000, fees: 600 },
    { date: '2024-01-05', revenue: 1400, bonds: 900, fees: 500 },
    { date: '2024-01-06', revenue: 1800, bonds: 1200, fees: 600 },
    { date: '2024-01-07', revenue: 1507, bonds: 950, fees: 557 },
  ];

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    // In real app, this would fetch new data based on timeframe
  };

  const handleMetricChange = (metric: string) => {
    setSelectedMetric(metric);
    // In real app, this would update chart display
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="omni-gradient-text" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Revenue Analytics
        </h1>
        <span style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Track real-time revenue sharing and distribution metrics
        </span>
      </div>

      {/* Revenue Overview */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} spacing={3} marginBottom={3}>
        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} sm={6} md={3}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Total Revenue</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{revenueData.totalRevenue}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--omni-success)' }}>+{revenueData.weeklyGrowth} this week</span>
          </div>
        </div>
        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} sm={6} md={3}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Bond Sales</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{revenueData.bondRevenue}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--omni-success)' }}>62.9% of total</span>
          </div>
        </div>
        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} sm={6} md={3}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Trading Fees</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{revenueData.tradingFees}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--omni-success)' }}>28.0% of total</span>
          </div>
        </div>
        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} sm={6} md={3}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>LP Fees</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{revenueData.lpFees}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--omni-success)' }}>9.1% of total</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} spacing={3}>
        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} md={8}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--omni-text)' }}>Revenue Trend</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                  variant={timeframe === '7d' ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleTimeframeChange('7d')}
                >
                  7D
                </Button>
                <Button
                  variant={timeframe === '30d' ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleTimeframeChange('30d')}
                >
                  30D
                </Button>
                <Button
                  variant={timeframe === '90d' ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleTimeframeChange('90d')}
                >
                  90D
                </Button>
              </div>
            </div>
            
            {/* Mock Chart */}
            <div style={{ height: '300px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'var(--omni-text-secondary)' }}>Revenue Chart Visualization</span>
            </div>
            
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--omni-primary)', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '0.875rem' }}>Total Revenue</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--omni-success)', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '0.875rem' }}>Bond Sales</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--omni-warning)', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '0.875rem' }}>Trading Fees</span>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Breakdown */}
        <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} md={4}>
          <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Revenue Distribution</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem' }}>Stakers</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{distributionData.stakers}</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                background: 'rgba(99, 102, 241, 0.2)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: '70%', 
                  height: '100%', 
                  background: 'var(--omni-success)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem' }}>Treasury</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{distributionData.treasury}</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                background: 'rgba(99, 102, 241, 0.2)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: '20%', 
                  height: '100%', 
                  background: 'var(--omni-primary)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem' }}>Development</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{distributionData.development}</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                background: 'rgba(99, 102, 241, 0.2)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: '10%', 
                  height: '100%', 
                  background: 'var(--omni-warning)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Detailed Metrics</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} spacing={3}>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} sm={6} md={4}>
            <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--omni-text)' }}>Daily Average</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>{revenueData.dailyAverage}</div>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Average daily revenue</span>
            </div>
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} sm={6} md={4}>
            <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--omni-text)' }}>Weekly Growth</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--omni-success)' }}>{revenueData.weeklyGrowth}</div>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Week-over-week growth</span>
            </div>
          </div>
          <div style={{ flex: "1 1 300px", minWidth: "300px" }} xs={12} sm={6} md={4}>
            <div style={{ background: "var(--omni-card-bg)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--omni-border)", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className="omni-card">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--omni-text)' }}>Monthly Growth</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--omni-success)' }}>{revenueData.monthlyGrowth}</div>
              <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)' }}>Month-over-month growth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics; 