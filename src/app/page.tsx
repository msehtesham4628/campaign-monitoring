import { fetchCampaigns, fetchGlobalInsights } from '@/lib/api';
import { SummaryCard } from '@/components/SummaryCard';
import { CampaignList } from '@/components/CampaignList';
import { ErrorState } from '@/components/ErrorState';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

async function DashboardHeader() {
  try {
    const insights = await fetchGlobalInsights();
    return (
      <div className="grid grid-cols-4" style={{ marginBottom: '2rem' }}>
        <SummaryCard
          title="Active Campaigns"
          value={insights.active_campaigns}
          subtitle={`out of ${insights.total_campaigns} total`}
        />
        <SummaryCard
          title="Total Spend"
          value={`$${insights.total_spend.toLocaleString()}`}
          trend="up"
          trendValue="12%"
        />
        <SummaryCard
          title="Total Conversions"
          value={insights.total_conversions.toLocaleString()}
          trend="up"
          trendValue="8%"
        />
        <SummaryCard
          title="Avg. Conv. Rate"
          value={`${insights.avg_conversion_rate.toFixed(1)}%`}
          subtitle="Across all campaigns"
        />
      </div>
    );
  } catch (err) {
    return <ErrorState message="Could not load global insights. The API might be rate limited." />;
  }
}

async function CampaignDataSection() {
  try {
    const { campaigns } = await fetchCampaigns();
    return <CampaignList initialCampaigns={campaigns} />;
  } catch (err) {
    return <ErrorState message="Could not load campaign list. Please refresh the page." />;
  }
}

export default function Home() {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Campaign Monitoring</h1>
        <p style={{ color: 'var(--muted)' }}>Real-time insights and performance tracking for Mixo Ads.</p>
      </div>

      <Suspense fallback={<div className="card">Loading insights...</div>}>
        <DashboardHeader />
      </Suspense>

      <Suspense fallback={<div className="card">Loading campaigns...</div>}>
        <CampaignDataSection />
      </Suspense>
    </div>
  );
}
