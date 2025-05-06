import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import LibraryRow from './LibraryRow';

export default function LibrarySection({ title, items }) {
  return (
    <Paper elevation={0} sx={{ mb: 4, p: 0, bgcolor: '#fff', borderRadius: 3, border: '1px solid #eee' }}>
      <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #f0f0f0', bgcolor: '#f8fafb', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>{title}</Typography>
      </Box>
      <Box>
        {items.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ px: 3, py: 2 }}>
            Нет материалов в этом разделе.
          </Typography>
        ) : (
          items.map(item => <LibraryRow key={item.id} item={item} />)
        )}
      </Box>
    </Paper>
  );
} 