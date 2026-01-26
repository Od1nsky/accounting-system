# 🚀 IT Company Accounting & Management System

Полнофункциональная система управления и бухгалтерского учета для IT-компаний и агентств. Включает учет проектов, тайм-трекинг, финансы, управление командой и клиентами.

## 📋 Основные возможности

### 🎯 Управление проектами и задачами
- ✅ **Проекты** - создание, отслеживание статуса, бюджетирование
- ✅ **Задачи** - полный цикл задач с приоритетами и оценками
- ✅ **Спринты** - agile-методология с трекингом velocity
- ✅ **Вехи проекта** - контрольные точки с привязкой к оплатам
- ✅ **Репозитории** - связь с GitHub/GitLab/Bitbucket

### 👥 Управление клиентами
- ✅ **База клиентов** - полная CRM с историей взаимодействий
- ✅ **Контракты** - управление договорами и соглашениями
- ✅ **Инвойсы** - выставление счетов с учетом НДС
- ✅ **Акты сверки** - автоматическая сверка взаиморасчетов

### ⏱️ Тайм-трекинг и учет рабочего времени
- ✅ **Учет времени** - детальный трекинг по проектам и задачам
- ✅ **Billable/Non-billable** - разделение оплачиваемого времени
- ✅ **Утилизация команды** - отчеты по загруженности сотрудников
- ✅ **Таймшиты** - еженедельные и месячные отчеты

### 💰 Финансовый учет
- ✅ **План счетов** - гибкая настройка бухгалтерских счетов
- ✅ **Двойная запись** - полноценный учет по дебету/кредиту
- ✅ **Платежи** - кассовые и банковские операции
- ✅ **Контрагенты** - учет поставщиков и клиентов
- ✅ **Налоги** - расчет и учет налоговых обязательств
- ✅ **Бюджетирование** - планирование и контроль бюджета

### 👨‍💻 Управление командой
- ✅ **Сотрудники** - база данных команды с должностями
- ✅ **Зарплаты** - расчет и учет заработной платы
- ✅ **Департаменты** - структурирование по отделам
- ✅ **Навыки и технологии** - профили разработчиков

### 📦 Складской учет (для оборудования)
- ✅ **Товары** - оборудование и комплектующие
- ✅ **Операции** - приход/расход со склада
- ✅ **Инвентаризация** - проведение инвентаризаций
- ✅ **Основные средства** - учет компьютеров, серверов
- ✅ **Амортизация** - автоматический расчет

### 🔧 IT-инфраструктура
- ✅ **Технологии** - стек технологий компании
- ✅ **Подписки** - SaaS-сервисы и лицензии
- ✅ **Расходы на проекты** - учет затрат по проектам

### 📊 Аналитика и отчеты
- ✅ **Прибыльность проектов** - детальный анализ P&L по проектам
- ✅ **Выручка от клиентов** - топ клиентов по доходам
- ✅ **Эффективность команды** - метрики производительности
- ✅ **Performance спринтов** - velocity и completion rate
- ✅ **Баланс и P&L** - классические финансовые отчеты
- ✅ **Cash Flow** - движение денежных средств
- ✅ **Дебиторская задолженность** - aging report
- ✅ **Расходы на подписки** - контроль SaaS-расходов
- ✅ **IT Dashboard** - сводная панель метрик

## 🛠 Технологии

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **API Documentation**: Swagger/OpenAPI
- **File Upload**: Multer
- **Email**: Nodemailer

### Frontend
- **Framework**: Nuxt 3
- **UI Library**: Vue 3 (Composition API)
- **Components**: Vuetify 3
- **State Management**: Pinia
- **Language**: TypeScript
- **Styling**: SCSS
- **Charts**: Chart.js / ApexCharts

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 15
- **Reverse Proxy**: Nginx (опционально)

## 🚀 Быстрый старт

### Требования
- Node.js v18 или выше
- npm v9 или выше
- PostgreSQL 15+ (или Docker)

### Установка

```bash
# Клонировать проект
cd accounting-system

# Запустить автоматическую установку
./setup.sh
```

Скрипт автоматически:
- Установит зависимости для backend и frontend
- Создаст .env файлы
- Запустит PostgreSQL через Docker
- Выполнит миграции БД
- Запустит оба сервера

### Ручная установка

**1. Установка Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Отредактируйте .env с настройками БД
npm run migrate
npm run dev
```

**2. Установка Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

**3. PostgreSQL через Docker:**
```bash
docker-compose up -d postgres
```

### Доступ к приложению

- **Frontend**: http://localhost:4001
- **Backend API**: http://localhost:4000
- **Swagger Docs**: http://localhost:4000/api-docs
- **PostgreSQL**: localhost:5432

### Первый вход

При первой регистрации пользователь получает права администратора.

```bash
# Регистрация через API
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@company.com",
    "password": "SecurePassword123!",
    "firstName": "Admin",
    "lastName": "User"
  }'
