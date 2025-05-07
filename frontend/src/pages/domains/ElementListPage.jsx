import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Stack, Chip, Divider } from '@mui/material';
import ELEMENTS_LIBRARY, { EN_TO_RU } from '../../data/elementsLibrary';

// Соответствие русских и английских названий категорий
const CATEGORY_EN_NAMES = {
  'Сон': 'Sleep',
  'Питание': 'Nutrition',
  'Стресс и recovery': 'Stress & Recovery',
  'Долголетие': 'Longevity',
  'Когнитивные функции': 'Cognition',
  'Физическая активность': 'Physical Activity',
};

export default function ElementListPage() {
  const { category } = useParams();
  // Получаем русское название категории по английскому идентификатору
  const ruCategory = EN_TO_RU[category];
  const elements = ruCategory ? ELEMENTS_LIBRARY[ruCategory] : [];

  // Меняем title страницы на английское название категории
  useEffect(() => {
    if (category) {
      document.title = category.charAt(0).toUpperCase() + category.slice(1);
    } else {
      document.title = 'Protocol Elements';
    }
    return () => { document.title = 'bioCodec'; };
  }, [category]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>{ruCategory || 'Not found'}</Typography>
      <Stack spacing={3}>
        {(!ruCategory || elements.length === 0) && <Typography color="text.secondary">Нет элементов для этой категории.</Typography>}
        {elements.map(el => (
          <Paper key={el.id} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mr: 2 }}>{el.icon} {el.title}</Typography>
              <Chip label={el.type} size="small" sx={{ ml: 1 }} />
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>{el.description}</Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Chip label={el.recommendations} size="small" />
              <Chip label={el.risks} size="small" color="warning" />
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Typography variant="caption" color="primary">
              {el.sources && el.sources.map((s, i) => <a key={i} href={s} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>[источник]</a>)}
            </Typography>
          </Paper>
        ))}
      </Stack>
      <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        {/* Здесь будет интеграция с Discourse или собственной системой обсуждений для каждого элемента */}
        <Typography variant="subtitle2" color="text.secondary">Комментарии и обсуждение элементов появятся здесь.</Typography>
      </Box>
    </Box>
  );
} 