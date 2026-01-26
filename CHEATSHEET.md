# 📝 Шпаргалка по командам

Быстрый справочник по всем командам и endpoints системы

## 🚀 Запуск и установка

```bash
# Автоматическая установка
./setup.sh

# Запуск backend
cd backend && npm run dev

# Запуск frontend
cd frontend && npm run dev

# Docker запуск всего
docker-compose up -d

# Остановить Docker
docker-compose down
```

## 🔐 Регистрация и вход

```bash
# Регистрация (первый пользователь становится админом)
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@company.com",
    "password": "SecurePassword123!",
    "firstName": "Admin",
    "lastName": "User"
  }'

# Вход
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@company.com",
    "password": "SecurePassword123!"
  }'
# Сохраните полученный token

# Получить текущего пользователя
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

## 👥 Работа с клиентами

```bash
# Создать клиента
curl -X POST http://localhost:4000/api/clients \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corporation",
    "contactPerson": "John Doe",
    "email": "john@acme.com",
    "phone": "+1234567890",
    "company": "Acme Corp",
    "status": "active",
    "isActive": true
  }'

# Получить всех клиентов
curl -X GET http://localhost:4000/api/clients \
  -H "Authorization: Bearer <token>"

# Получить клиента по ID
curl -X GET http://localhost:4000/api/clients/1 \
  -H "Authorization: Bearer <token>"
```

## 🎯 Работа с проектами

```bash
# Создать проект
curl -X POST http://localhost:4000/api/projects \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mobile App Development",
    "clientId": 1,
    "code": "MOBILE-001",
    "type": "fixed_price",
    "status": "active",
    "startDate": "2024-01-15",
    "endDate": "2024-06-15",
    "budget": 500000,
    "hourlyRate": 5000,
    "description": "iOS and Android app",
    "isActive": true
  }'

# Получить все проекты
curl -X GET http://localhost:4000/api/projects \
  -H "Authorization: Bearer <token>"

# Получить проекты клиента
curl -X GET "http://localhost:4000/api/projects?clientId=1" \
  -H "Authorization: Bearer <token>"
```

## ✅ Работа с задачами

```bash
# Создать задачу
curl -X POST http://localhost:4000/api/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": 1,
    "title": "Implement user authentication",
    "description": "Add JWT-based auth",
    "type": "feature",
    "priority": "high",
    "status": "todo",
    "assignedTo": 1,
    "estimatedHours": 16,
    "dueDate": "2024-02-01"
  }'

# Получить задачи проекта
curl -X GET "http://localhost:4000/api/tasks?projectId=1" \
  -H "Authorization: Bearer <token>"

# Обновить статус задачи
curl -X PUT http://localhost:4000/api/tasks/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"status": "in_progress"}'
```

## ⏱️ Тайм-трекинг

```bash
# Добавить запись времени
curl -X POST http://localhost:4000/api/time-entries \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": 1,
    "projectId": 1,
    "taskId": 1,
    "date": "2024-01-20",
    "hours": 8,
    "description": "Implemented JWT auth",
    "billable": true,
    "hourlyRate": 5000
  }'

# Получить время по проекту
curl -X GET "http://localhost:4000/api/time-entries?projectId=1" \
  -H "Authorization: Bearer <token>"

# Получить время сотрудника
curl -X GET "http://localhost:4000/api/time-entries?employeeId=1" \
  -H "Authorization: Bearer <token>"
```

## 🏃 Работа со спринтами

```bash
# Создать спринт
curl -X POST http://localhost:4000/api/sprints \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": 1,
    "name": "Sprint 1",
    "goal": "Core features implementation",
    "startDate": "2024-01-15",
    "endDate": "2024-01-29",
    "status": "active",
    "capacity": 80
  }'

# Получить спринты проекта
curl -X GET "http://localhost:4000/api/sprints?projectId=1" \
  -H "Authorization: Bearer <token>"
