import React from 'react';
import { Box, Typography, Paper, Stack, Button, Chip } from '@mui/material';

const DEMO_TOPICS = [
  { title: 'Обсуждение протоколов', replies: 12, last: '2ч назад', tags: ['протоколы'] },
  { title: 'Вопросы по элементам', replies: 7, last: '1ч назад', tags: ['элементы'] },
  { title: 'Новости платформы', replies: 3, last: '30м назад', tags: ['новости'] },
  { title: 'Обратная связь и предложения', replies: 5, last: '10м назад', tags: ['feedback'] },
];

export default function ForumPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Форум ProtoLab</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Здесь вы можете обсуждать протоколы, элементы, делиться опытом, задавать вопросы и предлагать улучшения платформы. В будущем здесь появится полноценная интеграция с Discourse или собственной системой обсуждений.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 3 }}>Создать тему</Button>
      <Stack spacing={2}>
        {DEMO_TOPICS.map(topic => (
          <Paper key={topic.title} sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{topic.title}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                {topic.tags.map(tag => <Chip key={tag} label={tag} size="small" />)}
              </Stack>
            </Box>
            <Typography variant="body2" color="text.secondary">Ответов: {topic.replies}</Typography>
            <Typography variant="caption" color="text.secondary">{topic.last}</Typography>
          </Paper>
        ))}
      </Stack>
      <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
        {/* Здесь будет интеграция с Discourse или собственной системой обсуждений */}
        <Typography variant="caption" color="text.secondary">
          Интеграция с Discourse или WikiJS будет добавлена здесь. Пока вы видите демо-структуру форума.
        </Typography>
      </Box>
    </Box>
  );
} 