```

## 📁 Структура проекта

```
accounting-system/
├── backend/
│   ├── src/
│   │   ├── config/              # Конфигурация приложения
│   │   ├── controllers/         # Контроллеры API (40+ контроллеров)
│   │   │   ├── accountController.ts
│   │   │   ├── projectController.ts
│   │   │   ├── clientController.ts
│   │   │   ├── taskController.ts
│   │   │   ├── timeEntryController.ts
│   │   │   ├── itReportController.ts
│   │   │   └── ...
│   │   ├── database/            # БД и миграции
│   │   ├── middleware/          # Express middleware
│   │   ├── models/              # Модели данных (40+ моделей)
│   │   │   ├── Account.ts       # План счетов
│   │   │   ├── Project.ts       # Проекты
│   │   │   ├── Client.ts        # Клиенты
│   │   │   ├── Task.ts          # Задачи
│   │   │   ├── TimeEntry.ts     # Тайм-трекинг
│   │   │   └── ...
│   │   ├── routes/              # API маршруты
│   │   ├── services/            # Бизнес-логика
│   │   ├── types/               # TypeScript типы
│   │   ├── utils/               # Утилиты
│   │   └── index.ts             # Точка входа
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── assets/                  # Стили и ресурсы
│   ├── components/              # Vue компоненты
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── time-tracking/
│   │   ├── reports/
│   │   └── ...
│   ├── layouts/                 # Layouts
│   ├── pages/                   # Страницы приложения (40+ модулей)
│   │   ├── index.vue            # Главная/Dashboard
│   │   ├── login.vue
│   │   ├── projects/            # Управление проектами
│   │   ├── clients/             # CRM клиентов
│   │   ├── tasks/               # Задачи
│   │   ├── time-entries/        # Тайм-трекинг
│   │   ├── invoices/            # Инвойсы
│   │   ├── reports/             # Отчеты
│   │   └── ...
│   ├── stores/                  # Pinia stores
│   ├── composables/             # Composables
│   ├── plugins/                 # Плагины
│   └── nuxt.config.ts
├── docker-compose.yml
├── setup.sh
└── README.md
```

## 🔌 API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/auth/me` - Текущий пользователь
- `GET /api/auth/users` - Список пользователей (admin)

### Проекты и задачи
- `GET/POST /api/projects` - Проекты
- `GET/PUT/DELETE /api/projects/:id` - Детали проекта
- `GET/POST /api/tasks` - Задачи
- `GET/PUT/DELETE /api/tasks/:id` - Детали задачи
- `GET/POST /api/sprints` - Спринты
- `GET/POST /api/milestones` - Вехи проекта
- `GET/POST /api/repositories` - Репозитории

### Клиенты и финансы
- `GET/POST /api/clients` - Клиенты
- `GET/POST /api/contracts` - Контракты
- `GET/POST /api/invoices` - Инвойсы
- `GET/POST /api/payments` - Платежи
- `GET/POST /api/reconciliations` - Акты сверки

### Тайм-трекинг
- `GET/POST /api/time-entries` - Записи времени
- `GET /api/time-entries?employeeId=X` - Время сотрудника
- `GET /api/time-entries?projectId=X` - Время по проекту

### Бухгалтерия
- `GET/POST /api/accounts` - План счетов
- `GET/POST /api/transactions` - Проводки
- `GET/POST /api/counterparties` - Контрагенты
- `GET/POST /api/cash-operations` - Касса
- `GET/POST /api/bank-operations` - Банк
- `GET/POST /api/tax-records` - Налоги
- `GET/POST /api/budgets` - Бюджеты

### Команда и HR
- `GET/POST /api/employees` - Сотрудники
- `GET/POST /api/salary-payments` - Зарплаты

### Склад и активы
- `GET/POST /api/products` - Товары/оборудование
- `GET/POST /api/warehouse-operations` - Складские операции
- `GET/POST /api/inventories` - Инвентаризации
- `GET/POST /api/assets` - Основные средства
- `GET/POST /api/depreciations` - Амортизация

### IT-инфраструктура
- `GET/POST /api/technologies` - Технологии
- `GET/POST /api/subscriptions` - Подписки
- `GET/POST /api/project-expenses` - Расходы на проекты

