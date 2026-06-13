export default function Hero({ periodOn, onLogPeriod }) {
  return (
    <div className="hero">
      <div className="halo"></div>
      {periodOn ? (
        <h1>Period:<br />Day 1</h1>
      ) : (
        <h1>Period in<br />9 days</h1>
      )}
      <div className="sub">
        {periodOn ? 'Logged · June 10–16 ' : 'Lower chance of getting pregnant '}
        <span className="info">i</span>
      </div>
      <br />
      <button className="logbtn" onClick={onLogPeriod}>
        {periodOn ? 'Edit period' : 'Log period'}
      </button>
    </div>
  )
}
