export default function Loader({rows=6}){
  return (
    <div className="grid">
      {Array.from({length: rows}).map((_,i)=> (
        <div key={i} className="card" aria-busy="true">
          <div className="thumb skeleton" />
          <div className="content">
            <div className="skeleton" style={{height:14, width:'85%'}} />
            <div className="skeleton" style={{height:12, width:'65%'}} />
            <div className="skeleton" style={{height:12, width:'40%'}} />
          </div>
        </div>
      ))}
    </div>
  )
}
