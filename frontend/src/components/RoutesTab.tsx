import React, { useEffect, useState } from "react";
import api from "../utils/api";

interface Route {
    id: number;
    routeId: string;
    vesselType: string;
    fuelType: string;
    year: number;
    ghgIntensity: number;
    fuelConsumption: number;
    distance: number;
    totalEmissions: number;
    isBaseline: boolean;
}

export default function RoutesTab() {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const fetchRoutes = async () => {
        try {
            const res = await api.get("/routes");
            setRoutes(res.data);
        } catch (error) {
            console.error("Failed to fetch routes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoutes();
    }, []);

    // 🔹 Set Baseline handler
    const handleSetBaseline = async (routeId: string) => {
        try {
            const res = await api.post(`/routes/${routeId}/baseline`);
            setMessage(res.data.message);
            fetchRoutes(); // refresh list
        } catch (err) {
            console.error(err);
            setMessage("Failed to set baseline");
        }
    };

    if (loading) {
        return <p className="text-center text-gray-400 mt-8">Loading routes...</p>;
    }

    return (
        <div className="overflow-x-auto mt-6">
            <h2 className="text-lg font-semibold mb-4">Available Routes</h2>
            {message && <p className="text-center text-green-400 mb-2">{message}</p>}

            <table className="min-w-full border border-gray-700 text-sm">
                <thead className="bg-gray-800 text-gray-300">
                    <tr>
                        <th className="border px-3 py-2">Route ID</th>
                        <th className="border px-3 py-2">Vessel Type</th>
                        <th className="border px-3 py-2">Fuel Type</th>
                        <th className="border px-3 py-2">Year</th>
                        <th className="border px-3 py-2">GHG Intensity</th>
                        <th className="border px-3 py-2">Baseline</th>
                        <th className="border px-3 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {routes.map((r) => (
                        <tr
                            key={r.id}
                            className="text-center border-gray-700 hover:bg-gray-800"
                        >
                            <td className="border px-3 py-2">{r.routeId}</td>
                            <td className="border px-3 py-2">{r.vesselType}</td>
                            <td className="border px-3 py-2">{r.fuelType}</td>
                            <td className="border px-3 py-2">{r.year}</td>
                            <td className="border px-3 py-2">{r.ghgIntensity}</td>
                            <td className="border px-3 py-2">
                                {r.isBaseline ? "✅" : "❌"}
                            </td>
                            <td className="border px-3 py-2">
                                {!r.isBaseline ? (
                                    <button
                                        onClick={() => handleSetBaseline(r.routeId)}
                                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded"
                                    >
                                        Set Baseline
                                    </button>
                                ) : (
                                    <span className="text-gray-500">Baseline</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}