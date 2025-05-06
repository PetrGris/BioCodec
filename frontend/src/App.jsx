import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Avatar, Stack, Grid, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Collapse } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalculateIcon from '@mui/icons-material/Calculate';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SearchIcon from '@mui/icons-material/Search';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SleepPage from './pages/domains/SleepPage';
import NutritionPage from './pages/domains/NutritionPage';
import StressPage from './pages/domains/StressPage';
import LongevityPage from './pages/domains/LongevityPage';
import CognitionPage from './pages/domains/CognitionPage';
import ActivityPage from './pages/domains/ActivityPage';
import GeneticsPage from './pages/domains/GeneticsPage';
import NewsPage from './pages/NewsPage';
import DashboardPage from './pages/DashboardPage';
import LibraryPage from './pages/LibraryPage';
import AIConsultantsPage from './pages/AIConsultantsPage';
import BiohackingCoachPage from './pages/consultant/BiohackingCoachPage';
import NutritionConsultantPage from './pages/consultant/NutritionConsultantPage';
import SportConsultantPage from './pages/consultant/SportConsultantPage';
import CorrelationPage from './pages/profile/CorrelationPage';
import ReportsPage from './pages/profile/ReportsPage';
import AboutPage from './pages/AboutPage';

const PROFILE_MENU = [
  { icon: <AssessmentIcon sx={{ color: '#673ab7' }} />, label: 'Панель мониторинга', path: '/dashboard' },
  { icon: <AssessmentIcon sx={{ color: '#1976d2' }} />, label: 'Корреляции', path: '/correlation' },
  { icon: <AssessmentIcon sx={{ color: '#43a047' }} />, label: 'Отчёты', path: '/reports' },
];

const DOMAIN_MENU = [
  { icon: <span style={{ fontSize: 22 }}>😴</span>, label: 'Сон', path: '/domain/sleep' },
  { icon: <span style={{ fontSize: 22 }}>🥗</span>, label: 'Питание', path: '/domain/nutrition' },
  { icon: <span style={{ fontSize: 22 }}>🧘‍♂️</span>, label: 'Стресс и recovery', path: '/domain/stress' },
  { icon: <span style={{ fontSize: 22 }}>🧬</span>, label: 'Долголетие', path: '/domain/longevity' },
  { icon: <span style={{ fontSize: 22 }}>🧠</span>, label: 'Когнитивные функции', path: '/domain/cognition' },
  { icon: <span style={{ fontSize: 22 }}>🏃‍♂️</span>, label: 'Физическая активность', path: '/domain/activity' },
  { icon: <span style={{ fontSize: 22 }}>🧬</span>, label: 'Генетика и эпигенетика', path: '/domain/genetics' },
];

function LeftMenu() {
  const location = useLocation();
  return (
    <List sx={{ position: 'sticky', top: 80 }}>
      <ListSubheader>Новости</ListSubheader>
      <ListItem button component={Link} to={'/news'} sx={{ borderRadius: 2, mb: 1, px: 2, bgcolor: location.pathname === '/news' ? '#e3f2fd' : 'transparent', fontWeight: location.pathname === '/news' ? 700 : 400 }}>
        <ListItemIcon><CalculateIcon sx={{ color: '#2196f3' }} /></ListItemIcon>
        <ListItemText primary={'Новости'} primaryTypographyProps={{ fontSize: 16 }} />
      </ListItem>
      <ListSubheader>Личный кабинет</ListSubheader>
      {PROFILE_MENU.map((item, i) => (
        <ListItem button key={i} component={Link} to={item.path} sx={{ borderRadius: 2, mb: 1, pl: 4, px: 2, bgcolor: location.pathname === item.path ? '#e3f2fd' : 'transparent', fontWeight: location.pathname === item.path ? 700 : 400 }}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 15 }} />
        </ListItem>
      ))}
      <ListSubheader>Домены</ListSubheader>
      {DOMAIN_MENU.map((item, i) => (
        <ListItem button key={i} component={Link} to={item.path} sx={{ borderRadius: 2, mb: 1, pl: 4, px: 2, bgcolor: location.pathname === item.path ? '#e3f2fd' : 'transparent', fontWeight: location.pathname === item.path ? 700 : 400 }}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 15 }} />
        </ListItem>
      ))}
      <ListSubheader>ИИ-консультанты</ListSubheader>
      <ListItem button component={Link} to={'/consultant/biohacking'} sx={{ borderRadius: 2, mb: 1, px: 2, bgcolor: location.pathname === '/consultant/biohacking' ? '#e3f2fd' : 'transparent', fontWeight: location.pathname === '/consultant/biohacking' ? 700 : 400 }}>
        <ListItemIcon><PsychologyIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
        <ListItemText primary={'Коуч по биохакингу'} primaryTypographyProps={{ fontSize: 16 }} />
      </ListItem>
      <ListItem button component={Link} to={'/consultant/nutrition'} sx={{ borderRadius: 2, mb: 1, px: 2, bgcolor: location.pathname === '/consultant/nutrition' ? '#e3f2fd' : 'transparent', fontWeight: location.pathname === '/consultant/nutrition' ? 700 : 400 }}>
        <ListItemIcon><RestaurantIcon sx={{ color: '#43a047' }} /></ListItemIcon>
        <ListItemText primary={'ИИ-нутрициолог'} primaryTypographyProps={{ fontSize: 16 }} />
      </ListItem>
      <ListItem button component={Link} to={'/consultant/sport'} sx={{ borderRadius: 2, mb: 1, px: 2, bgcolor: location.pathname === '/consultant/sport' ? '#e3f2fd' : 'transparent', fontWeight: location.pathname === '/consultant/sport' ? 700 : 400 }}>
        <ListItemIcon><FitnessCenterIcon sx={{ color: '#e91e63' }} /></ListItemIcon>
        <ListItemText primary={'Консультант по спорту'} primaryTypographyProps={{ fontSize: 16 }} />
      </ListItem>
      <ListSubheader>Библиотека</ListSubheader>
      <ListItem button component={Link} to={'/library'} sx={{ borderRadius: 2, mb: 1, px: 2, bgcolor: location.pathname === '/library' ? '#e3f2fd' : 'transparent', fontWeight: location.pathname === '/library' ? 700 : 400 }}>
        <ListItemIcon><MenuBookIcon sx={{ color: '#43a047' }} /></ListItemIcon>
        <ListItemText primary={'Библиотека'} primaryTypographyProps={{ fontSize: 16 }} />
      </ListItem>
      <ListSubheader>О портале</ListSubheader>
      <ListItem button component={Link} to={'/about'} sx={{ borderRadius: 2, mb: 1, px: 2, bgcolor: location.pathname === '/about' ? '#e3f2fd' : 'transparent', fontWeight: location.pathname === '/about' ? 700 : 400 }}>
        <ListItemIcon><LocalHospitalIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
        <ListItemText primary={'О портале'} primaryTypographyProps={{ fontSize: 16 }} />
      </ListItem>
    </List>
  );
}

