import React from 'react';
import { Box, Typography, Paper, Stack, Chip } from '@mui/material';

const TOPICS = [
  'БЖУ', 'Витамины', 'Минералы', 'Нутрицевтики', 'Голодание', 'Рационы', 'Гликемический индекс',
  'Пищевые привычки', 'Микробиота', 'Суперфуды'
];

export default function NutritionPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'flex-start', gap: 3 }}>
        <Box sx={{ fontSize: 56, minWidth: 72 }}>🥗</Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Питание</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Питание — ключ к энергии, здоровью и долголетию. Здесь собраны темы по оптимизации диеты, нутрицевтикам, БЖУ, пищевым привычкам и современным подходам к рациону.
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Ключевые темы:</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {TOPICS.map(topic => (
              <Chip key={topic} label={topic} color="primary" variant="outlined" sx={{ mb: 1 }} />
            ))}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
} 