import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, Stack, Chip, Divider, TextField, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import ELEMENTS_LIBRARY, { EN_TO_RU } from '../../data/elementsLibrary';

const ALL_CATEGORIES = Object.entries(EN_TO_RU);

export default function AllElementsPage() {
  const [search, setSearch] = useState('');
  const [selectedCats, setSelectedCats] = useState([]); // en-идентификаторы

  // Собираем все элементы в один массив с категорией
  const allElements = useMemo(() => {
    return Object.entries(EN_TO_RU).flatMap(([en, ru]) =>
      (ELEMENTS_LIBRARY[ru] || []).map(el => ({ ...el, categoryEn: en, categoryRu: ru }))
    );
  }, []);

  // Фильтрация
  const filtered = useMemo(() => {
    return allElements.filter(el => {
      // Фильтр по категориям
      if (selectedCats.length > 0 && !selectedCats.includes(el.categoryEn)) return false;
      // Фильтр по поиску
      const q = search.toLowerCase();
      return (
        el.title.toLowerCase().includes(q) ||
        el.description.toLowerCase().includes(q) ||
        el.type.toLowerCase().includes(q) ||
        el.recommendations.toLowerCase().includes(q) ||
        el.risks.toLowerCase().includes(q)
      );
    });
  }, [allElements, search, selectedCats]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Все элементы протокола</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField label="Поиск" value={search} onChange={e => setSearch(e.target.value)} sx={{ minWidth: 220 }} />
        <FormGroup row>
          {ALL_CATEGORIES.map(([en, ru]) => (
            <FormControlLabel
              key={en}
              control={<Checkbox checked={selectedCats.includes(en)} onChange={e => {
                setSelectedCats(val => e.target.checked ? [...val, en] : val.filter(x => x !== en));
              }} />}
              label={ru}
            />
          ))}
        </FormGroup>
      </Stack>
      <Stack spacing={3}>
        {filtered.length === 0 && <Typography color="text.secondary">Нет элементов по заданным условиям.</Typography>}
        {filtered.map(el => (
          <Paper key={el.id} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mr: 2 }}>{el.icon} {el.title}</Typography>
              <Chip label={el.type} size="small" sx={{ ml: 1 }} />
              <Chip label={el.categoryRu} size="small" sx={{ ml: 1 }} />
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
    </Box>
  );
} 