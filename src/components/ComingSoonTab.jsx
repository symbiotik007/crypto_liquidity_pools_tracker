export default function ComingSoonTab({ name }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"60%", gap:12, color:"#2a5a72" }}>
      <div style={{ fontSize:36 }}>⚡</div>
      <div style={{ fontSize:18, color:"#4a7a96", fontWeight:600 }}>{name}</div>
      <div style={{ fontSize:14 }}>Esta sección estará disponible próximamente.</div>
    </div>
  );
}
