import React from 'react';
import { Box, Typography, Paper, Stack, Chip } from '@mui/material';

const TOPICS = [
  'Циркадные ритмы',
  'Трекеры сна',
  'Мелатонин',
  'Гигиена сна',
  'Свет и температура',
  'Гаджеты',
  'Сонные протоколы',
  'Стадии сна',
  'Сон и здоровье',
  'Сон и когнитивные функции'
];

export default function SleepPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'flex-start', gap: 3 }}>
        <Box sx={{ fontSize: 56, minWidth: 72 }}>😴</Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Сон</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Сон — фундамент биохакинга. Качественный сон влияет на восстановление, когнитивные функции, гормональный баланс и долголетие. Здесь собраны ключевые темы: циркадные ритмы, гаджеты, добавки, протоколы улучшения сна.
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