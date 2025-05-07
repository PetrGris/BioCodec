// Библиотека элементов протокола по категориям
const ELEMENTS_LIBRARY = {
  'Сон': [
    { id: 'sleep1', icon: '🧘‍♂️', title: 'Медитация перед сном', description: '10 минут медитации для расслабления и улучшения засыпания.', sources: ['https://pubmed.ncbi.nlm.nih.gov/'], type: 'привычка', recommendations: 'Перед сном, ежедневно', risks: 'Нет' },
    { id: 'sleep2', icon: '📵', title: 'Ограничение синего света', description: 'Не использовать экраны за 2 часа до сна.', sources: ['https://www.sleepfoundation.org/'], type: 'привычка', recommendations: 'Вечером', risks: 'Нет' },
    { id: 'sleep3', icon: '💊', title: 'Приём мелатонина', description: 'Мелатонин для коррекции ритмов (по показаниям).', sources: ['https://pubmed.ncbi.nlm.nih.gov/'], type: 'добавка', recommendations: 'По назначению врача', risks: 'Индивидуальная непереносимость' },
  ],
  'Питание': [
    { id: 'food1', icon: '🥗', title: 'Добавление овощей', description: 'В каждом приёме пищи — овощи.', sources: ['https://www.who.int/'], type: 'привычка', recommendations: 'Каждый приём пищи', risks: 'Нет' },
    { id: 'food2', icon: '⏰', title: 'Интервальное голодание 16/8', description: 'Питание в окне 8 часов, 16 часов — голодание.', sources: ['https://pubmed.ncbi.nlm.nih.gov/'], type: 'режим', recommendations: 'По самочувствию', risks: 'Не подходит при некоторых заболеваниях' },
  ],
  'Стресс и recovery': [
    { id: 'stress1', icon: '🌬️', title: 'Дыхательные упражнения 4-7-8', description: 'Техника дыхания для снижения тревожности.', sources: ['https://pubmed.ncbi.nlm.nih.gov/'], type: 'привычка', recommendations: '2-3 раза в день', risks: 'Головокружение при гипервентиляции' },
    { id: 'stress2', icon: '📝', title: 'Дневник благодарности', description: 'Записывать 3 вещи, за которые благодарен.', sources: ['https://positivepsychology.com/'], type: 'привычка', recommendations: 'Вечером', risks: 'Нет' },
  ],
  'Долголетие': [
    { id: 'long1', icon: '🏃‍♂️', title: 'Регулярная физическая активность', description: 'Любая активность не менее 150 мин/нед.', sources: ['https://www.cdc.gov/'], type: 'привычка', recommendations: '3-5 раз в неделю', risks: 'Травмы при перегрузке' },
    { id: 'long2', icon: '🌞', title: 'Контроль витамина D', description: 'Проверять уровень витамина D и корректировать приём.', sources: ['https://pubmed.ncbi.nlm.nih.gov/'], type: 'анализ', recommendations: '1-2 раза в год', risks: 'Гипервитаминоз' },
  ],
  'Когнитивные функции': [
    { id: 'cog1', icon: '🧠', title: 'Тренировка памяти', description: 'Brain games для поддержки нейропластичности.', sources: ['https://www.ncbi.nlm.nih.gov/'], type: 'привычка', recommendations: '10-15 мин в день', risks: 'Нет' },
    { id: 'cog2', icon: '📚', title: 'Чтение научной литературы', description: 'Регулярное чтение статей и книг.', sources: ['https://www.ncbi.nlm.nih.gov/'], type: 'привычка', recommendations: 'По интересу', risks: 'Нет' },
  ],
  'Физическая активность': [
    { id: 'act1', icon: '🚶‍♂️', title: '10 000 шагов в день', description: 'Ходьба для поддержания здоровья.', sources: ['https://www.cdc.gov/'], type: 'привычка', recommendations: 'Ежедневно', risks: 'Нет' },
    { id: 'act2', icon: '🏋️‍♂️', title: 'Силовые тренировки', description: '2 раза в неделю для поддержания мышц.', sources: ['https://www.cdc.gov/'], type: 'привычка', recommendations: '2 раза в неделю', risks: 'Травмы при неправильной технике' },
  ],
};

// Соответствия для категорий
export const EN_TO_RU = {
  sleep: 'Сон',
  nutrition: 'Питание',
  stress: 'Стресс и recovery',
  longevity: 'Долголетие',
  cognition: 'Когнитивные функции',
  activity: 'Физическая активность',
};
export const RU_TO_EN = {
  'Сон': 'sleep',
  'Питание': 'nutrition',
  'Стресс и recovery': 'stress',
  'Долголетие': 'longevity',
  'Когнитивные функции': 'cognition',
  'Физическая активность': 'activity',
};

export default ELEMENTS_LIBRARY; 