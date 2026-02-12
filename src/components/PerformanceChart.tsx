import { CampaignInsights } from '@/types/api';

interface PerformanceChartProps {
    data: CampaignInsights | null;
    loading?: boolean;
}

export function PerformanceChart({ data, loading }: PerformanceChartProps) {
    if (loading && !data) return <div className="card">Connecting to live stream...</div>;
    if (!data) return <div className="card">No data available</div>;

    const metrics = [
        { label: 'CTR', value: data.ctr ?? 0, total: 10, unit: '%' },
        { label: 'Conv. Rate', value: data.conversion_rate ?? 0, total: 100, unit: '%' },
        { label: 'CPC', value: data.cpc ?? 0, total: 5, unit: '$' },
        { label: 'ROAS', value: data.roas ?? 0, total: 10, unit: 'x' },
    ];

    return (
        <div className="card animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem' }}>Performance Metrics {loading && <span style={{ fontSize: '0.75rem', color: 'var(--success)' }}>(Live)</span>}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {metrics.map((m) => {
                    const percentage = Math.min((m.value / m.total) * 100, 100);
                    return (
                        <div key={m.label}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                <span style={{ color: 'var(--muted)' }}>{m.label}</span>
                                <span style={{ fontWeight: 600 }}>{m.value.toFixed(2)}{m.unit}</span>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.05)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                <div
                                    style={{
                                        background: 'var(--accent)',
                                        height: '100%',
                                        width: `${percentage}%`,
                                        transition: 'width 0.5s ease'
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="card-title" style={{ fontSize: '0.75rem' }}>Impressions</div>
                    <div style={{ fontWeight: 700 }}>{(data.impressions ?? 0).toLocaleString()}</div>
                </div>
                <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div className="card-title" style={{ fontSize: '0.75rem' }}>Clicks</div>
                    <div style={{ fontWeight: 700 }}>{(data.clicks ?? 0).toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}
