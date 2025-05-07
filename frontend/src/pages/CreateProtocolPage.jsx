import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Chip, Paper, Divider, Checkbox, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ELEMENTS_LIBRARY_ORIGINAL from '../data/elementsLibrary';

// Популярные эмодзи для выбора иконки
const EMOJI_SET = [
  '🧘‍♂️', '📵', '💊', '🥗', '⏰', '🌬️', '📝', '🏃‍♂️', '🌞', '🧠', '📚', '🚶‍♂️', '🏋️‍♂️',
  '😴', '☀️', '🥦', '🚫', '🍬', '🍷', '💧', '🤸', '🚿', '🍳', '🥗', '🚶', '🧬', '🧘', '🧑‍🔬', '🦾', '🦿', '🦵', '🦶', '🫀', '🫁', '🧬', '🧪', '🩺', '🏥', '🏋️', '🏊', '🚴', '🤸‍♂️', '🧗', '⛹️', '🤾', '🏄', '🧖', '🛌', '🛀', '🧴', '🦷', '🦴', '🧂', '🥛', '🍎', '🍋', '🍌', '🍇', '🍉', '🍒', '🍑', '🍍', '🥑', '🥒', '🥕', '🌽', '🍅', '🥔', '🍠', '🥜', '🌰', '🍞', '🥨', '🥯', '🥐', '🍗', '🥩', '🍖', '🍤', '🍣', '🍱', '🍲', '🥣', '🥗', '🍿', '🍫', '🍬', '🍭', '🍮', '🍯', '🍼', '🥤', '☕', '🍵', '🥛', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🍾', '🥄', '🍴', '🍽️', '🥢', '🧂'
];

export default function CreateProtocolPage() {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [selected, setSelected] = useState([]);
  const [elementsLibrary, setElementsLibrary] = useState(() => JSON.parse(JSON.stringify(ELEMENTS_LIBRARY_ORIGINAL)));

  // Состояния для пользовательского элемента
  const [custom, setCustom] = useState({
    icon: '',
    title: '',
    description: '',
    category: Object.keys(elementsLibrary)[0] || '',
    sources: '',
    type: '',
    recommendations: '',
    risks: '',
  });

  const navigate = useNavigate();

  const handleToggle = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSave = () => {
    alert('Протокол создан! (демо)');
    navigate('/dashboard');
  };

  // Добавление пользовательского элемента
  const handleAddCustom = () => {
    if (!custom.title || !custom.icon || !custom.category) return;
    const newId = 'custom_' + Date.now();
    const newEl = {
      id: newId,
      icon: custom.icon,
      title: custom.title,
      description: custom.description,
      sources: custom.sources ? custom.sources.split(',').map(s => s.trim()) : [],
      type: custom.type,
      recommendations: custom.recommendations,
      risks: custom.risks,
    };
    setElementsLibrary(prev => ({
      ...prev,
      [custom.category]: [...(prev[custom.category] || []), newEl],
    }));
    setSelected(prev => [...prev, newId]);
    setCustom({ ...custom, icon: '', title: '', description: '', sources: '', type: '', recommendations: '', risks: '' });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Создать протокол</Typography>
      <Stack spacing={2} sx={{ maxWidth: 600 }}>
        <TextField label="Название протокола" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
        <TextField label="Цель протокола" value={goal} onChange={e => setGoal(e.target.value)} fullWidth />
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ mb: 1 }}>Выберите элементы протокола:</Typography>
        {Object.entries(elementsLibrary).map(([cat, items]) => (
          <Box key={cat} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{cat}</Typography>
            <Stack spacing={1}>
              {items.map(el => (
                <Paper key={el.id} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Checkbox checked={selected.includes(el.id)} onChange={() => handleToggle(el.id)} />
                  <span style={{ fontSize: 28 }}>{el.icon}</span>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{el.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{el.description}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                      <Chip label={el.type} size="small" />
                      <Chip label={el.recommendations} size="small" />
                      <Chip label={el.risks} size="small" color="warning" />
                    </Stack>
                    <Typography variant="caption" color="primary">{el.sources.map((s, i) => <a key={i} href={s} target="_blank" rel="noopener noreferrer">[источник]</a>)}</Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
        ))}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Добавить свой элемент</Typography>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Выберите иконку:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {EMOJI_SET.map(emoji => (
              <Button
                key={emoji}
                variant={custom.icon === emoji ? 'contained' : 'outlined'}
                color={custom.icon === emoji ? 'secondary' : 'inherit'}
                sx={{ minWidth: 40, minHeight: 40, fontSize: 24, p: 0.5 }}
                onClick={() => setCustom({ ...custom, icon: emoji })}
              >
                {emoji}
              </Button>
            ))}
          </Box>
        </Box>
        <Select value={custom.category} onChange={e => setCustom({ ...custom, category: e.target.value })} sx={{ minWidth: 160 }}>
          {Object.keys(elementsLibrary).map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
          <MenuItem value="Другое">Другое</MenuItem>
        </Select>
        <TextField label="Название" value={custom.title} onChange={e => setCustom({ ...custom, title: e.target.value })} fullWidth />
        <TextField label="Описание" value={custom.description} onChange={e => setCustom({ ...custom, description: e.target.value })} fullWidth />
        <TextField label="Ссылки (через запятую)" value={custom.sources} onChange={e => setCustom({ ...custom, sources: e.target.value })} fullWidth />
        <TextField label="Тип" value={custom.type} onChange={e => setCustom({ ...custom, type: e.target.value })} fullWidth />
        <TextField label="Рекомендации" value={custom.recommendations} onChange={e => setCustom({ ...custom, recommendations: e.target.value })} fullWidth />
        <TextField label="Риски" value={custom.risks} onChange={e => setCustom({ ...custom, risks: e.target.value })} fullWidth />
        <Button variant="outlined" color="secondary" onClick={handleAddCustom} disabled={!custom.icon || !custom.title || !custom.category}>Добавить элемент</Button>
        <Button variant="contained" color="success" onClick={handleSave} disabled={!title || !goal || selected.length === 0}>
          Сохранить протокол
        </Button>
      </Stack>
    </Box>
  );
} 