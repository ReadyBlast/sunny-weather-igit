# 🌤️ Sunny Weather Dashboard

Интерактивное приложение для визуализации погодного прогноза на основе OpenWeather API. Позволяет выбирать город,
отображать различные графики температуры и влажности, а также задавать интервал дат.

## 🧰 Технологии

- React + TypeScript
- Material UI (MUI)
- Recharts
- Date-fns
- OpenWeather API
- React Router
- Vite

## 🚀 Возможности

- 🔍 Поиск погоды по названию города
- 📊 Графики:
    - Линейный график температуры
    - Гистограмма температуры
    - Скользящее среднее температуры
    - Совмещённый график температуры и влажности
- 📅 Интервал дат с двумя `DatePicker` (начало и конец)
- 🌗 Переключение темы (светлая/тёмная) с использованием MUI ThemeProvider
- ⏳ Задержка запроса при вводе города (debounce)

## 📦 Установка

```bash
git clone https://github.com/ReadyBlast/sunny-weather-igit.git
cd sunny-weather-igit
npm install
