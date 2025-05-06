import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack } from '@mui/material';

const demoRows = [
  { date: '2024-06-01', weight: 75, steps: 12000, sleep: 8 },
  { date: '2024-06-02', weight: 75, steps: 11000, sleep: 7.5 },
  { date: '2024-06-03', weight: 74.8, steps: 13000, sleep: 8 },
];

export default function ReportsPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Отчёты и экспорт данных</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button variant="contained">Экспорт в CSV</Button>
          <Button variant="outlined">Экспорт в JSON</Button>
          <Button variant="outlined">Экспорт в PDF</Button>
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Вес (кг)</TableCell>
                <TableCell>Шаги</TableCell>
                <TableCell>Сон (часы)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demoRows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.steps}</TableCell>
                  <TableCell>{row.sleep}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Здесь можно сгенерировать подробные отчёты, экспортировать данные для анализа или поделиться ими с врачом. Данные ниже — пример для демонстрации.
        </Typography>
      </Paper>
    </Box>
  );
} 