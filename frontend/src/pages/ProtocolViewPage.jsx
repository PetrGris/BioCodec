import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Stack, Chip, Avatar, IconButton, Divider, Tabs, Tab, Grid, Tooltip, Badge, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DEMO_PROTOCOLS } from './DashboardPage';

export default function ProtocolViewPage() {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const [starred, setStarred] = useState(false);
  const protocol = DEMO_PROTOCOLS.find(p => String(p.id) === String(id));
  if (!protocol) {
    return <Box sx={{ p: 4 }}><Typography variant="h5">Протокол не найден</Typography></Box>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 900, mr: 2 }}>{protocol.title}</Typography>
              <Tooltip title="Fork"><IconButton color="primary"><ForkRightIcon /></IconButton></Tooltip>
              <Tooltip title={starred ? 'Убрать из избранного' : 'В избранное'}><IconButton color={starred ? 'warning' : 'default'} onClick={() => setStarred(s => !s)}>{starred ? <StarIcon /> : <StarBorderIcon />}</IconButton></Tooltip>
              <Tooltip title="Edit"><IconButton color="default"><EditIcon /></IconButton></Tooltip>
              <Tooltip title="Delete"><IconButton color="error"><DeleteIcon /></IconButton></Tooltip>
              <Tooltip title="Share"><IconButton color="default"><ShareIcon /></IconButton></Tooltip>
            </Box>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>{protocol.description}</Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              {protocol.tags.map(tag => <Chip key={tag} label={tag} size="small" color="primary" />)}
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <Avatar src={protocol.author.avatar} sx={{ width: 32, height: 32 }} />
              <Typography variant="body2">{protocol.author.name}</Typography>
              <Typography variant="body2" color="text.secondary">Обновлено: {protocol.updated || ''}</Typography>
              <Badge badgeContent={protocol.forks || 0} color="secondary" max={99} sx={{ ml: 2 }}><ForkRightIcon fontSize="small" /></Badge>
              <Badge badgeContent={protocol.stars || 0} color="warning" max={99} sx={{ ml: 1 }}><StarIcon fontSize="small" /></Badge>
              <Badge badgeContent={protocol.views || 0} color="info" max={999} sx={{ ml: 1 }}><VisibilityIcon fontSize="small" /></Badge>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
              <Tab label="Описание" />
              <Tab label="Шаги" />
              <Tab label="Обсуждение" />
              <Tab label="История" />
            </Tabs>
            {tab === 0 && (
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Этот протокол предназначен для улучшения качества сна. Следуйте шагам ниже и адаптируйте под себя.
                </Typography>
              </Box>
            )}
            {tab === 1 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>Шаги протокола:</Typography>
                <Stack spacing={1}>
                  {protocol.steps.map((step, idx) => (
                    <Paper key={idx} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <span style={{ fontSize: 24 }}>{step.icon}</span>
                      <Typography>{step.text}</Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            )}
            {tab === 2 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>Обсуждение</Typography>
                <Paper sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                  {/* Здесь будет интеграция с Discourse или собственной системой обсуждений */}
                  <Typography variant="subtitle2" color="text.secondary">Комментарии и обсуждение протокола появятся здесь.</Typography>
                </Paper>
              </Box>
            )}
            {tab === 3 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>История изменений</Typography>
                <Stack spacing={1}>
                  {protocol.history.map((h, idx) => (
                    <Paper key={idx} sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 90 }}>{h.date}</Typography>
                      <Typography variant="body2">{h.action}</Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1, mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Рейтинг</Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 900 }}>{protocol.rating || '-'} / 5</Typography>
              <Button variant="outlined" color="primary" sx={{ mt: 1, width: '100%' }}>Оценить</Button>
            </Paper>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1, mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Автор</Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                <Avatar src={protocol.author.avatar} sx={{ width: 32, height: 32 }} />
                <Typography>{protocol.author.name}</Typography>
              </Stack>
            </Paper>
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">Теги</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                {protocol.tags.map(tag => <Chip key={tag} label={tag} size="small" color="primary" />)}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
} 