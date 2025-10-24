import React from 'react';
import AzureUpload from '../components/AzureUpload';
import ExternalUpload from '../components/ExternalUpload';

export default function Dashboard(){
  return (
    <div className="container">
      <h1>Azure Demand Dashboard — Upload CSVs</h1>
      <div className="card">
        <h2>Upload AzureUsage.csv</h2>
        <AzureUpload />
      </div>

      <div className="card">
        <h2>Upload ExternalFactors.csv</h2>
        <ExternalUpload />
      </div>
    </div>
  );
}