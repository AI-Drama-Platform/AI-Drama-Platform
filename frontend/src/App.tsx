import { Clapperboard, Server, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { getHealth } from "./lib/api";
import "./styles.css";

type HealthState =
  | { status: "loading" }
  | { status: "ok"; service: string; environment: string }
  | { status: "error"; message: string };

function App() {
  const [health, setHealth] = useState<HealthState>({ status: "loading" });

  useEffect(() => {
    getHealth()
      .then((data) =>
        setHealth({
          status: "ok",
          service: data.service,
          environment: data.environment
        })
      )
      .catch((error: unknown) =>
        setHealth({
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error"
        })
      );
  }, []);

  return (
    <main className="app-shell">
      <section className="workspace">
        <div className="eyebrow">
          <Sparkles size={18} />
          MVP Skeleton
        </div>
        <h1>AI Drama Platform</h1>
        <p>
          A minimal foundation for projects, characters, shots, tasks, and AI providers.
        </p>

        <div className="status-grid" aria-label="System status">
          <div className="status-panel">
            <Clapperboard size={24} />
            <div>
              <span>Frontend</span>
              <strong>React + Vite ready</strong>
            </div>
          </div>
          <div className="status-panel">
            <Server size={24} />
            <div>
              <span>Backend</span>
              <strong>{renderHealth(health)}</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function renderHealth(health: HealthState) {
  if (health.status === "loading") {
    return "Checking /api/health";
  }

  if (health.status === "error") {
    return `Unavailable: ${health.message}`;
  }

  return `${health.service} (${health.environment})`;
}

export default App;
