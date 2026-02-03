interface StatItem {
    value: string;
    label: string;
}

interface StatsProps {
    stats: StatItem[];
}

export function AboutStats({ stats }: StatsProps) {
    return (
        <div className="grid md:grid-cols-3 gap-6 mt-12">
            {stats.map((stat) => (
                <div key={stat.label} className="text-center p-6 bg-white rounded-lg shadow">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</h3>
                    <p className="text-gray-700">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}
