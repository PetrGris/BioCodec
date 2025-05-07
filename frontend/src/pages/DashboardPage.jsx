import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Stack, Chip, List, ListItem, Divider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate, Link } from 'react-router-dom';

// Демо-протоколы
export const DEMO_PROTOCOLS = [
  {
    id: 1,
    title: 'Здоровый сон',
    icon: '😴',
    tags: ['сон', 'восстановление'],
    description: 'Пошаговый план для улучшения качества сна.',
    steps: [
      { icon: '🕙', text: 'Ложиться спать в одно и то же время' },
      { icon: '📵', text: 'За 2 часа до сна — без гаджетов' },
      { icon: '🌬️', text: 'Проветрить комнату перед сном' },
      { icon: '💊', text: 'Принимать магний вечером' },
    ],
    author: { name: 'PetrGris', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    updated: '2ч назад',
    forks: 12,
    stars: 34,
    views: 120,
    rating: 4.7,
    history: [
      { date: '2024-06-01', action: 'Создан протокол' },
      { date: '2024-06-02', action: 'Добавлен шаг: Проветрить комнату' },
      { date: '2024-06-03', action: 'Обновлено описание' },
    ],
  },
  {
    id: 2,
    title: 'Утренняя энергия',
    icon: '☀️',
    tags: ['энергия', 'утро'],
    description: 'Протокол для бодрого начала дня.',
    steps: [
      { icon: '💧', text: 'Стакан воды сразу после пробуждения' },
      { icon: '🤸', text: '10 минут растяжки или зарядки' },
      { icon: '🚿', text: 'Контрастный душ' },
      { icon: '🍳', text: 'Завтрак с белком и клетчаткой' },
    ],
    author: { name: 'demo', avatar: '' },
    updated: '',
    forks: 0,
    stars: 0,
    views: 0,
    rating: 0,
    history: [],
  },
  {
    id: 3,
    title: 'Детокс после праздников',
    icon: '🥦',
    tags: ['детокс', 'питание'],
    description: 'Лёгкий протокол для восстановления после переедания.',
    steps: [
      { icon: '🚫🍬🍷', text: 'День без сахара и алкоголя' },
      { icon: '💧', text: '2 литра воды в течение дня' },
      { icon: '🥗', text: 'Овощи в каждом приёме пищи' },
      { icon: '🚶', text: 'Прогулка на свежем воздухе 30 минут' },
    ],
    author: { name: 'demo', avatar: '' },
    updated: '',
    forks: 0,
    stars: 0,
    views: 0,
    rating: 0,
    history: [],
  },
];

export default function DashboardPage() {
  const [protocols, setProtocols] = useState(DEMO_PROTOCOLS);
  const navigate = useNavigate();

  // Заглушки для кнопок
  const handleFork = (protocol) => alert(`Форк протокола: ${protocol.title}`);
  const handleEdit = (protocol) => alert(`Редактировать протокол: ${protocol.title}`);
  const handleDelete = (protocol) => alert(`Удалить протокол: ${protocol.title}`);
  const handleShare = (protocol) => {
    navigator.clipboard.writeText(window.location.origin + '/protocol/' + protocol.id);
    alert('Ссылка на протокол скопирована!');
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Мои протоколы</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 3 }} onClick={() => navigate('/protocol/create')}>
        Создать протокол
      </Button>
      <Stack spacing={3}>
        {protocols.map(protocol => (
          <Paper key={protocol.id} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mr: 2 }} component={Link} to={`/protocol/${protocol.id}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>{protocol.icon} {protocol.title}</Typography>
              <Stack direction="row" spacing={1}>
                {protocol.tags.map(tag => <Chip key={tag} label={tag} size="small" color="primary" />)}
              </Stack>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>{protocol.description}</Typography>
            <List>
              {protocol.steps.map((step, idx) => (
                <ListItem key={idx}>
                  <span style={{ fontSize: 24, marginRight: 12 }}>{step.icon}</span> {step.text}
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={() => handleFork(protocol)}>Fork</Button>
              <Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate(`/protocol/${protocol.id}`)}>Edit</Button>
              <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(protocol)}>Delete</Button>
              <Button variant="outlined" startIcon={<ShareIcon />} onClick={() => handleShare(protocol)}>Share</Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        {/* Здесь будет интеграция с Discourse или собственной системой обсуждений для каждого протокола */}
        <Typography variant="subtitle2" color="text.secondary">Комментарии и обсуждение протоколов появятся здесь.</Typography>
      </Box>
    </Box>
  );
} 