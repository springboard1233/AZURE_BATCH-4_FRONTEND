# Azure Demand Dashboard - Uploads Milestone

This project includes two upload buttons for:
- AzureUsage.csv -> Aggregates average CPU and Storage by region and shows a grouped bar chart.
- ExternalFactors.csv -> Shows Economic Index and Cloud Market Demand per date as a bar chart.

How to run:
1. npm install
2. npm run dev
3. Open http://localhost:5173 in your browser

CSV expectations:
- AzureUsage.csv headers (case-insensitive): Date, region, resource type, useage_cpu, useage_storage, users-active
- ExternalFactors.csv headers (case-insensitive): Date (or datete), economic index, cloudmarket demand, holiday (0 or 1)

Upload your CSVs via the page — the charts update immediately.