import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

interface DataDashboardProps {
  savedListings: number;
  totalSearches: number;
  mostSearched: { range: string; count: number }[];
  searchTrends: {
    plats: { time: string; value: number }[];
    hus: { time: string; value: number }[];
    rum2: { time: string; value: number }[];
  };
  searchStats: { area: string; searches: number; trend: 'up' | 'down' }[];
}

export function DataDashboard() {
  // Enhanced mock data for demonstration
  const data = {
    savedListings: 136,
    totalSearches: 1543,
    mostSearched: [
      { range: "14560", count: 2000 },
      { range: "2000", count: 100 },
      { range: "100", count: 50 },
      { range: "10", count: 30 },
    ],
    searchTrends: {
      plats: Array.from({ length: 10 }, (_, i) => ({ time: `${i}`, value: Math.random() * 100 + 100 })),
      hus: Array.from({ length: 10 }, (_, i) => ({ time: `${i}`, value: Math.random() * 100 + 100 })),
      rum2: Array.from({ length: 10 }, (_, i) => ({ time: `${i}`, value: Math.random() * 100 + 100 })),
    },
    searchStats: [
      { area: "80km²", searches: 740, trend: 'up' },
      { area: "60km²", searches: 550, trend: 'down' },
      { area: "350km²", searches: 440, trend: 'up' },
      { area: "60km²", searches: 288, trend: 'up' },
    ],
    // New data for enhanced metrics
    priceMetrics: {
      averagePricePerSqm: [
        { area: "City Center", price: 5200 },
        { area: "Suburbs", price: 3800 },
        { area: "Coastal", price: 4500 },
      ],
      marketDynamics: {
        averageDaysOnMarket: 45,
        priceChangeTrend: -2.5, // percentage
      },
      popularAmenities: [
        { name: "Swimming Pool", count: 245 },
        { name: "Garden", count: 312 },
        { name: "Garage", count: 520 },
        { name: "Security", count: 180 },
      ],
      neighborhoodRanking: [
        { name: "Downtown", score: 92 },
        { name: "Waterfront", score: 88 },
        { name: "Suburban Area", score: 85 },
      ]
    }
  };

  return (
    <div className="p-6 bg-zinc-900/90">
      <h1 className="text-2xl font-bold mb-8 text-white">Data visualisering dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Statistics */}
        <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Saved Listings</h2>
            <p className="text-4xl font-bold text-emerald-400">{data.savedListings}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Search</h2>
            <p className="text-4xl font-bold text-emerald-400">{data.totalSearches}</p>
          </div>
        </Card>

        {/* Market Dynamics */}
        <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
          <h2 className="text-lg font-semibold mb-4 text-white">Market Dynamics</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Average Days on Market</p>
              <p className="text-2xl font-bold text-emerald-400">{data.priceMetrics.marketDynamics.averageDaysOnMarket} days</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Price Change Trend</p>
              <p className={`text-2xl font-bold ${data.priceMetrics.marketDynamics.priceChangeTrend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {data.priceMetrics.marketDynamics.priceChangeTrend}%
              </p>
            </div>
          </div>
        </Card>

        {/* Price per Square Meter */}
        <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
          <h2 className="text-lg font-semibold mb-4 text-white">Price per m²</h2>
          <div className="space-y-2">
            {data.priceMetrics.averagePricePerSqm.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-400">{item.area}</span>
                <span className="text-emerald-400 font-semibold">${item.price}/m²</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Popular Amenities */}
        <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
          <h2 className="text-lg font-semibold mb-4 text-white">Most Requested Amenities</h2>
          <div className="space-y-2">
            {data.priceMetrics.popularAmenities.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-grow bg-emerald-500/20 h-6 rounded">
                  <div
                    className="bg-emerald-500 h-full rounded"
                    style={{ width: `${(item.count / 600) * 100}%` }}
                  />
                </div>
                <span className="ml-2 text-sm text-gray-400">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Search Trends */}
        <Card className="bg-zinc-800/50 border-emerald-500/20 p-6 col-span-2">
          <h2 className="text-lg font-semibold mb-4 text-white">Search Trends</h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.searchTrends.plats}>
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ background: '#1f2937', border: 'none' }}
                  labelStyle={{ color: '#9ca3af' }}
                />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Neighborhood Rankings */}
        <Card className="bg-zinc-800/50 border-emerald-500/20 p-6 col-span-2">
          <h2 className="text-lg font-semibold mb-4 text-white">Neighborhood Rankings</h2>
          <div className="space-y-4">
            {data.priceMetrics.neighborhoodRanking.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-400">{item.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-emerald-500/20 h-2 rounded">
                    <div
                      className="bg-emerald-500 h-full rounded"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-emerald-400 font-semibold">{item.score}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Property Type Filters */}
      <div className="mt-8 flex gap-4">
        <Button variant="outline" className="bg-zinc-800/50 border-emerald-500/20 text-white">
          All
        </Button>
        <Button variant="outline" className="bg-zinc-800/50 border-emerald-500/20 text-white">
          House
        </Button>
        <Button variant="outline" className="bg-zinc-800/50 border-emerald-500/20 text-white">
          Apartment
        </Button>
        <Button variant="outline" className="bg-zinc-800/50 border-emerald-500/20 text-white">
          Townhouse
        </Button>
        <Button variant="outline" className="bg-zinc-800/50 border-emerald-500/20 text-white">
          New production
        </Button>
      </div>
    </div>
  );
}