import React from 'react';
import { Box, Typography, Paper, Grid, Stack, Button } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const demoData = {
  labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
  weight: [80, 79, 78, 77, 76, 75],
  steps: [5000, 7000, 8000, 9000, 10000, 12000],
  sleep: [6, 6.5, 7, 7.5, 8, 8],
};

export default function DashboardPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Панель мониторинга</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Вес (кг)</Typography>
            <Line data={{
              labels: demoData.labels,
              datasets: [{ label: 'Вес', data: demoData.weight, borderColor: '#1976d2', backgroundColor: '#90caf9' }],
            }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Шаги (в день)</Typography>
            <Bar data={{
              labels: demoData.labels,
              datasets: [{ label: 'Шаги', data: demoData.steps, backgroundColor: '#43a047' }],
            }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Сон (часы)</Typography>
            <Line data={{
              labels: demoData.labels,
              datasets: [{ label: 'Сон', data: demoData.sleep, borderColor: '#fbc02d', backgroundColor: '#fff9c4' }],
            }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Сравнение веса и шагов</Typography>
            <Bar data={{
              labels: demoData.labels,
              datasets: [
                { label: 'Вес', data: demoData.weight, backgroundColor: '#1976d2' },
                { label: 'Шаги', data: demoData.steps, backgroundColor: '#43a047' },
              ],
            }} />
          </Paper>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained">Сводка за месяц</Button>
        <Button variant="outlined">Сравнить периоды</Button>
      </Stack>
    </Box>
  );
} 