export default function App() {
  return (
    <Router>
      {/* Верхний бар */}
      <AppBar position="sticky" color="inherit" elevation={1} sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: 2, color: '#111', mr: 2 }}>
            bioCodec
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#1976d2', fontWeight: 700, mr: 3 }}>
            Раскрой код своего здоровья
          </Typography>
          <Button color="success" variant="contained" sx={{ borderRadius: 3, fontWeight: 700, mr: 1 }}>Учебник</Button>
          <Button color="primary" variant="outlined" sx={{ borderRadius: 3, fontWeight: 700, mr: 1 }}>Приложение</Button>
          <Button color="secondary" variant="outlined" sx={{ borderRadius: 3, fontWeight: 700, mr: 1 }}>Сообщество</Button>
          <Button color="info" variant="outlined" sx={{ borderRadius: 3, fontWeight: 700, mr: 1 }}>Аптечка</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" sx={{ width: 32, height: 32 }} />
            <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" sx={{ width: 32, height: 32 }} />
            <Avatar src="https://randomuser.me/api/portraits/men/45.jpg" sx={{ width: 32, height: 32 }} />
          </Box>
          <IconButton color="default" sx={{ ml: 2 }}><SearchIcon /></IconButton>
          <Button variant="contained" color="primary" sx={{ borderRadius: 3, fontWeight: 700, ml: 2 }}>Написать</Button>
          <IconButton color="default" sx={{ ml: 1 }}><Avatar sx={{ width: 32, height: 32 }} /></IconButton>
        </Toolbar>
      </AppBar>
      {/* Основная сетка */}
      <Box sx={{ display: 'flex', bgcolor: '#f7f7fa', minHeight: '100vh' }}>
        {/* Левое меню */}
        <Box sx={{ width: 220, bgcolor: '#fff', borderRight: '1px solid #eee', py: 3, display: { xs: 'none', md: 'block' }, minHeight: '100vh' }}>
          <LeftMenu />
        </Box>
        {/* Центр */}
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          <Grid container spacing={4}>
            {/* Центр */}
            <Grid item xs={12} md={8}>
              <Routes>
                <Route path="/news" element={<NewsPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/correlation" element={<CorrelationPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/consultant/biohacking" element={<BiohackingCoachPage />} />
                <Route path="/consultant/nutrition" element={<NutritionConsultantPage />} />
                <Route path="/consultant/sport" element={<SportConsultantPage />} />
                {/* Динамические роуты для доменов */}
                <Route path="/domain/sleep" element={<SleepPage />} />
                <Route path="/domain/nutrition" element={<NutritionPage />} />
                <Route path="/domain/stress" element={<StressPage />} />
                <Route path="/domain/longevity" element={<LongevityPage />} />
                <Route path="/domain/cognition" element={<CognitionPage />} />
                <Route path="/domain/activity" element={<ActivityPage />} />
                <Route path="/domain/genetics" element={<GeneticsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NewsPage />} />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Router>
  );
}
