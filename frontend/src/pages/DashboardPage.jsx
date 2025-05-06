import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { Box, Button, Typography, TextField, Grid, Tabs, Tab, Paper, Avatar } from '@mui/material';

const initialProfile = null;

const paramTabs = [
  { label: 'Антропометрия', key: 'anthro' },
  { label: 'Самочувствие', key: 'wellbeing' },
  { label: 'Питание', key: 'nutrition' },
  { label: 'Добавки', key: 'supplements' },
  { label: 'Активность', key: 'activity' },
  { label: 'Сон', key: 'sleep' },
  { label: 'Стресс', key: 'stress' },
  { label: 'Когнитивные тесты', key: 'cognitive' },
];

export default function DashboardPage() {
  const [profile, setProfile] = useState(initialProfile);
  const [tab, setTab] = useState(0);
  // Пример состояния для ручного ввода
  const [anthro, setAnthro] = useState({ height: '', weight: '', waist: '' });

  // Google OAuth callback (заглушка)
  const handleGoogleSuccess = (credentialResponse) => {
    // Здесь будет запрос на backend для валидации токена и получения профиля
    setProfile({ name: 'Иван Иванов', email: 'ivan@example.com', picture: 'https://randomuser.me/api/portraits/men/32.jpg', provider: 'google' });
  };
  const handleGoogleError = () => alert('Ошибка авторизации Google');

  // Яндекс OAuth (заглушка)
  const handleYandexLogin = () => {
    window.location.href = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=YANDEX_CLIENT_ID';
  };

  const handleLogout = () => setProfile(null);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Личный кабинет</Typography>
      {!profile ? (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Войдите через соцсети:</Typography>
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} useOneTap={false} />
          <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handleYandexLogin}>Войти через Яндекс</Button>
        </Box>
      ) : (
        <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={profile.picture} alt={profile.name} />
          <Box>
            <Typography variant="subtitle1">{profile.name}</Typography>
            <Typography variant="body2" color="text.secondary">{profile.email}</Typography>
            <Typography variant="caption">Провайдер: {profile.provider}</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="error" onClick={handleLogout}>Выйти</Button>
        </Paper>
      )}
      {profile && (
        <>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
            {paramTabs.map((t, i) => <Tab key={t.key} label={t.label} />)}
          </Tabs>
          {tab === 0 && (
            <Box component="form" sx={{ maxWidth: 400 }}>
              <Typography variant="h6">Антропометрические данные</Typography>
              <TextField label="Рост (см)" fullWidth sx={{ my: 1 }} value={anthro.height} onChange={e => setAnthro({ ...anthro, height: e.target.value })} />
              <TextField label="Вес (кг)" fullWidth sx={{ my: 1 }} value={anthro.weight} onChange={e => setAnthro({ ...anthro, weight: e.target.value })} />
              <TextField label="Обхват талии (см)" fullWidth sx={{ my: 1 }} value={anthro.waist} onChange={e => setAnthro({ ...anthro, waist: e.target.value })} />
              <Button variant="contained" sx={{ mt: 2 }}>Сохранить</Button>
            </Box>
          )}
          {tab === 1 && (
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h6">Самочувствие</Typography>
              <TextField label="Энергия (1-10)" fullWidth sx={{ my: 1 }} />
              <TextField label="Настроение (1-10)" fullWidth sx={{ my: 1 }} />
              <TextField label="Концентрация (1-10)" fullWidth sx={{ my: 1 }} />
              <Button variant="contained" sx={{ mt: 2 }}>Сохранить</Button>
            </Box>
          )}
          {tab === 2 && (
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h6">Питание</Typography>
              <TextField label="Калорийность (ккал)" fullWidth sx={{ my: 1 }} />
              <TextField label="Белки (г)" fullWidth sx={{ my: 1 }} />
              <TextField label="Жиры (г)" fullWidth sx={{ my: 1 }} />
              <TextField label="Углеводы (г)" fullWidth sx={{ my: 1 }} />
              <Button variant="contained" sx={{ mt: 2 }}>Сохранить</Button>
            </Box>
          )}
          {tab === 3 && (
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h6">Добавки и лекарства</Typography>
              <TextField label="Название" fullWidth sx={{ my: 1 }} />
              <TextField label="Дозировка" fullWidth sx={{ my: 1 }} />
              <TextField label="Время приёма" fullWidth sx={{ my: 1 }} />
              <Button variant="contained" sx={{ mt: 2 }}>Сохранить</Button>
            </Box>
          )}
          {tab === 4 && (
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h6">Физическая активность</Typography>
              <TextField label="Тип" fullWidth sx={{ my: 1 }} />
              <TextField label="Продолжительность (мин)" fullWidth sx={{ my: 1 }} />
              <TextField label="Интенсивность (1-10)" fullWidth sx={{ my: 1 }} />
              <Button variant="contained" sx={{ mt: 2 }}>Сохранить</Button>
            </Box>
          )}
          {tab === 5 && (
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h6">Сон</Typography>
              <TextField label="Продолжительность (ч)" fullWidth sx={{ my: 1 }} />
              <TextField label="Качество (1-10)" fullWidth sx={{ my: 1 }} />
              <TextField label="Фазы сна (REM, глубокий и т.д.)" fullWidth sx={{ my: 1 }} />
              <Button variant="contained" sx={{ mt: 2 }}>Сохранить</Button>
            </Box>
          )}
          {tab === 6 && (
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h6">Стресс и психоэмоциональное состояние</Typography>
              <TextField label="Стресс (1-10)" fullWidth sx={{ my: 1 }} />
              <TextField label="Комментарий" fullWidth sx={{ my: 1 }} />
              <Button variant="contained" sx={{ mt: 2 }}>Сохранить</Button>
            </Box>
          )}
          {tab === 7 && (
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h6">Когнитивная производительность</Typography>
              <TextField label="Память (тест)" fullWidth sx={{ my: 1 }} />
              <TextField label="Внимание (тест)" fullWidth sx={{ my: 1 }} />
              <TextField label="Скорость реакции (мс)" fullWidth sx={{ my: 1 }} />
              <Button variant="contained" sx={{ mt: 2 }}>Сохранить</Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
} 