export default function VeloChartTab() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#0d0d0d" }}>
      <iframe
        src="https://velo.xyz/chart"
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="Velo Chart"
      />
    </div>
  );
}
