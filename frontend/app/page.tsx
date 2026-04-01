"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [industry, setIndustry] = useState("Fintech");
  const [region, setRegion] = useState("India");
  const [result, setResult] = useState<any>(null);
  const [simulation, setSimulation] = useState<any>(null);

  const checkCompliance = async () => {
    try {
      const res = await axios.post("http://localhost:3001/check", {
        industry,
        region,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Backend not running 😭");
    }
  };

  const runSimulation = async () => {
    try {
      const res = await axios.post("http://localhost:3001/simulate", {
        risk: "MEDIUM", // temporary fix
      });
      setSimulation(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getColor = (status: string) => {
    if (status === "GREEN") return "text-green-400";
    if (status === "YELLOW") return "text-yellow-300";
    return "text-red-400";
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8 text-cyan-400">
        ⚡ Comply AI Dashboard
      </h1>

      {/* INPUT CARD */}
      <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg border border-cyan-500/20">
        <h2 className="text-xl mb-4">Compliance Scan</h2>

        <div className="flex gap-4">
          <input
            className="bg-black p-2 rounded w-full"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Industry"
          />

          <input
            className="bg-black p-2 rounded w-full"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Region"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={checkCompliance}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg"
          >
            Check Compliance
          </button>

          <button
            onClick={runSimulation}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
          >
            Simulate Impact
          </button>
        </div>
      </div>

      {/* RESULT */}
      {result && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h3>Status</h3>
            <p className={`text-lg ${getColor(result.status)}`}>
              {result.status}
            </p>
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl">
            <h3>Message</h3>
            <p>{result.message}</p>
          </div>
        </div>
      )}

      {/* SIMULATION */}
      {simulation && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-zinc-900 p-4 rounded-xl">
            <h3>💰 Fine</h3>
            <p>{simulation.fine}</p>
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl">
            <h3>⚠️ Risk</h3>
            <p>{simulation.risk}</p>
          </div>

          <div className="bg-zinc-900 p-4 rounded-xl">
            <h3>📊 Impact</h3>
            <p>{simulation.impact}</p>
          </div>
        </div>
      )}
    </main>
  );
}