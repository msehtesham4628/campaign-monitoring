'use client';

import { useState, useEffect } from 'react';
import { CampaignInsights } from '@/types/api';
import { getCampaignInsightsStream } from '@/lib/api';

export function useCampaignStream(id: string | null) {
    const [data, setData] = useState<CampaignInsights | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        const url = getCampaignInsightsStream(id);
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            try {
                const parsedData = JSON.parse(event.data);
                setData(parsedData.insights);
                setLoading(false);
            } catch (err) {
                console.error('Error parsing SSE data:', err);
            }
        };

        eventSource.onerror = (err) => {
            console.error('SSE Error:', err);
            setError('Connection to real-time updates lost.');
            eventSource.close();
            setLoading(false);
        };

        return () => {
            eventSource.close();
        };
    }, [id]);

    return { data, error, loading };
}
