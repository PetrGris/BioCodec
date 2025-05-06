import json
from app.database import SessionLocal
from app.models import LibraryItem

data = [
    {
        "title": "Атлас биохакинга",
        "description": "Современное руководство по биохакингу: питание, сон, анализы, привычки.",
        "type": "книга",
        "icon": "📖",
        "cover_url": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        "link": "https://biobook.example.com",
        "tags": ["биохакинг", "здоровье", "образование"],
        "author": "Иван Био",
        "rating": 4.8
    },
    {
        "title": "Курс: Основы биохакинга",
        "description": "Онлайн-курс для начинающих биохакеров. Видео, тесты, задания.",
        "type": "курс",
        "icon": "🎓",
        "cover_url": "https://images.unsplash.com/photo-1503676382389-4809596d5290",
        "link": "https://course.biohacker.ru",
        "tags": ["курс", "биохакинг", "старт"],
        "author": "BioAcademy",
        "rating": 4.7
    },
    {
        "title": "Протокол: Здоровый сон",
        "description": "Пошаговый протокол для улучшения сна: режим, свет, гаджеты, анализы.",
        "type": "протокол",
        "icon": "😴",
        "cover_url": "https://images.unsplash.com/photo-1464983953574-0892a716854b",
        "link": "https://protocols.biohacker.ru/sleep",
        "tags": ["сон", "протокол", "здоровье"],
        "author": "BioLab",
        "rating": 4.9
    },
    {
        "title": "Приложение: MyBlood",
        "description": "Трекер анализов крови с напоминаниями и графиками.",
        "type": "приложение",
        "icon": "💉",
        "cover_url": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
        "link": "https://myblood.app",
        "tags": ["анализы", "приложение", "трекер"],
        "author": "MyBlood Team",
        "rating": 4.5
    },
    {
        "title": "Книга: Why We Sleep",
        "description": "Мэттью Уолкер — научно-популярная книга о важности сна.",
        "type": "книга",
        "icon": "🌙",
        "cover_url": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        "link": "https://www.whywesleep.com/",
        "tags": ["сон", "книга", "наука"],
        "author": "Matthew Walker",
        "rating": 4.9
    },
    {
        "title": "Курс: Лабораторная диагностика для всех",
        "description": "Практический курс по интерпретации лабораторных анализов.",
        "type": "курс",
        "icon": "🧪",
        "cover_url": "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
        "link": "https://labs.biohacker.ru",
        "tags": ["анализы", "курс", "диагностика"],
        "author": "LabSchool",
        "rating": 4.6
    },
    {
        "title": "Протокол: Умное питание",
        "description": "Рекомендации по питанию для повышения энергии и долголетия.",
        "type": "протокол",
        "icon": "🥗",
        "cover_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        "link": "https://protocols.biohacker.ru/nutrition",
        "tags": ["питание", "протокол", "энергия"],
        "author": "BioLab",
        "rating": 4.8
    },
    {
        "title": "Приложение: SleepCycle",
        "description": "Популярное приложение для отслеживания сна и умного будильника.",
        "type": "приложение",
        "icon": "⏰",
        "cover_url": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
        "link": "https://www.sleepcycle.com/",
        "tags": ["сон", "приложение", "будильник"],
        "author": "SleepCycle",
        "rating": 4.4
    },
    {
        "title": "Книга: Lifespan",
        "description": "David Sinclair — о науке долголетия и биохакинге старения.",
        "type": "книга",
        "icon": "🧬",
        "cover_url": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        "link": "https://lifespanbook.com/",
        "tags": ["долголетие", "книга", "биохакинг"],
        "author": "David Sinclair",
        "rating": 4.8
    },
    {
        "title": "Курс: Мозг и эффективность",
        "description": "Курс о том, как улучшить когнитивные функции и продуктивность.",
        "type": "курс",
        "icon": "🧠",
        "cover_url": "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
        "link": "https://brain.biohacker.ru",
        "tags": ["мозг", "курс", "продуктивность"],
        "author": "BrainLab",
        "rating": 4.7
    }
]

def main():
    db = SessionLocal()
    for item in data:
        tags_json = json.dumps(item["tags"])
        db_item = LibraryItem(
            title=item["title"],
            description=item["description"],
            type=item["type"],
            icon=item["icon"],
            cover_url=item["cover_url"],
            link=item["link"],
            tags=tags_json,
            author=item["author"],
            rating=item["rating"]
        )
        db.add(db_item)
    db.commit()
    db.close()
    print("Библиотека успешно заполнена примерами!")

if __name__ == "__main__":
    main() 