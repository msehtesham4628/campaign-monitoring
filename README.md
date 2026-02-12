# Mixo Ads | Campaign Monitoring Dashboard

A high-performance, real-time campaign monitoring dashboard built for **Mixo Ads**. This application enables multi-location brands to track advertising performance with precision, featuring live metric updates and advanced filtering.

![Dashboard Preview](https://mixo-fe-backend-task.vercel.app/favicon-32x32.png) <!-- Replace with actual screenshot link after deployment if possible -->

## 🚀 Features

- **Global Performance Overview**: Instant visibility into active campaigns, total spend, conversions, and aggregate conversion rates.
- **Advanced Campaign Management**:
  - Real-time search by campaign name.
  - Status-based filtering (Active, Paused, Completed, Draft).
  - Platform-specific insights (Meta, Google, LinkedIn, TikTok).
- **Real-time Monitoring (SSE)**: Live streaming of performance metrics (CTR, Conversion Rate, CPC, ROAS, Impressions, Clicks) using Server-Sent Events.
- **Resilient Data Layer**: 
  - **Intelligent Retries**: Automatic backoff and retry for API rate limits (429).
  - **Graceful Degradation**: Robust error states and null-safety to ensure the UI remains stable even with incomplete data.
- **Premium Design**: Modern, dark-themed interface built with Vanilla CSS for maximum performance and a customized look.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS (Custom Design System)
- **State Management**: React Hooks & Server Components
- **API**: Mixo Ads Backend API (Rest + SSE)

## 🏁 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/msehtesham4628/campaign-monitoring.git
   cd campaign-monitoring
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## 📦 Deployment

This project is optimized for deployment on **Vercel**:

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Vercel will automatically detect Next.js and deploy the application.

## 🛡️ Reliability & Resilience

The dashboard is built to handle production-scale irregularities:
- **Rate Limit Handling**: Automatically retries API calls when encountering 429 status codes.
- **Null-Safety**: Uses nullish coalescing and safe accessors to prevent crashes if the API returns partial data.
- **Error Boundaries**: Provides inline error alerts for individual dashboard sections to maintain a usable interface during partial outages.

---

Built with ❤️ for Mixo Ads.
Questions? Contact [hari@mixoads.com](mailto:hari@mixoads.com)

