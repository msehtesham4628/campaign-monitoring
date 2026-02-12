'use client';

import { useCampaignStream } from '@/hooks/useCampaignStream';
import { PerformanceChart } from '@/components/PerformanceChart';
import { Campaign, CampaignInsights } from '@/types/api';
import Link from 'next/link';

interface CampaignDetailClientProps {
    campaign: Campaign;
    initialInsights: CampaignInsights;
}

export default function CampaignDetailClient({ campaign, initialInsights }: CampaignDetailClientProps) {
    const { data: liveData, loading: isLive } = useCampaignStream(campaign.status === 'active' ? campaign.id : null);

    const displayData = liveData || initialInsights;

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <Link href="/" style={{ color: 'var(--accent)', fontSize: '0.875rem', display: 'block', marginBottom: '1rem' }}>
                        ← Back to Dashboard
                    </Link>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{campaign.name}</h1>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span className={`status-badge status-${campaign.status}`}>{campaign.status}</span>
                        <span style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>ID: {campaign.id}</span>
                    </div>
                </div>
                <div className="card" style={{ textAlign: 'right' }}>
                    <div className="card-title">Total Spend</div>
                    <div className="card-value">${(displayData.spend ?? 0).toLocaleString()}</div>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
                <PerformanceChart data={displayData} loading={isLive} />

                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Campaign Settings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <div className="card-title">Brand ID</div>
                            <div>{campaign.brand_id}</div>
                        </div>
                        <div>
                            <div className="card-title">Budget</div>
                            <div>${campaign.budget.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="card-title">Daily Budget</div>
                            <div>${campaign.daily_budget.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="card-title">Platforms</div>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {campaign.platforms.map(p => (
                                    <span key={p} style={{ fontSize: '0.75rem', color: 'var(--foreground)', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

