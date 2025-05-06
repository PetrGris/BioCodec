import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Chip, TextField, Button, Stack, CardMedia, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const articles = [
  {
    title: 'Генетический анализ: новый тренд в биохакинге',
    summary: 'Как генетические тесты помогают персонализировать подход к здоровью.',
    url: 'https://example.com/genetic',
    tags: ['генетика', 'анализы', 'технологии'],
    category: 'Технологии',
    date: '02.05',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    likes: 6, views: 46, comments: 11,
  },
  {
    title: 'Топ-5 гаджетов для отслеживания здоровья в 2024',
    summary: 'Обзор лучших устройств для контроля сна, активности и биомаркеров.',
    url: 'https://example.com/gadgets',
    tags: ['гаджеты', 'технологии', 'мониторинг'],
    category: 'Гаджеты',
    date: '02.05',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    likes: 4, views: 16, comments: 38,
  },
  {
    title: 'Как правильно интерпретировать анализы крови',
    summary: 'Советы по чтению лабораторных показателей для биохакеров.',
    url: 'https://example.com/blood',
    tags: ['анализы', 'кровь', 'здоровье'],
    category: 'Анализы',
    date: '02.05',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    likes: 8, views: 32, comments: 7,
  },
  {
    title: 'Сон и продуктивность: что советуют биохакеры',
    summary: 'Методы улучшения сна и повышения эффективности.',
    url: 'https://example.com/sleep',
    tags: ['сон', 'продуктивность', 'советы'],
    category: 'Здоровье',
    date: '02.05',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    likes: 12, views: 54, comments: 9,
  },
  {
    title: 'Микробиом: почему кишечник — второй мозг',
    summary: 'Влияние микробиоты на настроение, иммунитет и энергию.',
    url: 'https://example.com/microbiome',
    tags: ['микробиом', 'питание', 'здоровье'],
    category: 'Питание',
    date: '02.05',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    likes: 10, views: 41, comments: 5,
  },
  {
    title: 'Эксперименты с интервальным голоданием: плюсы и минусы',
    summary: 'Что говорят исследования и опытные биохакеры.',
    url: 'https://example.com/fasting',
    tags: ['голодание', 'эксперименты', 'питание'],
    category: 'Питание',
    date: '02.05',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    likes: 7, views: 28, comments: 3,
  },
  {
    title: 'Нейростимуляция: будущее персонального развития',
    summary: 'Как современные устройства влияют на мозг и когнитивные функции.',
    url: 'https://example.com/neuro',
    tags: ['нейростимуляция', 'технологии', 'мозг'],
    category: 'Технологии',
    date: '02.05',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    likes: 5, views: 19, comments: 2,
  },
  {
    title: 'Лучшие приложения для контроля привычек',
    summary: 'Подборка мобильных решений для формирования полезных привычек.',
    url: 'https://example.com/habits',
    tags: ['приложения', 'привычки', 'мониторинг'],
    category: 'Приложения',
    date: '02.05',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    likes: 9, views: 22, comments: 4,
  },
];

const allTags = Array.from(new Set(articles.flatMap(a => a.tags)));

export default function NewsPage() {
  const [selectedTag, setSelectedTag] = useState('');
  const [search, setSearch] = useState('');

  const filtered = articles.filter(article =>
    (!selectedTag || article.tags.includes(selectedTag)) &&
    (article.title.toLowerCase().includes(search.toLowerCase()) ||
     article.summary.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>Новости биохакинга</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
        <Chip
          label="Все теги"
          color={selectedTag === '' ? 'primary' : 'default'}
          onClick={() => setSelectedTag('')}
        />
        {allTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            color={selectedTag === tag ? 'primary' : 'default'}
            onClick={() => setSelectedTag(tag)}
          />
        ))}
      </Stack>
      <TextField
        label="Поиск по новостям"
        variant="outlined"
        size="small"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 3, width: 320 }}
      />
      <Grid container spacing={3}>
        {filtered.map((article, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                boxShadow: 3,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 8 },
              }}
              component="a"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CardMedia
                component="img"
                height="140"
                image={article.image}
                alt={article.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                  {article.category} • {article.date}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.2 }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                  {article.summary}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <IconButton size="small" disabled><FavoriteBorderIcon fontSize="small" />{article.likes}</IconButton>
                  <IconButton size="small" disabled><VisibilityOutlinedIcon fontSize="small" />{article.views}</IconButton>
                  <IconButton size="small" disabled><ChatBubbleOutlineIcon fontSize="small" />{article.comments}</IconButton>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton size="small" disabled><ShareOutlinedIcon fontSize="small" /></IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {filtered.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
          Нет новостей по выбранным фильтрам
        </Typography>
      )}
    </>
  );
} 