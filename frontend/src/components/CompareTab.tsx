import { useEffect, useState } from "react";
import api from "../utils/api";

interface Comparison {
    routeId: string;
    baselineIntensity: number;
    comparisonIntensity: number;
    percentDiff: number;
    compliant: boolean;
}

export default function CompareTab() {
    const [data, setData] = useState<Comparison[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComparison = async () => {
            try {
                const res = await api.get("/routes/comparison");
                setData(res.data);
            } catch (err) {
                console.error("Error fetching comparison data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchComparison();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-400 mt-8">Loading comparison data...</p>;
    }

    return (
        <div className="mt-6 p-4">
            <h2 className="text-lg font-semibold mb-4">Compliance Comparison</h2>
            <table className="min-w-full border border-gray-700 text-sm">
                <thead className="bg-gray-800 text-gray-300">
                    <tr>
                        <th className="border px-3 py-2">Route ID</th>
                        <th className="border px-3 py-2">Baseline Intensity</th>
                        <th className="border px-3 py-2">Comparison Intensity</th>
                        <th className="border px-3 py-2">% Difference</th>
                        <th className="border px-3 py-2">Compliant</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i} className="text-center hover:bg-gray-800">
                            <td className="border px-3 py-2">{item.routeId}</td>
                            <td className="border px-3 py-2">{item.baselineIntensity.toFixed(2)}</td>
                            <td className="border px-3 py-2">{item.comparisonIntensity.toFixed(2)}</td>
                            <td
                                className={`border px-3 py-2 ${item.percentDiff > 0 ? "text-red-400" : "text-green-400"
                                    }`}
                            >
                                {item.percentDiff.toFixed(2)}%
                            </td>
                            <td className="border px-3 py-2">
                                {item.compliant ? "✅" : "❌"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}