import React, { useState } from 'react';
import Papa from 'papaparse';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ExternalUpload(){
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  const handleFile = (file) => {
    setError(null);
    Papa.parse(file, { header:true, skipEmptyLines:true, complete: (results)=>{
      const rowsRaw = results.data;
      const rows = rowsRaw.map(r=>{
        const norm = {};
        for(const k of Object.keys(r)){
          norm[k.trim().toLowerCase()] = r[k];
        }
        return norm;
      }).filter(r=> Object.keys(r).length>0 );
      if(!rows.length){ setError('CSV is empty or malformed'); return; }

      const dateKey = Object.keys(rows[0]).find(k=>/date/.test(k)) || Object.keys(rows[0])[0];
      const econKey = Object.keys(rows[0]).find(k=>/economic|economic index|economic_index/.test(k)) || Object.keys(rows[0]).find(k=>/economic/i.test(k));
      const marketKey = Object.keys(rows[0]).find(k=>/cloudmarket|cloud market|cloudmarket demand|market demand|market/i.test(k)) || Object.keys(rows[0]).find(k=>/market/i.test(k));

      const labels = rows.map(r => r[dateKey] ? r[dateKey].toString() : '');
      const econVals = rows.map(r => Number(r[econKey] || 0));
      const marketVals = rows.map(r => Number(r[marketKey] || 0));

      const data = {
        labels,
        datasets:[
          { label: 'Economic Index', data: econVals, backgroundColor: 'rgba(75,192,192,0.8)' },
          { label: 'Cloud Market Demand', data: marketVals, backgroundColor: 'rgba(153,102,255,0.8)' }
        ]
      };
      setChartData(data);
    }});
  };

  const onChange = (e)=> {
    const f = e.target.files && e.target.files[0];
    if(f) handleFile(f);
  };

  return (
    <div>
      <div className="controls">
        <input type="file" accept=".csv" onChange={onChange} />
        <div>Upload ExternalFactors.csv with columns like <b>Date</b>, <b>Economic Index</b>, <b>CloudMarket Demand</b>, <b>Holiday</b>.</div>
      </div>
      {error && <div style={{color:'red', marginTop:8}}>{error}</div>}
      {chartData ? (
        <div className="chart-wrapper">
          <Bar data={chartData} options={{ responsive:true, plugins:{ title:{ display:true, text:'External Factors (by Date)'} }}} />
        </div>
      ) : (
        <div style={{marginTop:12}}>No data yet — upload ExternalFactors.csv</div>
      )}
    </div>
  );
}