```

## 🧾 Работа с инвойсами

```bash
# Создать инвойс
curl -X POST http://localhost:4000/api/invoices \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "INV-001",
    "counterpartyId": 1,
    "date": "2024-01-20",
    "dueDate": "2024-02-20",
    "totalAmount": 100000,
    "vatAmount": 20000,
    "status": "sent",
    "paid": false
  }'

# Получить все инвойсы
curl -X GET http://localhost:4000/api/invoices \
  -H "Authorization: Bearer <token>"

# Отметить оплаченным
curl -X PUT http://localhost:4000/api/invoices/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"paid": true, "paidDate": "2024-01-25"}'
```

## 💸 Платежи

```bash
# Создать платеж
curl -X POST http://localhost:4000/api/payments \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "PAY-001",
    "invoiceId": 1,
    "counterpartyId": 1,
    "date": "2024-01-25",
    "type": "incoming",
    "method": "bank_transfer",
    "amount": 100000,
    "currency": "RUB",
    "status": "completed"
  }'
```

## 👨‍💼 Работа с сотрудниками

```bash
# Добавить сотрудника
curl -X POST http://localhost:4000/api/employees \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Smith",
    "position": "Senior Developer",
    "department": "Development",
    "hireDate": "2024-01-01",
    "salary": 150000,
    "email": "john.smith@company.com",
    "isActive": true
  }'

# Получить всех сотрудников
curl -X GET http://localhost:4000/api/employees \
  -H "Authorization: Bearer <token>"
```

## 📊 Отчеты

```bash
# IT Dashboard
curl -X GET http://localhost:4000/api/it-reports/dashboard \
  -H "Authorization: Bearer <token>"

# Прибыльность проектов
curl -X GET http://localhost:4000/api/it-reports/project-profitability \
  -H "Authorization: Bearer <token>"

# Прибыльность конкретного проекта
curl -X GET "http://localhost:4000/api/it-reports/project-profitability?projectId=1" \
  -H "Authorization: Bearer <token>"

# Утилизация команды
curl -X GET "http://localhost:4000/api/it-reports/team-utilization?startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer <token>"

# Выручка от клиентов
curl -X GET http://localhost:4000/api/it-reports/client-revenue \
  -H "Authorization: Bearer <token>"

# Баланс
curl -X GET http://localhost:4000/api/reports/balance-sheet \
  -H "Authorization: Bearer <token>"

# Прибыль и убытки
curl -X GET "http://localhost:4000/api/reports/profit-loss?startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer <token>"

# Cash Flow
curl -X GET "http://localhost:4000/api/reports/cash-flow?startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer <token>"
```

## 📋 План счетов и проводки

```bash
# Создать счет
curl -X POST http://localhost:4000/api/accounts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "10.01",
    "name": "Основные средства",
    "type": "asset",
    "isActive": true
  }'

# Создать проводку
curl -X POST http://localhost:4000/api/transactions \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-20",
    "debitAccount": "50.01",
    "creditAccount": "62.01",
    "amount": 100000,
    "description": "Оплата от клиента",
    "posted": true
  }'
```

## 🔧 Технологии и подписки

```bash
# Добавить технологию
curl -X POST http://localhost:4000/api/technologies \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Node.js",
    "category": "runtime",
    "version": "20.x",
    "licenseType": "MIT",
    "isActive": true
  }'

# Добавить подписку
curl -X POST http://localhost:4000/api/subscriptions \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "GitHub Enterprise",
    "provider": "GitHub",
    "type": "saas",
    "cost": 21000,
    "billingPeriod": "monthly",
    "startDate": "2024-01-01",
    "autoRenew": true,
    "status": "active"
  }'

# Получить расходы на подписки
curl -X GET http://localhost:4000/api/it-reports/subscription-costs \
  -H "Authorization: Bearer <token>"
