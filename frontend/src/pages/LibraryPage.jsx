import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LibrarySection from '../components/LibrarySection';
import LibraryFilters from '../components/LibraryFilters';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const fallbackData = [
  {
    id: 1,
    title: "Тестовая книга",
    description: "Описание тестовой книги",
    type: "книга",
    icon: "📖",
    cover_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    link: "https://example.com/book",
    tags: ["тест", "книга"],
    author: "Тест Автор",
    rating: 4.5
  },
  {
    id: 2,
    title: "Тестовый курс",
    description: "Описание тестового курса",
    type: "курс",
    icon: "🎓",
    cover_url: "https://images.unsplash.com/photo-1503676382389-4809596d5290",
    link: "https://example.com/course",
    tags: ["тест", "курс"],
    author: "Тест Академия",
    rating: 4.7
  },
  {
    id: 3,
    title: "Тестовое приложение",
    description: "Описание тестового приложения",
    type: "приложение",
    icon: "💉",
    cover_url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    link: "https://example.com/app",
    tags: ["тест", "приложение"],
    author: "Тест Команда",
    rating: 4.2
  },
  {
    id: 4,
    title: "Тестовый протокол",
    description: "Описание тестового протокола",
    type: "протокол",
    icon: "😴",
    cover_url: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    link: "https://example.com/protocol",
    tags: ["тест", "протокол"],
    author: "Тест Лаб",
    rating: 4.8
  }
];

const TYPE_LABELS = {
  "книга": "Книги",
  "курс": "Курсы",
  "приложение": "Приложения",
  "протокол": "Протоколы"
};

export default function LibraryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: '', tag: '', q: '' });
  const [error, setError] = useState(null);
  const [raw, setRaw] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setRaw(null);
    const url = '/library';
    const params = { ...filters, type: filters.type || undefined, tag: filters.tag || undefined, q: filters.q || undefined };
    axios
      .get(url, { params })
      .then(res => {
        setRaw(res.data);
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          setError('Ошибка: backend вернул не массив. Тип: ' + typeof res.data);
          setItems(fallbackData);
        }
      })
      .catch(e => {
        setError('Ошибка загрузки данных: ' + e.message + ' (показаны тестовые данные)');
        setItems(fallbackData);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  // Группировка по типу
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        📚 Библиотека
      </Typography>
      <LibraryFilters filters={filters} setFilters={setFilters} />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 4 }}>{error}
          <Box sx={{ mt: 2, fontSize: 12, color: 'gray', wordBreak: 'break-all' }}>
            <b>Сырые данные backend:</b>
            <pre>{JSON.stringify(raw, null, 2)}</pre>
          </Box>
        </Alert>
      ) : items.length === 0 ? (
        <Alert severity="info" sx={{ mt: 4 }}>Нет материалов по выбранным фильтрам.</Alert>
      ) : (
        Object.entries(TYPE_LABELS).map(([type, label]) => (
          <LibrarySection key={type} title={label} items={grouped[type] || []} />
        ))
      )}
    </Box>
  );
} 