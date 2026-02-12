import {
    Campaign,
    CampaignsResponse,
    GlobalInsights,
    InsightsResponse,
    CampaignInsights,
    CampaignInsightsResponse
} from '@/types/api';

const BASE_URL = 'https://mixo-fe-backend-task.vercel.app';

async function fetchWithRetry<T>(url: string, options: RequestInit = {}, retries = 2): Promise<T> {
    try {
        const res = await fetch(url, options);

        // Handle Rate Limiting
        if (res.status === 429 && retries > 0) {
            const retryAfter = res.headers.get('Retry-After');
            const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000;
            console.warn(`Rate limited at ${url}. Retrying in ${delay / 1000}s...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries - 1);
        }

        if (!res.ok) {
            const errorBody = await res.text().catch(() => 'No error body');
            console.error(`API Error [${res.status}] at ${url}: ${errorBody}`);
            throw new Error(`API Error ${res.status}: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        if (retries > 0) {
            console.warn(`Fetch failed at ${url}. Retrying...`, error);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return fetchWithRetry(url, options, retries - 1);
        }
        throw error;
    }
}

export async function fetchCampaigns(): Promise<CampaignsResponse> {
    return fetchWithRetry(`${BASE_URL}/campaigns`, {
        next: { revalidate: 60 },
    });
}

export async function fetchCampaignById(id: string): Promise<{ campaign: Campaign }> {
    return fetchWithRetry(`${BASE_URL}/campaigns/${id}`, {
        next: { revalidate: 60 },
    });
}

export async function fetchGlobalInsights(): Promise<GlobalInsights> {
    const data: InsightsResponse = await fetchWithRetry(`${BASE_URL}/campaigns/insights`, {
        next: { revalidate: 30 },
    });
    return data.insights;
}

export async function fetchCampaignInsights(id: string): Promise<CampaignInsights> {
    const data: CampaignInsightsResponse = await fetchWithRetry(`${BASE_URL}/campaigns/${id}/insights`, {
        next: { revalidate: 30 },
    });
    return data.insights;
}

export function getCampaignInsightsStream(id: string): string {
    return `${BASE_URL}/campaigns/${id}/insights/stream`;
}
