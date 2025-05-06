import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Stack } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link } from 'react-router-dom';

const CONSULTANTS = [
  {
    icon: <PsychologyIcon sx={{ fontSize: 48, color: '#1976d2' }} />,
    title: 'Коуч по биохакингу',
    description: 'Персональные рекомендации по биохакингу, привычкам, анализам и оптимизации образа жизни.',
    path: '/consultant/biohacking',
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 48, color: '#43a047' }} />,
    title: 'ИИ-нутрициолог',
    description: 'Советы по питанию, подбор рациона, анализ нутриентов, рекомендации по добавкам.',
    path: '/consultant/nutrition',
  },
  {
    icon: <FitnessCenterIcon sx={{ fontSize: 48, color: '#e91e63' }} />,
    title: 'Консультант по спорту',
    description: 'Планирование тренировок, советы по активности, восстановлению и спортивному питанию.',
    path: '/consultant/sport',
  },
];

export default function AIConsultantsPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>ИИ-консультанты</Typography>
      <Grid container spacing={3}>
        {CONSULTANTS.map((c, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
              <Box sx={{ mb: 2 }}>{c.icon}</Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{c.title}</Typography>
                <Typography variant="body2" color="text.secondary">{c.description}</Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to={c.path} variant="contained">Перейти</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 