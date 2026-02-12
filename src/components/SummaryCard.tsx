interface SummaryCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    trend?: 'up' | 'down';
    trendValue?: string;
}

export function SummaryCard({ title, value, subtitle, trend, trendValue }: SummaryCardProps) {
    return (
        <div className="card animate-fade-in">
            <div className="card-title">{title}</div>
            <div className="card-value">{value}</div>
            {(subtitle || trendValue) && (
                <div className="card-delta">
                    {trend && (
                        <span style={{ color: trend === 'up' ? 'var(--success)' : 'var(--error)' }}>
                            {trend === 'up' ? '↑' : '↓'} {trendValue}
                        </span>
                    )}
                    <span style={{ color: 'var(--muted)' }}>{subtitle}</span>
                </div>
            )}
        </div>
    );
}

