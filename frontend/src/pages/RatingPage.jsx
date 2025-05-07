import React from 'react';
import { Box, Typography, Paper, Stack, Chip } from '@mui/material';

const DEMO_RATING = [
  { title: 'Здоровый сон', author: 'demo', score: 9.8, tags: ['сон', 'восстановление'] },
  { title: 'Утренняя энергия', author: 'demo', score: 9.2, tags: ['энергия', 'утро'] },
  { title: 'Детокс после праздников', author: 'demo', score: 8.7, tags: ['детокс', 'питание'] },
];

export default function RatingPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Рейтинг протоколов</Typography>
      <Stack spacing={2}>
        {DEMO_RATING.map((item, idx) => (
          <Paper key={item.title} sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, minWidth: 40 }}>{idx + 1}.</Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{item.title}</Typography>
              <Typography variant="caption" color="text.secondary">Автор: {item.author}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                {item.tags.map(tag => <Chip key={tag} label={tag} size="small" />)}
              </Stack>
            </Box>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 900 }}>{item.score}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
} 