```

## 🖥️ Основные средства

```bash
# Добавить ОС
curl -X POST http://localhost:4000/api/assets \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro M3",
    "inventoryNumber": "IT-001",
    "category": "computers",
    "cost": 250000,
    "purchaseDate": "2024-01-15",
    "depreciationRate": 20,
    "status": "in_use",
    "responsiblePersonId": 1
  }'

# Рассчитать амортизацию
curl -X POST http://localhost:4000/api/depreciations/calculate \
  -H "Authorization: Bearer <token>"
```

## 🔍 Фильтрация и поиск

```bash
# С пагинацией
curl -X GET "http://localhost:4000/api/projects?page=1&limit=20" \
  -H "Authorization: Bearer <token>"

# С сортировкой
curl -X GET "http://localhost:4000/api/projects?sort=createdAt&order=desc" \
  -H "Authorization: Bearer <token>"

# С поиском
curl -X GET "http://localhost:4000/api/clients?search=acme" \
  -H "Authorization: Bearer <token>"

# С фильтрами
curl -X GET "http://localhost:4000/api/tasks?status=in_progress&priority=high" \
  -H "Authorization: Bearer <token>"

# По датам
curl -X GET "http://localhost:4000/api/invoices?startDate=2024-01-01&endDate=2024-01-31" \
  -H "Authorization: Bearer <token>"
```

## 🐳 Docker команды

```bash
# Запустить все сервисы
docker-compose up -d

# Остановить все
docker-compose down

# Перезапустить сервис
docker-compose restart backend

# Посмотреть логи
docker-compose logs -f backend

# Войти в контейнер
docker-compose exec backend sh

# Удалить все (включая volumes)
docker-compose down -v
```

## 🗄️ База данных

```bash
# Подключиться к PostgreSQL
docker-compose exec postgres psql -U postgres -d accounting_db

# Или локально
psql -U postgres -d accounting_db

# Миграции
cd backend
npm run migrate
npm run migrate:rollback

# Бэкап БД
pg_dump -U postgres accounting_db > backup.sql

# Восстановление
psql -U postgres accounting_db < backup.sql
```

## 🧪 Тестирование

```bash
# Backend тесты
cd backend
npm test
npm run test:coverage

# Frontend тесты
cd frontend
npm test

# E2E тесты (если настроены)
npm run test:e2e
```

## 📦 Production

```bash
# Build backend
cd backend
npm run build
npm start

# Build frontend
cd frontend
npm run build
npm run preview

# Docker production
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Полезные команды

```bash
# Очистить кеш npm
npm cache clean --force

# Переустановить зависимости
rm -rf node_modules package-lock.json
npm install

# Проверить порты
lsof -i :4000  # backend
lsof -i :4001  # frontend
lsof -i :5432  # postgresql

# Убить процесс на порту
kill -9 $(lsof -t -i:4000)

# Посмотреть размер БД
du -sh backend/database.sqlite

# Экспорт в CSV
curl -X GET "http://localhost:4000/api/projects?format=csv" \
  -H "Authorization: Bearer <token>" \
  > projects.csv
```

## 📝 Переменные окружения

**Backend (.env):**
```env
PORT=4000
DATABASE_URL=postgresql://user:pass@localhost:5432/accounting_db
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASSWORD=your_password

# Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

**Frontend (.env):**
```env
API_BASE_URL=http://localhost:4000/api
PORT=4001
```

## 🎯 Быстрые ссылки

- Frontend: http://localhost:4001
- Backend API: http://localhost:4000
- Swagger: http://localhost:4000/api-docs
- Health: http://localhost:4000/api/health

## 📚 Документация

```bash
# Просмотр документации
cat README.md              # Основная
cat QUICK_START.md         # Быстрый старт
cat FEATURES.md            # Все функции
cat API_ENDPOINTS.md       # API справочник
cat PROJECT_SUMMARY.md     # Сводка
cat CHEATSHEET.md          # Эта шпаргалка
```

---

**Сохраните этот файл в закладки для быстрого доступа!** 🚀
