import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Scatter } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const demoCorrelation = {
  datasets: [
    {
      label: 'Сон vs Энергия',
      data: [
        { x: 6, y: 5 },
        { x: 6.5, y: 6 },
        { x: 7, y: 7 },
        { x: 7.5, y: 8 },
        { x: 8, y: 9 },
      ],
      backgroundColor: '#1976d2',
    },
  ],
};

export default function CorrelationPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Корреляционный анализ</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Взаимосвязь сна и уровня энергии</Typography>
        <Scatter data={demoCorrelation} options={{
          scales: {
            x: { title: { display: true, text: 'Сон (часы)' } },
            y: { title: { display: true, text: 'Энергия (оценка)' } },
          },
        }} />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Здесь можно выявлять взаимосвязи между параметрами (например, как сон влияет на энергию), строить графики и прогнозировать изменения.
        </Typography>
      </Paper>
    </Box>
  );
} 