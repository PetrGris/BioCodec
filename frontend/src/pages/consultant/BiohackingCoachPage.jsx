import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Grid, Avatar, TextField, Stack, Chip } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';

export default function BiohackingCoachPage() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Привет! Я твой ИИ-коуч по биохакингу. Задай вопрос или расскажи, что хочешь улучшить.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
  };

  return (
    <Box sx={{ p: 0, minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)' }}>
      <Box sx={{ position: 'relative', bgcolor: 'linear-gradient(135deg, #bbdefb 0%, #fff 100%)', py: 5, mb: -6 }}>
        <Avatar src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256" sx={{ width: 120, height: 120, mx: 'auto', boxShadow: 4, border: '4px solid #fff' }} />
        <Typography variant="h4" align="center" sx={{ fontWeight: 900, mt: 2, color: '#1976d2', letterSpacing: 1 }}>Коуч по биохакингу</Typography>
        <Typography align="center" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', mt: 1 }}>
          Помогу подобрать стратегии биохакинга, анализировать привычки, отслеживать прогресс и давать персональные рекомендации по здоровью.
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
          <Chip label="Анализ привычек" color="primary" variant="outlined" />
          <Chip label="Советы по сну" color="info" variant="outlined" />
          <Chip label="Оптимизация рациона" color="success" variant="outlined" />
          <Chip label="Трекинг прогресса" color="secondary" variant="outlined" />
        </Stack>
      </Box>
      <Grid container justifyContent="center" sx={{ mt: 0, pt: 0 }}>
        <Grid item xs={12} md={7} lg={6}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 6, mt: -8, minHeight: 500, display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.95)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1976d2' }}><PsychologyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Чат с коучем</Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, maxHeight: 350 }}>
              {messages.map((msg, idx) => (
                <Box key={idx} sx={{ mb: 1, display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                    {msg.from === 'bot' && <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2', color: '#fff' }}><PsychologyIcon /></Avatar>}
                    <Paper sx={{ px: 2, py: 1, bgcolor: msg.from === 'user' ? '#e3f2fd' : '#fff', borderRadius: 3, boxShadow: 1, maxWidth: 400 }}>
                      <Typography variant="body2">{msg.text}</Typography>
                    </Paper>
                    {msg.from === 'user' && <Avatar sx={{ width: 32, height: 32, bgcolor: '#90caf9', color: '#1976d2', fontWeight: 700 }}>Я</Avatar>}
                  </Box>
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
                sx={{ bgcolor: '#f5f7fa', borderRadius: 2 }}
              />
              <Button variant="contained" onClick={handleSend} sx={{ fontWeight: 700, px: 3, borderRadius: 2 }}>Отправить</Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 