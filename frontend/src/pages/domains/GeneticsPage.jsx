import React from 'react';
import { Box, Typography, Paper, Stack, Chip } from '@mui/material';

const TOPICS = [
  'ДНК', 'Метилирование', 'Генетические тесты', 'Эпигенетика', 'Персонализированная медицина',
  'Генетические риски', 'Геномика', 'Секвенирование', 'Генетика долголетия', 'Генетика питания'
];

export default function GeneticsPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'flex-start', gap: 3 }}>
        <Box sx={{ fontSize: 56, minWidth: 72 }}>🧬</Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Генетика и эпигенетика</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Генетика и эпигенетика — ключ к персонализированной медицине и пониманию индивидуальных особенностей организма. Здесь собраны темы по ДНК, генетическим тестам, эпигенетике и генетическим рискам.
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