import React from 'react';
import { Box, Typography, Paper, Stack, Divider } from '@mui/material';

const DEMO_NEWS = [
  {
    title: 'Запуск ProtoLab 2.0',
    date: '2024-06-01',
    text: 'Вышла новая версия платформы ProtoLab с поддержкой рейтинга протоколов и расширенной библиотекой элементов.'
  },
  {
    title: 'Добавлен рейтинг протоколов',
    date: '2024-05-25',
    text: 'Теперь вы можете оценивать и сортировать протоколы по популярности и эффективности.'
  },
  {
    title: 'Новые элементы в библиотеке',
    date: '2024-05-20',
    text: 'В библиотеку добавлены новые элементы для сна, питания и когнитивных функций.'
  },
  {
    title: 'Открытие ProtoLab',
    date: '2024-05-01',
    text: 'Платформа открыта для всех пользователей. Создавайте, делитесь и дорабатывайте протоколы вместе с сообществом!'
  },
];

export default function AboutPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        О ProtoLab
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        <b>ProtoLab</b> — это современная платформа для создания, публикации и обмена протоколами биохакинга, здоровья и саморазвития. Здесь вы можете:
        <ul>
          <li>Собирать и структурировать свои протоколы</li>
          <li>Использовать готовые элементы и шаблоны</li>
          <li>Делиться протоколами с сообществом</li>
          <li>Обсуждать и дорабатывать лучшие практики</li>
          <li>Оценивать и находить самые эффективные протоколы</li>
        </ul>
        ProtoLab объединяет энтузиастов, экспертов и новичков для совместного развития культуры осознанного подхода к здоровью.
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Новости ProtoLab</Typography>
      <Stack spacing={2}>
        {DEMO_NEWS.map(news => (
          <Paper key={news.title} sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{news.title}</Typography>
            <Typography variant="caption" color="text.secondary">{news.date}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{news.text}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
} 