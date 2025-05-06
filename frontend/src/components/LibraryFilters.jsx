import React, { useMemo } from 'react';
import { Box, TextField, MenuItem, Chip, Stack, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TYPES = [
  { value: '', label: 'Все типы' },
  { value: 'книга', label: 'Книги' },
  { value: 'курс', label: 'Курсы' },
  { value: 'приложение', label: 'Приложения' },
  { value: 'протокол', label: 'Протоколы' },
];

const TAGS = [
  'биохакинг', 'здоровье', 'образование', 'курс', 'старт', 'сон', 'протокол', 'анализы',
  'трекер', 'книга', 'наука', 'диагностика', 'питание', 'энергия', 'будильник', 'долголетие', 'мозг', 'продуктивность'
];

export default function LibraryFilters({ filters, setFilters }) {
  // Для быстрого поиска по тегам
  const tagOptions = useMemo(() => TAGS, []);

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
      <TextField
        select
        label="Тип"
        value={filters.type}
        onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
        size="small"
        sx={{ minWidth: 140 }}
      >
        {TYPES.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Тег"
        value={filters.tag}
        onChange={e => setFilters(f => ({ ...f, tag: e.target.value }))}
        size="small"
        select
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="">Все теги</MenuItem>
        {tagOptions.map(tag => (
          <MenuItem key={tag} value={tag}>{tag}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Поиск"
        value={filters.q}
        onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
        size="small"
        sx={{ minWidth: 220 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {filters.tag && (
        <Stack direction="row" spacing={1}>
          <Chip label={filters.tag} onDelete={() => setFilters(f => ({ ...f, tag: '' }))} color="primary" />
        </Stack>
      )}
    </Box>
  );
} 