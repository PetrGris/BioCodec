import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

const slogan = 'Раскрой код своего здоровья';
const mission = 'Миссия bioCodec — сделать науку о здоровье, биохакинге и персонализированной медицине доступной, понятной и практически применимой для каждого. Мы объединяем знания, аналитику и ИИ, чтобы помочь людям осознанно управлять своим благополучием.';
const concept = 'bioCodec — это современный портал для энтузиастов биохакинга, здоровья и саморазвития. Здесь вы найдёте инструменты для мониторинга состояния, аналитики, библиотеку знаний, ИИ-консультантов и актуальные новости.';

const AboutPage = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #e0f7fa 0%, #f8bbd0 100%)' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
        bioCodec
      </Typography>
      <Typography variant="h5" align="center" color="primary" gutterBottom>
        {slogan}
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        {concept}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Миссия портала</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{mission}</Typography>
    </Paper>

    <Box component={Paper} elevation={1} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Политика обработки персональных данных</Typography>
      <Typography variant="body2" color="text.secondary">Текст политики будет размещён здесь.</Typography>
    </Box>

    <Box component={Paper} elevation={1} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Пользовательское соглашение</Typography>
      <Typography variant="body2" color="text.secondary">Текст пользовательского соглашения будет размещён здесь.</Typography>
    </Box>

    <Box component={Paper} elevation={1} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Реквизиты</Typography>
      <Typography variant="body2" color="text.secondary">Реквизиты компании или проекта будут размещены здесь.</Typography>
    </Box>

    <Box component={Paper} elevation={1} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Контакты для связи</Typography>
      <Typography variant="body2" color="text.secondary">Email, телефон и другие способы связи появятся здесь.</Typography>
    </Box>
  </Container>
);

export default AboutPage; 