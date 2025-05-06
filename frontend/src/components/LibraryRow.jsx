import React from 'react';
import { Box, Typography, Chip, Stack, Button, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function LibraryRow({ item }) {
  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'center', gap: 2, py: 1.5, px: 2, borderRadius: 2,
        '&:hover': { bgcolor: '#f5f7fa' }, transition: 'background 0.2s',
      }}
    >
      <Box sx={{ fontSize: 32, mr: 2 }}>{item.icon}</Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.2 }}>
          <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#222' }}>
            {item.title}
          </a>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, maxWidth: 600 }}>
          {item.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 0.5 }}>
          {item.tags && item.tags.map(tag => (
            <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
          ))}
        </Stack>
      </Box>
      <Box sx={{ minWidth: 120, textAlign: 'right' }}>
        <Typography variant="caption" color="text.secondary">
          {item.author}
        </Typography>
        <Typography variant="caption" color="warning.main" sx={{ ml: 1 }}>
          {item.rating && `★${item.rating}`}
        </Typography>
      </Box>
      <Tooltip title="Открыть в новой вкладке">
        <Button
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          color="primary"
          size="small"
          sx={{ ml: 2, borderRadius: 2 }}
          endIcon={<OpenInNewIcon />}
        >
          Открыть
        </Button>
      </Tooltip>
    </Box>
  );
} 