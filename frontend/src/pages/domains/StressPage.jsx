import React from 'react';
import { Box, Typography, Paper, Stack, Chip } from '@mui/material';

const TOPICS = [
  'HRV', 'Адаптогены', 'Дыхание', 'Медитация', 'Восстановление', 'Сон', 'Релаксация',
  'Кортизол', 'Стресс-менеджмент', 'Психология'
];

export default function StressPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'flex-start', gap: 3 }}>
        <Box sx={{ fontSize: 56, minWidth: 72 }}>🧘‍♂️</Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Стресс и recovery</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Управление стрессом и восстановление — основа устойчивости и продуктивности. Здесь собраны темы по HRV, дыхательным практикам, адаптогенам, медитации и психологии.
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