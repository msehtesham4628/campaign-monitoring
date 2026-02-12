import { fetchCampaignById, fetchCampaignInsights } from '@/lib/api';
import CampaignDetailClient from '@/components/CampaignDetailClient';
import { ErrorState } from '@/components/ErrorState';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface CampaignPageProps {
    params: { id: string };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
    const { id } = await params;
    try {
        const [{ campaign }, insights] = await Promise.all([
            fetchCampaignById(id),
            fetchCampaignInsights(id),
        ]);

        if (!campaign) notFound();

        return <CampaignDetailClient campaign={campaign} initialInsights={insights} />;
    } catch (error: any) {
        console.error(error);
        if (error.message?.includes('404')) return notFound();
        return (
            <div style={{ padding: '2rem' }}>
                <ErrorState message={`Failed to load campaign details for ${id}. The API might be temporarily unavailable.`} />
            </div>
        );
    }
}
