# ⚡ Быстрый старт

5 минут до запуска системы!

## 📋 Требования

- ✅ Node.js 18+ ([Скачать](https://nodejs.org/))
- ✅ npm 9+
- ✅ Docker Desktop ([Скачать](https://www.docker.com/products/docker-desktop/)) - опционально, но рекомендуется

## 🚀 Установка за 3 шага

### Шаг 1: Автоматическая установка

```bash
cd accounting-system
./setup.sh
```

Скрипт автоматически:
- ✅ Установит все зависимости
- ✅ Создаст .env файлы
- ✅ Запустит PostgreSQL через Docker
- ✅ Выполнит миграции БД
- ✅ Запустит backend и frontend

### Шаг 2: Откройте приложение

```
Frontend: http://localhost:4001
Backend API: http://localhost:4000
Swagger Docs: http://localhost:4000/api-docs
```

### Шаг 3: Создайте первого пользователя

Откройте http://localhost:4001/register и создайте аккаунт.

**Первый зарегистрированный пользователь автоматически становится администратором!**

## 🎉 Готово!

Система запущена и готова к использованию!

---

## 🔧 Альтернативный способ (без Docker)

Если у вас нет Docker:

### 1. Установите PostgreSQL

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt install postgresql-15
sudo systemctl start postgresql
```

**Windows:**
Скачайте с [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Создайте базу данных

```bash
psql -U postgres
CREATE DATABASE accounting_db;
CREATE USER accounting_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE accounting_db TO accounting_user;
\q
```

### 3. Настройте Backend

```bash
cd backend
npm install
cp .env.example .env
```

Отредактируйте `backend/.env`:
```env
DATABASE_URL=postgresql://accounting_user:your_password@localhost:5432/accounting_db
JWT_SECRET=your_super_secret_key_change_this_in_production
PORT=4000
```

Запустите миграции и сервер:
```bash
npm run migrate
npm run dev
```

### 4. Настройте Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Отредактируйте `frontend/.env`:
```env
API_BASE_URL=http://localhost:4000/api
```

Запустите сервер:
```bash
npm run dev
```

---

## 📱 Первые действия в системе

### 1. Регистрация
- Перейдите на http://localhost:4001/register
- Заполните форму регистрации
- Вы автоматически станете администратором (первый пользователь)

### 2. Создайте первого клиента
- Зайдите в раздел "Клиенты"
- Нажмите "Добавить клиента"
- Заполните информацию о клиенте

### 3. Создайте проект
- Перейдите в "Проекты"
- Нажмите "Создать проект"
- Привяжите к созданному клиенту
- Укажите бюджет и сроки

### 4. Добавьте сотрудников
- Раздел "Сотрудники"
- Добавьте членов команды
- Укажите должности и ставки

### 5. Создайте задачи
- В проекте создайте задачи
- Назначьте исполнителей
- Укажите оценки времени

### 6. Начните трекинг времени
- Раздел "Тайм-трекинг"
- Добавляйте записи времени по задачам
- Отмечайте billable/non-billable часы

### 7. Выставьте первый счет
- Перейдите в "Инвойсы"
- Создайте счет для клиента
- Укажите сумму и срок оплаты
- Отправьте клиенту

### 8. Посмотрите отчеты
- Раздел "Отчеты"
- IT Dashboard - общая статистика
- Project Profitability - прибыльность проектов
- Team Utilization - загруженность команды

---

## 🎯 Что дальше?

### Настройте бухгалтерию

1. **План счетов**
   - Перейдите в "Бухгалтерия" → "План счетов"
   - Настройте счета под вашу компанию
   - Или используйте стандартный план

2. **Контрагенты**
   - Добавьте поставщиков и партнеров
   - Укажите реквизиты

3. **Банковские счета**
   - Настройте банковские операции
   - Импортируйте выписки

### Настройте IT-инфраструктуру

1. **Технологии**
   - Добавьте используемые технологии
   - Укажите версии

2. **Подписки**
   - Внесите все SaaS-подписки
   - Настройте напоминания о продлении

3. **Репозитории**
   - Привяжите Git-репозитории к проектам

### Настройте команду

1. **Департаменты**
   - Создайте отделы
   - Распределите сотрудников

2. **Зарплаты**
   - Настройте расчет зарплат
   - Укажите ставки и надбавки

---

## 🔍 Полезные команды

### Backend

```bash
# Запуск в dev режиме
npm run dev

# Запуск в production
npm run build
npm start

# Тесты
npm test
npm run test:coverage

# Миграции
npm run migrate
npm run migrate:rollback

# Lint
npm run lint
```

### Frontend

```bash
# Запуск в dev режиме
npm run dev

# Build для production
npm run build
npm run preview

# Тесты
npm test

# Lint
npm run lint
```

### Docker

```bash
# Запустить все сервисы
docker-compose up -d

# Остановить все сервисы
docker-compose down

# Перезапустить сервис
docker-compose restart backend

# Посмотреть логи
docker-compose logs -f backend

# Войти в контейнер
docker-compose exec backend sh
```

---

## 📚 Документация

- 📖 **README.md** - Основная документация
- 🎯 **FEATURES.md** - Полный список функций (40+ модулей)
- 📊 **PROJECT_SUMMARY.md** - Сводка проекта и сравнение с Zakaz
- 🔌 **API_ENDPOINTS.md** - Справочник API (100+ endpoints)
- 🐳 **DOCKER.md** - Docker документация
- ⚡ **QUICK_START.md** - Этот файл

---

## ❓ Частые вопросы

### Как изменить порты?

Backend (по умолчанию 4000):
```bash
# backend/.env
PORT=4000
```

Frontend (по умолчанию 4001):
```bash
# frontend/.env
PORT=4001
```

### Как сбросить базу данных?

```bash
cd backend
npm run migrate:rollback
npm run migrate
```

Или через Docker:
```bash
docker-compose down -v
docker-compose up -d
```

### Как добавить нового пользователя-админа?

1. Зайдите как существующий админ
2. Перейдите в "Пользователи"
3. Измените роль пользователя на "admin"

Или через API:
```bash
curl -X PUT http://localhost:4000/api/auth/users/:id \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{"role": "admin"}'
```

### Как экспортировать данные?

Используйте API endpoints с форматом `?format=csv` или `?format=excel`:

```bash
curl -X GET "http://localhost:4000/api/projects?format=csv" \
  -H "Authorization: Bearer <token>" \
  > projects.csv
```

### Где хранятся загруженные файлы?

```
backend/uploads/
├── receipts/
├── invoices/
└── documents/
```

---

## 🆘 Помощь и поддержка

### Проблемы с установкой?

1. Проверьте версии:
```bash
node --version  # должна быть 18+
npm --version   # должна быть 9+
docker --version
```

2. Очистите кеш:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

3. Проверьте порты:
```bash
lsof -i :4000  # backend
lsof -i :4001  # frontend
lsof -i :5432  # postgresql
```

### База данных не подключается?

1. Проверьте, запущен ли PostgreSQL:
```bash
docker-compose ps
# или
sudo systemctl status postgresql
```

2. Проверьте настройки в `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

3. Проверьте доступность:
```bash
psql -U postgres -h localhost -p 5432
```

### Frontend не видит backend?

1. Проверьте CORS настройки в `backend/src/index.ts`
2. Проверьте `API_BASE_URL` в `frontend/.env`
3. Убедитесь что backend запущен на правильном порту

---

## 🎉 Готово к работе!

Система полностью настроена и готова к использованию.

Начните с создания клиентов, проектов и задач, и система начнет собирать данные для аналитики и отчетов.

**Удачи с управлением вашей IT-компанией!** 🚀

---

**Создано с использованием Mithril CLI**
