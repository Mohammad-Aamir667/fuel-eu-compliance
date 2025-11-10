import { useState } from "react";
import RoutesTab from "../components/RoutesTab";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("routes");

    const tabs = ["routes", "compare", "banking", "pooling"];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Tab Buttons */}
            <div className="flex justify-center space-x-6 border-b border-gray-700 p-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`capitalize px-3 pb-2 ${activeTab === tab
                            ? "text-blue-400 border-b-2 border-blue-400"
                            : "text-gray-400"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {activeTab === "routes" && <RoutesTab />}
                {activeTab === "compare" && <div>Compare Tab</div>}
                {activeTab === "banking" && <div>Banking Tab</div>}
                {activeTab === "pooling" && <div>Pooling Tab</div>}
            </div>
        </div>
    );
}