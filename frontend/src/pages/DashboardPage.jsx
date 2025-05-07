import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Stack, Chip, List, ListItem, Divider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

// Демо-протоколы
const DEMO_PROTOCOLS = [
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
    author: 'demo',
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
    author: 'demo',
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
    author: 'demo',
  },
];

export default function DashboardPage() {
  const [protocols, setProtocols] = useState(DEMO_PROTOCOLS);

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
      <Typography variant="h4" sx={{ mb: 2 }}>Мои протоколы</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 3 }} onClick={() => alert('Создать новый протокол (заглушка)')}>Создать протокол</Button>
      <Stack spacing={3}>
        {protocols.map(protocol => (
          <Paper key={protocol.id} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mr: 2 }}>{protocol.icon} {protocol.title}</Typography>
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
              <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleEdit(protocol)}>Edit</Button>
              <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(protocol)}>Delete</Button>
              <Button variant="outlined" startIcon={<ShareIcon />} onClick={() => handleShare(protocol)}>Share</Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
} 