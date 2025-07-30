import React, { useState } from 'react';
import { Card, Grid, Text, Heading, Box, Button } from '@inkonchain/ink-kit';

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
      <Text className="omni-stat-value">{value}</Text>
      <Text className="omni-stat-label">{title}</Text>
      {subtitle && (
        <Text style={{ 
          color: 'var(--omni-text-secondary)', 
          fontSize: '0.75rem',
          marginTop: '0.5rem'
        }}>
          {subtitle}
        </Text>
      )}
      {trend && (
        <Text style={{ 
          color: trend.startsWith('+') ? 'var(--omni-success)' : 'var(--omni-error)', 
          fontSize: '0.75rem',
          marginTop: '0.5rem'
        }}>
          {trend}
        </Text>
      )}
    </Card>
  );

  const RevenueChart: React.FC = () => (
    <Card className="omni-card">
      <Heading size="lg" marginBottom={3}>Revenue Trend</Heading>
      <Box style={{ height: '200px', position: 'relative' }}>
        {/* Mock chart - in real app, this would be a proper chart library */}
        <Box style={{ 
          display: 'flex', 
          alignItems: 'end', 
          height: '150px', 
          gap: '8px',
          padding: '1rem 0'
        }}>
          {revenueHistory.map((day, index) => (
            <Box key={index} style={{ flex: 1, textAlign: 'center' }}>
              <Box style={{
                height: `${(day.revenue / 3200) * 100}px`,
                background: 'linear-gradient(180deg, var(--omni-primary), var(--omni-secondary))',
                borderRadius: '4px 4px 0 0',
                minHeight: '4px'
              }} />
              <Text style={{ fontSize: '0.75rem', color: 'var(--omni-text-secondary)', marginTop: '0.5rem' }}>
                ${day.revenue}
              </Text>
            </Box>
          ))}
        </Box>
        <Text style={{ fontSize: '0.875rem', color: 'var(--omni-text-secondary)', textAlign: 'center' }}>
          Last 7 days revenue trend
        </Text>
      </Box>
    </Card>
  );

  const RevenueBreakdown: React.FC = () => (
    <Card className="omni-card">
      <Heading size="lg" marginBottom={3}>Revenue Breakdown</Heading>
      
      <Grid container spacing={2} marginBottom={3}>
        <Grid item xs={12} md={4}>
          <Box textAlign="center" padding={2}>
            <Text style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--omni-primary)' }}>
              {revenueData.bondRevenue}
            </Text>
            <Text style={{ color: 'var(--omni-text-secondary)' }}>Bond Sales</Text>
            <Text style={{ fontSize: '0.75rem', color: 'var(--omni-success)' }}>+12.5%</Text>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center" padding={2}>
            <Text style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--omni-secondary)' }}>
              {revenueData.tradingFees}
            </Text>
            <Text style={{ color: 'var(--omni-text-secondary)' }}>Trading Fees</Text>
            <Text style={{ fontSize: '0.75rem', color: 'var(--omni-success)' }}>+8.3%</Text>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box textAlign="center" padding={2}>
            <Text style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--omni-accent)' }}>
              {revenueData.otherRevenue}
            </Text>
            <Text style={{ color: 'var(--omni-text-secondary)' }}>Other Sources</Text>
            <Text style={{ fontSize: '0.75rem', color: 'var(--omni-error)' }}>-2.1%</Text>
          </Box>
        </Grid>
      </Grid>

      <Box>
        <Text style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Revenue Sources</Text>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
              <Text>Bond Sales</Text>
              <Text style={{ fontWeight: 'bold' }}>62.9%</Text>
            </Box>
            <Box style={{ 
              height: '4px', 
              background: 'rgba(99, 102, 241, 0.2)', 
              borderRadius: '2px',
              marginBottom: '0.5rem'
            }}>
              <Box style={{ 
                height: '100%', 
                width: '62.9%',
                background: 'var(--omni-primary)',
                borderRadius: '2px'
              }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
              <Text>Trading Fees</Text>
              <Text style={{ fontWeight: 'bold' }}>28.3%</Text>
            </Box>
            <Box style={{ 
              height: '4px', 
              background: 'rgba(139, 92, 246, 0.2)', 
              borderRadius: '2px',
              marginBottom: '0.5rem'
            }}>
              <Box style={{ 
                height: '100%', 
                width: '28.3%',
                background: 'var(--omni-secondary)',
                borderRadius: '2px'
              }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
              <Text>Other Sources</Text>
              <Text style={{ fontWeight: 'bold' }}>8.8%</Text>
            </Box>
            <Box style={{ 
              height: '4px', 
              background: 'rgba(6, 182, 212, 0.2)', 
              borderRadius: '2px',
              marginBottom: '0.5rem'
            }}>
              <Box style={{ 
                height: '100%', 
                width: '8.8%',
                background: 'var(--omni-accent)',
                borderRadius: '2px'
              }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );

  return (
          <Box style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
      <Box textAlign="center" marginBottom={4}>
        <Heading size="xl" className="omni-gradient-text" marginBottom={2}>
          Revenue Analytics
        </Heading>
        <Text style={{ color: 'var(--omni-text-secondary)', fontSize: '1.125rem' }}>
          Track real-time revenue sharing and distribution metrics
        </Text>
      </Box>

      {/* Timeframe Selector */}
      <Box marginBottom={4} textAlign="center">
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
      </Box>

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
            <Heading size="lg" marginBottom={3}>Distribution Details</Heading>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box marginBottom={3}>
                  <Text style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Revenue Distribution</Text>
                  <Box marginBottom={2}>
                    <Box display="flex" justifyContent="space-between" marginBottom={1}>
                      <Text>To Stakers</Text>
                      <Text style={{ fontWeight: 'bold' }}>85%</Text>
                    </Box>
                    <Box style={{ 
                      height: '8px', 
                      background: 'rgba(16, 185, 129, 0.2)', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <Box style={{ 
                        height: '100%', 
                        width: '85%',
                        background: 'var(--omni-success)',
                        borderRadius: '4px'
                      }} />
                    </Box>
                  </Box>
                  <Box marginBottom={2}>
                    <Box display="flex" justifyContent="space-between" marginBottom={1}>
                      <Text>To Treasury</Text>
                      <Text style={{ fontWeight: 'bold' }}>10%</Text>
                    </Box>
                    <Box style={{ 
                      height: '8px', 
                      background: 'rgba(99, 102, 241, 0.2)', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <Box style={{ 
                        height: '100%', 
                        width: '10%',
                        background: 'var(--omni-primary)',
                        borderRadius: '4px'
                      }} />
                    </Box>
                  </Box>
                  <Box>
                    <Box display="flex" justifyContent="space-between" marginBottom={1}>
                      <Text>To Team</Text>
                      <Text style={{ fontWeight: 'bold' }}>5%</Text>
                    </Box>
                    <Box style={{ 
                      height: '8px', 
                      background: 'rgba(139, 92, 246, 0.2)', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <Box style={{ 
                        height: '100%', 
                        width: '5%',
                        background: 'var(--omni-secondary)',
                        borderRadius: '4px'
                      }} />
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box marginBottom={3}>
                  <Text style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Recent Distributions</Text>
                  <Box>
                    {revenueHistory.slice(-5).reverse().map((day, index) => (
                      <Box key={index} display="flex" justifyContent="space-between" marginBottom={1}>
                        <Text style={{ fontSize: '0.875rem' }}>{day.date}</Text>
                        <Text style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                          ${day.revenue.toLocaleString()}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
          </Box>
  );
};

export default RevenueAnalytics; 