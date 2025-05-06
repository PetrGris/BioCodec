import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Avatar, TextField, Stack } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Link } from 'react-router-dom';

const CONSULTANTS = [
  {
    icon: <PsychologyIcon sx={{ color: '#1976d2' }} />, label: 'Коуч по биохакингу', path: '/consultant/biohacking',
  },
  {
    icon: <RestaurantIcon sx={{ color: '#43a047' }} />, label: 'ИИ-нутрициолог', path: '/consultant/nutrition',
  },
  {
    icon: <FitnessCenterIcon sx={{ color: '#e91e63' }} />, label: 'Консультант по спорту', path: '/consultant/sport',
  },
];

export default function NutritionConsultantPage() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Здравствуйте! Я ваш ИИ-нутрициолог. Готов ответить на вопросы о питании, рационе и нутриентах.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Меню консультантов */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Консультанты</Typography>
            <List>
              {CONSULTANTS.map((c, i) => (
                <ListItem button key={i} component={Link} to={c.path} selected={c.path === '/consultant/nutrition'} sx={{ borderRadius: 2, mb: 1 }}>
                  <ListItemIcon>{c.icon}</ListItemIcon>
                  <ListItemText primary={c.label} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        {/* Чат */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3, minHeight: 480, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Чат с ИИ-нутрициологом</Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, maxHeight: 350 }}>
              {messages.map((msg, idx) => (
                <Box key={idx} sx={{ mb: 1, textAlign: msg.from === 'user' ? 'right' : 'left' }}>
                  <Paper sx={{ display: 'inline-block', px: 2, py: 1, bgcolor: msg.from === 'user' ? '#e3f2fd' : '#f5f5f5', borderRadius: 2 }}>
                    <Typography variant="body2">{msg.text}</Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                placeholder="Введите сообщение..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              />
              <Button variant="contained" onClick={handleSend}>Отправить</Button>
            </Stack>
          </Paper>
        </Grid>
        {/* Описание консультанта */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2, textAlign: 'center' }}>
            <Avatar src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=facearea&w=256&h=256" sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>ИИ-нутрициолог</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Помогу подобрать рацион, рассчитать БЖУ, дать советы по питанию и нутрицевтикам, а также ответить на вопросы о продуктах.
            </Typography>
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80" alt="Питание" style={{ width: '100%', borderRadius: 12, marginBottom: 8 }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 