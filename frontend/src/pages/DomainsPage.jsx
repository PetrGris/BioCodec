import React from 'react';
import { Box, Typography, Paper, Stack, Chip } from '@mui/material';

const DOMAINS = [
  {
    icon: '😴',
    title: 'Сон',
    description: 'Циркадные ритмы, гаджеты для сна, добавки для улучшения качества сна.',
    topics: ['Циркадные ритмы', 'Трекеры сна', 'Мелатонин', 'Гигиена сна', 'Свет и температура', 'Гаджеты', 'Сонные протоколы']
  },
  {
    icon: '🥗',
    title: 'Питание',
    description: 'Оптимизация диеты, баланс БЖУ, нутрицевтики, интервальное голодание.',
    topics: ['БЖУ', 'Витамины', 'Минералы', 'Нутрицевтики', 'Голодание', 'Рационы', 'Гликемический индекс']
  },
  {
    icon: '🧘‍♂️',
    title: 'Стресс и recovery',
    description: 'HRV, адаптогены, дыхательные практики, восстановление после стресса.',
    topics: ['HRV', 'Адаптогены', 'Дыхание', 'Медитация', 'Восстановление', 'Сон', 'Релаксация']
  },
  {
    icon: '🧬',
    title: 'Долголетие',
    description: 'Теломеры, аутофагия, геропротекторы, биомаркеры старения.',
    topics: ['Теломеры', 'Аутофагия', 'Геропротекторы', 'Биомаркеры', 'mTOR', 'SIRT', 'Антиэйджинг']
  },
  {
    icon: '🧠',
    title: 'Когнитивные функции',
    description: 'Ноотропы, нейропластичность, тренировка мозга, память.',
    topics: ['Ноотропы', 'Память', 'Внимание', 'Нейропластичность', 'Тренировка мозга', 'Когнитивные тесты']
  },
  {
    icon: '🏃‍♂️',
    title: 'Физическая активность',
    description: 'Биомеханика, восстановление, трекинг активности, спорт.',
    topics: ['Биомеханика', 'Восстановление', 'Трекинг', 'Спорт', 'Кардио', 'Силовые тренировки']
  },
  {
    icon: '🧬',
    title: 'Генетика и эпигенетика',
    description: 'Анализ ДНК, метилирование, персонализированная медицина.',
    topics: ['ДНК', 'Метилирование', 'Генетические тесты', 'Эпигенетика', 'Персонализированная медицина']
  }
];

export default function DomainsPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        🧩 Основные домены биохакинга
      </Typography>
      <Stack spacing={4}>
        {DOMAINS.map(domain => (
          <Paper key={domain.title} sx={{ p: 3, borderRadius: 3, boxShadow: 2, display: 'flex', alignItems: 'flex-start', gap: 3 }}>
            <Box sx={{ fontSize: 48, minWidth: 64 }}>{domain.icon}</Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{domain.title}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>{domain.description}</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {domain.topics.map(topic => (
                  <Chip key={topic} label={topic} color="primary" variant="outlined" sx={{ mb: 1 }} />
                ))}
              </Stack>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
} 