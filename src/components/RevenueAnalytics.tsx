import React, { useState } from 'react';
import { Card, Grid, Button } from '@inkonchain/ink-kit';

interface RevenueAnalyticsProps {
  isConnected: boolean;
  account: string | null;
}

const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ isConnected, account }) => {
  const [timeframe, setTimeframe] = useState('7d');

  const revenueData = {
    totalRevenue: '$45,230',
    dailyRevenue: '$2,450',
    weeklyRevenue: '$15,680',
    monthlyRevenue: '$45,230',
    bondRevenue: '$28,450',
    tradingFees: '$12,800',
    otherRevenue: '$3,980',
    stakersCount: '2,847',
    averageReward: '$15.89',
    distributionRate: '85%',
  };

  const revenueHistory = [
    { date: '2024-02-01', revenue: 2450, bonds: 1800, fees: 450, other: 200 },
    { date: '2024-02-02', revenue: 2320, bonds: 1650, fees: 520, other: 150 },
    { date: '2024-02-03', revenue: 2680, bonds: 1900, fees: 580, other: 200 },
    { date: '2024-02-04', revenue: 2890, bonds: 2100, fees: 620, other: 170 },
    { date: '2024-02-05', revenue: 3120, bonds: 2300, fees: 680, other: 140 },
    { date: '2024-02-06', revenue: 2980, bonds: 2150, fees: 650, other: 180 },
    { date: '2024-02-07', revenue: 2750, bonds: 1950, fees: 600, other: 200 },
  ];

  const StatCard: React.FC<{ title: string; value: string; subtitle?: string; trend?: string }> = ({ 
    title, 
    value, 
    subtitle,
    trend 
  }) => (
    <Card className="omni-stat-card">
      <span className="omni-stat-value">{value}</span>
      <span className="omni-stat-label">{title}</span>
      {subtitle && (
        <span style={{ 
          color: 'var(--omni-text-secondary)', 
          fontSize: '0.75rem',
          marginTop: '0.5rem'
        }}>
          {subtitle}
        </span>
      )}
      {trend && (
        <span style={{ 
          color: trend.startsWith('+') ? 'var(--omni-success)' : 'var(--omni-error)', 
          fontSize: '0.75rem',
          marginTop: '0.5rem'
        }}>
          {trend}
        </span>
      )}
    </Card>
  );

  const RevenueChart: React.FC = () => (
    <Card className="omni-card">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Revenue Trend</h2>
      <div>
        {/* Mock chart - in real app, this would be a proper chart library */}
        <div>
          {revenueHistory.map((day, index) => (
            <div key={index}>
              <span style={{ fontSize: '0.75rem', color: 'var(--omni-text-secondary)', marginTop: '0.5rem' }}>
                ${day.revenue}
              </span>
            </div>
          ))}
        </div>
        <span style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)', textAlign: 'center' }}>
          Last 7 days revenue trend
        </span>
      </div>
    </Card>
  );

  const RevenueBreakdown: React.FC = () => (
    <Card className="omni-card">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Revenue Breakdown</h2>
      
      <Grid container spacing={2} marginBottom={3}>
        <Grid item xs={12} md={4}>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>
              {revenueData.bondRevenue}
            </span>
            <span style={{ color: 'var(--omni-text-secondary)' }}>Bond Sales</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--omni-success)' }}>+12.5%</span>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--omni-secondary)' }}>
              {revenueData.tradingFees}
            </span>
            <span style={{ color: 'var(--omni-text-secondary)' }}>Trading Fees</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--omni-success)' }}>+8.3%</span>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--omni-accent)' }}>
              {revenueData.otherRevenue}
            </span>
            <span style={{ color: 'var(--omni-text-secondary)' }}>Other Sources</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--omni-error)' }}>-2.1%</span>
          </div>
        </Grid>
      </Grid>

      <div>
        <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Revenue Sources</p>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div>
              <Text>Bond Sales</p>
              <p style={{ fontWeight: 'bold' }}>62.9%</p>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <Text>Trading Fees</p>
              <p style={{ fontWeight: 'bold' }}>28.3%</p>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <Text>Other Sources</p>
              <p style={{ fontWeight: 'bold' }}>8.8%</p>
            </div>
          </Grid>
        </Grid>
      </div>
    </Card>
  );

  return (
          <div>
      <div>
        <h1 className="omni-gradient-text" style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Revenue Analytics
        </h1>
        <span style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Track real-time revenue sharing and distribution metrics
        </span>
      </div>

      {/* Timeframe Selector */}
      <div>
        <Grid container justifyContent="center" spacing={2}>
          {['24h', '7d', '30d', '90d'].map((period) => (
            <Grid item key={period}>
              <Button
                variant={timeframe === period ? "primary" : "secondary"}
                size="sm"
                onClick={() => setTimeframe(period)}
              >
                {period}
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Key Metrics */}
      <div className="omni-stats-grid">
        <StatCard 
          title="Total Revenue" 
          value={revenueData.totalRevenue}
          subtitle={`Last ${timeframe}`}
          trend="+15.2%"
        />
        <StatCard 
          title="Daily Revenue" 
          value={revenueData.dailyRevenue}
          subtitle="Average per day"
          trend="+8.7%"
        />
        <StatCard 
          title="Active Stakers" 
          value={revenueData.stakersCount}
          subtitle="Receiving rewards"
          trend="+5.3%"
        />
        <StatCard 
          title="Avg Reward" 
          value={revenueData.averageReward}
          subtitle="Per staker"
          trend="+12.1%"
        />
        <StatCard 
          title="Distribution Rate" 
          value={revenueData.distributionRate}
          subtitle="To stakers"
        />
        <StatCard 
          title="Bond Revenue" 
          value={revenueData.bondRevenue}
          subtitle="From bond sales"
          trend="+18.4%"
        />
      </div>

      <Grid container spacing={4} marginTop={2}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <RevenueChart />
        </Grid>

        {/* Revenue Breakdown */}
        <Grid item xs={12} md={4}>
          <RevenueBreakdown />
        </Grid>

        {/* Distribution Details */}
        <Grid item xs={12}>
          <Card className="omni-card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--omni-text)' }}>Distribution Details</h2>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Revenue Distribution</p>
                  <div>
                    <div>
                      <Text>To Stakers</p>
                      <p style={{ fontWeight: 'bold' }}>85%</p>
                    </div>
                    <div>
                      <Text>To Treasury</p>
                      <p style={{ fontWeight: 'bold' }}>10%</p>
                    </div>
                    <div>
                      <Text>To Team</p>
                      <p style={{ fontWeight: 'bold' }}>5%</p>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Recent Distributions</p>
                  <div>
                   {revenueHistory.slice(-5).reverse().map((day, index) => (
                     <div key={index}>
                       <span style={{ fontSize: '0.875rem' }}>{day.date}</span>
                       <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                         ${day.revenue.toLocaleString()}
                       </span>
                     </div>
                   ))}
                 </div>
               </div>
             </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
          </div>
  );
};

export default RevenueAnalytics; 