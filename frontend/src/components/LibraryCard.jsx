import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box, Button, Stack } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function LibraryCard({ item }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="160"
          image={item.cover_url}
          alt={item.title}
          sx={{ objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
        <Box sx={{ position: 'absolute', top: 12, left: 12, fontSize: 36, background: 'rgba(255,255,255,0.85)', borderRadius: '50%', p: 1 }}>
          {item.icon}
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: 48 }}>
          {item.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1 }}>
          {item.tags && item.tags.map(tag => (
            <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
          ))}
        </Stack>
        <Typography variant="caption" color="text.secondary">
          {item.author} {item.rating && `· ★${item.rating}`}
        </Typography>
      </CardContent>
      <Button
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        variant="contained"
        color="secondary"
        endIcon={<OpenInNewIcon />}
        sx={{ m: 2, mt: 'auto', borderRadius: 2 }}
      >
        Подробнее
      </Button>
    </Card>
  );
} 