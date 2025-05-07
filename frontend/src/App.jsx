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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExtensionIcon from '@mui/icons-material/Extension';
import ForumIcon from '@mui/icons-material/Forum';
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
import CreateProtocolPage from './pages/CreateProtocolPage';
import ElementListPage from './pages/domains/ElementListPage';
import AllElementsPage from './pages/domains/AllElementsPage';
import ELEMENTS_LIBRARY, { RU_TO_EN } from './data/elementsLibrary';
import RatingPage from './pages/RatingPage';
import ForumPage from './pages/ForumPage';
import ProtocolViewPage from './pages/ProtocolViewPage';

const PROFILE_MENU = [
  { icon: <ContentCopyIcon sx={{ color: '#673ab7' }} />, label: 'Мои протоколы', path: '/dashboard' },
];

// Формируем список доменов из ELEMENTS_LIBRARY
const ELEMENTS_DOMAINS = Object.keys(ELEMENTS_LIBRARY).map(cat => ({
  label: cat,
  icon: ELEMENTS_LIBRARY[cat][0]?.icon || '📦',
  path: `/element/${RU_TO_EN[cat]}`,
}));

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
      <ListSubheader>Элементы протокола</ListSubheader>
      {ELEMENTS_DOMAINS.map((item, i) => (
        <ListItem button key={i} component={Link} to={item.path} sx={{ borderRadius: 2, mb: 1, pl: 4, px: 2, bgcolor: location.pathname === item.path ? '#e3f2fd' : 'transparent', fontWeight: location.pathname === item.path ? 700 : 400 }}>
          <ListItemIcon><span style={{ fontSize: 20 }}>{item.icon}</span></ListItemIcon>
          <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 15 }} />
        </ListItem>
      ))}
      <ListItem button component={Link} to={'/elements'} sx={{ borderRadius: 2, mt: 1, px: 2, bgcolor: location.pathname === '/elements' ? '#e3f2fd' : 'transparent', fontWeight: location.pathname === '/elements' ? 700 : 400 }}>
        <ListItemIcon><ExtensionIcon sx={{ color: '#673ab7' }} /></ListItemIcon>
        <ListItemText primary={'Все элементы'} primaryTypographyProps={{ fontSize: 16 }} />
      </ListItem>
      <ListItem button component={Link} to={'/forum'} sx={{ borderRadius: 2, mt: 1, px: 2, bgcolor: location.pathname === '/forum' ? '#e3f2fd' : 'transparent', fontWeight: location.pathname === '/forum' ? 700 : 400 }}>
        <ListItemIcon><ForumIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
        <ListItemText primary={'Форум'} primaryTypographyProps={{ fontSize: 16 }} />
      </ListItem>
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
            ProtoLab
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#1976d2', fontWeight: 700, mr: 3 }}>
            Платформа для создания и обмена протоколами
          </Typography>
          <Button color="success" variant="contained" sx={{ borderRadius: 3, fontWeight: 700, mr: 1 }} component={Link} to="/library">Библиотека</Button>
          <Button color="primary" variant="outlined" sx={{ borderRadius: 3, fontWeight: 700, mr: 1 }}>Приложение</Button>
          <Button color="secondary" variant="outlined" sx={{ borderRadius: 3, fontWeight: 700, mr: 1 }}>Сообщество</Button>
          <Button color="info" variant="outlined" sx={{ borderRadius: 3, fontWeight: 700, mr: 1 }} component={Link} to="/rating">Рейтинг</Button>
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
                <Route path="/protocol/create" element={<CreateProtocolPage />} />
                <Route path="/correlation" element={<CorrelationPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/consultant/biohacking" element={<BiohackingCoachPage />} />
                <Route path="/consultant/nutrition" element={<NutritionConsultantPage />} />
                <Route path="/consultant/sport" element={<SportConsultantPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/element/:category" element={<ElementListPage />} />
                <Route path="/elements" element={<AllElementsPage />} />
                <Route path="/rating" element={<RatingPage />} />
                <Route path="/forum" element={<ForumPage />} />
                <Route path="/protocol/:id" element={<ProtocolViewPage />} />
                <Route path="*" element={<NewsPage />} />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Router>
  );
}