### Отчеты и аналитика
- `GET /api/it-reports/dashboard` - IT Dashboard
- `GET /api/it-reports/project-profitability` - Прибыльность проектов
- `GET /api/it-reports/team-utilization` - Утилизация команды
- `GET /api/it-reports/time-tracking` - Отчет по времени
- `GET /api/it-reports/sprint-performance` - Метрики спринтов
- `GET /api/it-reports/client-revenue` - Выручка от клиентов
- `GET /api/it-reports/technology-stack` - Стек технологий
- `GET /api/it-reports/subscription-costs` - Расходы на подписки
- `GET /api/it-reports/task-metrics` - Метрики задач
- `GET /api/it-reports/milestone-tracking` - Трекинг вех

## 📊 Примеры использования

### Создание проекта

```bash
curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
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
    "description": "iOS and Android app development",
    "repository": "https://github.com/company/mobile-app",
    "isActive": true
  }'
```

### Добавление времени

```bash
curl -X POST http://localhost:4000/api/time-entries \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "employeeId": 1,
    "projectId": 1,
    "taskId": 5,
    "date": "2024-01-20",
    "hours": 8,
    "description": "Implemented user authentication",
    "billable": true,
    "hourlyRate": 5000,
    "approved": true
  }'
```

### Получение отчета по проекту

```bash
curl -X GET "http://localhost:4000/api/it-reports/project-profitability?projectId=1" \
  -H "Authorization: Bearer <token>"
```

## 🎨 Преимущества перед проектом Zakaz

### 40+ модулей vs 10 модулей в Zakaz

**Новые модули, отсутствующие в Zakaz:**

1. ✅ **Проекты** - полное управление IT-проектами
2. ✅ **Клиенты (CRM)** - расширенная база клиентов
3. ✅ **Задачи** - task management с Agile
4. ✅ **Тайм-трекинг** - учет рабочего времени
5. ✅ **Спринты** - agile спринты с метриками
6. ✅ **Репозитории** - интеграция с Git
7. ✅ **Технологии** - стек технологий компании
8. ✅ **Подписки** - учет SaaS и лицензий
9. ✅ **Расходы на проекты** - project expenses
10. ✅ **Вехи проекта** - milestones tracking
11. ✅ **Контракты** - управление договорами
12. ✅ **План счетов** - гибкая настройка
13. ✅ **Двойная запись** - бухгалтерские проводки
14. ✅ **Контрагенты** - полная база
15. ✅ **Акты сверки** - reconciliation

### Расширенные отчеты (10+ vs 3 в Zakaz)

- ✅ IT Dashboard с метриками
- ✅ Прибыльность проектов
- ✅ Утилизация команды
- ✅ Тайм-трекинг отчеты
- ✅ Sprint performance
- ✅ Выручка от клиентов
- ✅ Technology stack
- ✅ Subscription costs
- ✅ Task metrics
- ✅ Milestone tracking
- ✅ Balance sheet
- ✅ Profit & Loss
- ✅ Cash Flow
- ✅ Accounts Receivable Aging
- ✅ VAT Report
- ✅ Inventory Valuation
- ✅ Fixed Assets Report
- ✅ Payroll Report

### Сравнительная таблица

| Функция | Zakaz | IT Accounting System |
|---------|-------|---------------------|
| **Модулей всего** | ~10 | **40+** |
| **Основные средства** | ✅ | ✅ |
| **Амортизация** | ✅ | ✅ |
| **Проекты** | ❌ | ✅ |
| **Задачи** | ❌ | ✅ |
| **Тайм-трекинг** | ❌ | ✅ |
| **Спринты** | ❌ | ✅ |
| **CRM** | ❌ | ✅ |
| **Контракты** | ❌ | ✅ |
| **Вехи** | ❌ | ✅ |
| **Репозитории** | ❌ | ✅ |
| **Технологии** | ❌ | ✅ |
| **Подписки** | ❌ | ✅ |
| **План счетов** | ❌ | ✅ |
| **Двойная запись** | ❌ | ✅ |
| **IT-отчеты** | 3 | **18+** |
| **База данных** | SQLite | PostgreSQL |
| **Swagger** | ❌ | ✅ |
| **Docker** | ❌ | ✅ |
| **Email** | ❌ | ✅ |
| **File Upload** | ❌ | ✅ |

## 🧪 Тестирование

```bash
# Backend тесты
cd backend
npm test
npm run test:coverage

# Frontend тесты
cd frontend
npm test
```

## 📦 Production сборка

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview

# Docker Production
docker-compose -f docker-compose.prod.yml up -d
```

## 🔐 Безопасность

- JWT токены с истечением срока действия
- Bcrypt хеширование паролей
- CORS защита
- Rate limiting
- SQL injection защита
- XSS защита
- CSRF токены

## 📝 Лицензия

MIT License

## 🤝 Поддержка

Для вопросов и предложений создавайте Issues в репозитории.

---

**Разработано с использованием Mithril CLI** 🚀
