export default function StatusBar() {
  return (
    <div className="status">
      <span>8:38</span>
      <span className="right">
        <span style={{ fontSize: 12 }}>📶</span>
        <span style={{ fontSize: 13 }}>🛜</span>
        <span className="battery"><i></i></span>
      </span>
    </div>
  )
}
