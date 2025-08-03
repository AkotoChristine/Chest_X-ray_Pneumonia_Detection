import { useEffect, useState } from "react";

export default function MetricsDisplay() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await fetch("http://localhost:8000/retrain"); // Update with your real endpoint
      const data = await response.json();

      console.log("Backend Response:", data); // ✅ Debug here

      setMetrics({
        Loss: data.final_val_loss.toFixed(4),
        Accuracy: (data.final_val_accuracy * 100).toFixed(2) + "%",
        Precision: (data.final_precision * 100).toFixed(2) + "%",
        Recall: (data.final_recall * 100).toFixed(2) + "%",
        "F1 Score": (data.final_f1_score * 100).toFixed(2) + "%", // ✅ Clean key name
      });
    };

    fetchMetrics();
  }, []);

  return (
    <section className="p-4">
      <h2 className="text-xl font-semibold mb-4">Retrained Model Metrics</h2>
      {metrics ? (
        <div className="grid gap-2">
          {Object.entries(metrics).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
      ) : (
        <p>Loading metrics...</p>
      )}
    </section>
  );
}
