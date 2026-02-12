import { Campaign } from '@/types/api';
import Link from 'next/link';

interface CampaignTableProps {
    campaigns: Campaign[];
}

export function CampaignTable({ campaigns }: CampaignTableProps) {
    return (
        <div className="card animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--card-border)' }}>
                <h3 style={{ fontSize: '1.125rem' }}>All Campaigns</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Campaign Name</th>
                            <th>Status</th>
                            <th>Total Budget</th>
                            <th>Daily Budget</th>
                            <th>Platforms</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign) => (
                            <tr key={campaign.id}>
                                <td style={{ fontWeight: 600 }}>{campaign.name}</td>
                                <td>
                                    <span className={`status-badge status-${campaign.status}`}>
                                        {campaign.status}
                                    </span>
                                </td>
                                <td>${campaign.budget.toLocaleString()}</td>
                                <td>${campaign.daily_budget.toLocaleString()}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {campaign.platforms.map(p => (
                                            <span key={p} style={{ fontSize: '0.75rem', color: 'var(--muted)', border: '1px solid var(--card-border)', padding: '2px 6px', borderRadius: '4px' }}>
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <Link href={`/campaign/${campaign.id}`} className="btn btn-ghost">
                                        View Details →
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

