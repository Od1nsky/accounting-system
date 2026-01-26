# 🔌 API Endpoints Reference

Полный список всех API endpoints системы IT Company Accounting & Management System

## 🔐 Аутентификация

**Base URL:** `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Регистрация нового пользователя | ❌ |
| POST | `/login` | Вход в систему | ❌ |
| GET | `/me` | Получить текущего пользователя | ✅ |
| GET | `/users` | Список всех пользователей | ✅ Admin |
| PUT | `/users/:id` | Обновить пользователя | ✅ Admin |
| DELETE | `/users/:id` | Удалить пользователя | ✅ Admin |

## 🎯 Проекты

**Base URL:** `/api/projects`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список всех проектов | ✅ |
| POST | `/` | Создать новый проект | ✅ |
| GET | `/:id` | Получить проект по ID | ✅ |
| PUT | `/:id` | Обновить проект | ✅ |
| DELETE | `/:id` | Удалить проект | ✅ |
| GET | `/:id/tasks` | Задачи проекта | ✅ |
| GET | `/:id/time-entries` | Время по проекту | ✅ |
| GET | `/:id/expenses` | Расходы проекта | ✅ |
| GET | `/:id/milestones` | Вехи проекта | ✅ |

## 👥 Клиенты (CRM)

**Base URL:** `/api/clients`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список клиентов | ✅ |
| POST | `/` | Создать клиента | ✅ |
| GET | `/:id` | Получить клиента | ✅ |
| PUT | `/:id` | Обновить клиента | ✅ |
| DELETE | `/:id` | Удалить клиента | ✅ |
| GET | `/:id/projects` | Проекты клиента | ✅ |
| GET | `/:id/invoices` | Счета клиента | ✅ |
| GET | `/:id/contracts` | Контракты клиента | ✅ |

## ✅ Задачи

**Base URL:** `/api/tasks`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список задач | ✅ |
| POST | `/` | Создать задачу | ✅ |
| GET | `/:id` | Получить задачу | ✅ |
| PUT | `/:id` | Обновить задачу | ✅ |
| DELETE | `/:id` | Удалить задачу | ✅ |
| PUT | `/:id/status` | Изменить статус | ✅ |
| PUT | `/:id/assign` | Назначить исполнителя | ✅ |
| GET | `/:id/time-entries` | Время по задаче | ✅ |

## ⏱️ Тайм-трекинг

**Base URL:** `/api/time-entries`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список записей времени | ✅ |
| POST | `/` | Добавить запись времени | ✅ |
| GET | `/:id` | Получить запись | ✅ |
| PUT | `/:id` | Обновить запись | ✅ |
| DELETE | `/:id` | Удалить запись | ✅ |
| PUT | `/:id/approve` | Утвердить запись | ✅ Manager |
| GET | `/employee/:employeeId` | Время сотрудника | ✅ |
| GET | `/project/:projectId` | Время по проекту | ✅ |
| GET | `/task/:taskId` | Время по задаче | ✅ |

## 🏃 Спринты

**Base URL:** `/api/sprints`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список спринтов | ✅ |
| POST | `/` | Создать спринт | ✅ |
| GET | `/:id` | Получить спринт | ✅ |
| PUT | `/:id` | Обновить спринт | ✅ |
| DELETE | `/:id` | Удалить спринт | ✅ |
| PUT | `/:id/start` | Начать спринт | ✅ |
| PUT | `/:id/complete` | Завершить спринт | ✅ |
| GET | `/:id/tasks` | Задачи спринта | ✅ |
| GET | `/:id/burndown` | Burndown chart | ✅ |

## 🎯 Вехи проекта

**Base URL:** `/api/milestones`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список вех | ✅ |
| POST | `/` | Создать веху | ✅ |
| GET | `/:id` | Получить веху | ✅ |
| PUT | `/:id` | Обновить веху | ✅ |
| DELETE | `/:id` | Удалить веху | ✅ |
| PUT | `/:id/complete` | Отметить завершенной | ✅ |
| PUT | `/:id/pay` | Отметить оплаченной | ✅ |

## 💾 Репозитории

**Base URL:** `/api/repositories`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список репозиториев | ✅ |
| POST | `/` | Добавить репозиторий | ✅ |
| GET | `/:id` | Получить репозиторий | ✅ |
| PUT | `/:id` | Обновить репозиторий | ✅ |
| DELETE | `/:id` | Удалить репозиторий | ✅ |
| GET | `/:id/commits` | Последние коммиты | ✅ |

## 🛠️ Технологии

**Base URL:** `/api/technologies`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список технологий | ✅ |
| POST | `/` | Добавить технологию | ✅ |
| GET | `/:id` | Получить технологию | ✅ |
| PUT | `/:id` | Обновить технологию | ✅ |
| DELETE | `/:id` | Удалить технологию | ✅ |

## 💳 Подписки

**Base URL:** `/api/subscriptions`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список подписок | ✅ |
| POST | `/` | Добавить подписку | ✅ |
| GET | `/:id` | Получить подписку | ✅ |
| PUT | `/:id` | Обновить подписку | ✅ |
| DELETE | `/:id` | Удалить подписку | ✅ |
| PUT | `/:id/renew` | Продлить подписку | ✅ |
| PUT | `/:id/cancel` | Отменить подписку | ✅ |

## 💰 Расходы на проекты

**Base URL:** `/api/project-expenses`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список расходов | ✅ |
| POST | `/` | Добавить расход | ✅ |
| GET | `/:id` | Получить расход | ✅ |
| PUT | `/:id` | Обновить расход | ✅ |
| DELETE | `/:id` | Удалить расход | ✅ |
| PUT | `/:id/approve` | Утвердить расход | ✅ Manager |
| POST | `/:id/upload-receipt` | Загрузить чек | ✅ |

## 📋 План счетов

**Base URL:** `/api/accounts`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список счетов | ✅ |
| POST | `/` | Создать счет | ✅ Admin |
| GET | `/:id` | Получить счет | ✅ |
| PUT | `/:id` | Обновить счет | ✅ Admin |
| DELETE | `/:id` | Удалить счет | ✅ Admin |
| GET | `/:code/balance` | Баланс счета | ✅ |
| GET | `/:code/transactions` | Проводки по счету | ✅ |

## 📝 Бухгалтерские проводки

**Base URL:** `/api/transactions`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список проводок | ✅ |
| POST | `/` | Создать проводку | ✅ |
| GET | `/:id` | Получить проводку | ✅ |
| PUT | `/:id` | Обновить проводку | ✅ |
| DELETE | `/:id` | Удалить проводку | ✅ |
| POST | `/:id/post` | Провести проводку | ✅ |
| POST | `/:id/unpost` | Отменить проведение | ✅ |

## 🏢 Контрагенты

**Base URL:** `/api/counterparties`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список контрагентов | ✅ |
| POST | `/` | Создать контрагента | ✅ |
| GET | `/:id` | Получить контрагента | ✅ |
| PUT | `/:id` | Обновить контрагента | ✅ |
| DELETE | `/:id` | Удалить контрагента | ✅ |
| GET | `/:id/invoices` | Счета контрагента | ✅ |
| GET | `/:id/payments` | Платежи контрагента | ✅ |

## 📄 Контракты

**Base URL:** `/api/contracts`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список контрактов | ✅ |
| POST | `/` | Создать контракт | ✅ |
| GET | `/:id` | Получить контракт | ✅ |
| PUT | `/:id` | Обновить контракт | ✅ |
| DELETE | `/:id` | Удалить контракт | ✅ |
| PUT | `/:id/activate` | Активировать контракт | ✅ |
| PUT | `/:id/complete` | Завершить контракт | ✅ |

## 🧾 Инвойсы

**Base URL:** `/api/invoices`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список инвойсов | ✅ |
| POST | `/` | Создать инвойс | ✅ |
| GET | `/:id` | Получить инвойс | ✅ |
| PUT | `/:id` | Обновить инвойс | ✅ |
| DELETE | `/:id` | Удалить инвойс | ✅ |
| PUT | `/:id/send` | Отправить клиенту | ✅ |
| PUT | `/:id/pay` | Отметить оплаченным | ✅ |
| GET | `/:id/pdf` | Скачать PDF | ✅ |

## 💸 Платежи

**Base URL:** `/api/payments`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список платежей | ✅ |
| POST | `/` | Создать платеж | ✅ |
| GET | `/:id` | Получить платеж | ✅ |
| PUT | `/:id` | Обновить платеж | ✅ |
| DELETE | `/:id` | Удалить платеж | ✅ |
| PUT | `/:id/confirm` | Подтвердить платеж | ✅ |

## 💵 Кассовые операции

**Base URL:** `/api/cash-operations`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список операций | ✅ |
| POST | `/` | Создать операцию | ✅ |
| GET | `/:id` | Получить операцию | ✅ |
| PUT | `/:id` | Обновить операцию | ✅ |
| DELETE | `/:id` | Удалить операцию | ✅ |
| GET | `/cash-book` | Кассовая книга | ✅ |
| GET | `/balance` | Остаток в кассе | ✅ |

## 🏦 Банковские операции

**Base URL:** `/api/bank-operations`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список операций | ✅ |
| POST | `/` | Создать операцию | ✅ |
| GET | `/:id` | Получить операцию | ✅ |
| PUT | `/:id` | Обновить операцию | ✅ |
| DELETE | `/:id` | Удалить операцию | ✅ |
| POST | `/import` | Импорт из банка | ✅ |
| GET | `/balance` | Остаток на счете | ✅ |

## 📦 Товары и оборудование

**Base URL:** `/api/products`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список товаров | ✅ |
| POST | `/` | Создать товар | ✅ |
| GET | `/:id` | Получить товар | ✅ |
| PUT | `/:id` | Обновить товар | ✅ |
| DELETE | `/:id` | Удалить товар | ✅ |
| GET | `/:id/stock` | Остатки товара | ✅ |
| GET | `/:id/history` | История операций | ✅ |

## 📥📤 Складские операции

**Base URL:** `/api/warehouse-operations`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список операций | ✅ |
| POST | `/` | Создать операцию | ✅ |
| GET | `/:id` | Получить операцию | ✅ |
| PUT | `/:id` | Обновить операцию | ✅ |
| DELETE | `/:id` | Удалить операцию | ✅ |
| GET | `/stock` | Остатки на складе | ✅ |

## 📊 Инвентаризация

**Base URL:** `/api/inventories`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список инвентаризаций | ✅ |
| POST | `/` | Создать инвентаризацию | ✅ |
| GET | `/:id` | Получить инвентаризацию | ✅ |
| PUT | `/:id` | Обновить инвентаризацию | ✅ |
| DELETE | `/:id` | Удалить инвентаризацию | ✅ |
| PUT | `/:id/complete` | Завершить инвентаризацию | ✅ |

## 👨‍💼 Сотрудники

**Base URL:** `/api/employees`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список сотрудников | ✅ |
| POST | `/` | Добавить сотрудника | ✅ Admin |
| GET | `/:id` | Получить сотрудника | ✅ |
| PUT | `/:id` | Обновить сотрудника | ✅ Admin |
| DELETE | `/:id` | Удалить сотрудника | ✅ Admin |
| GET | `/:id/time-entries` | Время сотрудника | ✅ |
| GET | `/:id/salary-history` | История зарплат | ✅ |

## 💰 Зарплата

**Base URL:** `/api/salary-payments`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список выплат | ✅ |
| POST | `/` | Создать выплату | ✅ Admin |
| GET | `/:id` | Получить выплату | ✅ |
| PUT | `/:id` | Обновить выплату | ✅ Admin |
| DELETE | `/:id` | Удалить выплату | ✅ Admin |
| POST | `/calculate` | Рассчитать зарплату | ✅ Admin |

## 📑 Налоги

**Base URL:** `/api/tax-records`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список налогов | ✅ |
| POST | `/` | Создать запись | ✅ |
| GET | `/:id` | Получить запись | ✅ |
| PUT | `/:id` | Обновить запись | ✅ |
| DELETE | `/:id` | Удалить запись | ✅ |
| POST | `/calculate` | Рассчитать налоги | ✅ |

## 💼 Бюджеты

**Base URL:** `/api/budgets`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список бюджетов | ✅ |
| POST | `/` | Создать бюджет | ✅ |
| GET | `/:id` | Получить бюджет | ✅ |
| PUT | `/:id` | Обновить бюджет | ✅ |
| DELETE | `/:id` | Удалить бюджет | ✅ |
| GET | `/variance` | Анализ отклонений | ✅ |

## 🖥️ Основные средства

**Base URL:** `/api/assets`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список ОС | ✅ |
| POST | `/` | Добавить ОС | ✅ |
| GET | `/:id` | Получить ОС | ✅ |
| PUT | `/:id` | Обновить ОС | ✅ |
| DELETE | `/:id` | Удалить ОС | ✅ |
| PUT | `/:id/move` | Переместить ОС | ✅ |
| PUT | `/:id/dispose` | Списать ОС | ✅ |

## 📉 Амортизация

**Base URL:** `/api/depreciations`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список амортизаций | ✅ |
| POST | `/` | Создать амортизацию | ✅ |
| GET | `/:id` | Получить амортизацию | ✅ |
| PUT | `/:id` | Обновить амортизацию | ✅ |
| DELETE | `/:id` | Удалить амортизацию | ✅ |
| POST | `/calculate` | Рассчитать амортизацию | ✅ |

## 🤝 Акты сверки

**Base URL:** `/api/reconciliations`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Список актов | ✅ |
| POST | `/` | Создать акт | ✅ |
| GET | `/:id` | Получить акт | ✅ |
| PUT | `/:id` | Обновить акт | ✅ |
| DELETE | `/:id` | Удалить акт | ✅ |
| PUT | `/:id/send` | Отправить акт | ✅ |
| PUT | `/:id/confirm` | Подтвердить акт | ✅ |
| GET | `/:id/pdf` | Скачать PDF | ✅ |

## 📊 IT-отчеты и аналитика

**Base URL:** `/api/it-reports`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/dashboard` | IT Dashboard | ✅ |
| GET | `/project-profitability` | Прибыльность проектов | ✅ |
| GET | `/team-utilization` | Утилизация команды | ✅ |
| GET | `/time-tracking` | Отчет по времени | ✅ |
| GET | `/sprint-performance` | Performance спринтов | ✅ |
| GET | `/client-revenue` | Выручка от клиентов | ✅ |
| GET | `/technology-stack` | Стек технологий | ✅ |
| GET | `/subscription-costs` | Расходы на подписки | ✅ |
| GET | `/task-metrics` | Метрики задач | ✅ |
| GET | `/milestone-tracking` | Трекинг вех | ✅ |

## 📈 Финансовые отчеты

**Base URL:** `/api/reports`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/balance-sheet` | Баланс | ✅ |
| GET | `/profit-loss` | Прибыль и убытки | ✅ |
| GET | `/cash-flow` | Движение денежных средств | ✅ |
| GET | `/accounts-receivable` | Дебиторская задолженность | ✅ |
| GET | `/vat-report` | Отчет по НДС | ✅ |
| GET | `/inventory-valuation` | Оценка запасов | ✅ |
| GET | `/fixed-assets-report` | Отчет по ОС | ✅ |
| GET | `/payroll-report` | Зарплатная ведомость | ✅ |

## 🔍 Query Parameters

### Общие параметры

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Номер страницы | `?page=1` |
| `limit` | number | Количество на странице | `?limit=20` |
| `sort` | string | Поле сортировки | `?sort=createdAt` |
| `order` | string | Порядок (asc/desc) | `?order=desc` |
| `search` | string | Поиск | `?search=keyword` |

### Фильтры по датам

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `startDate` | date | Дата начала | `?startDate=2024-01-01` |
| `endDate` | date | Дата окончания | `?endDate=2024-12-31` |
| `date` | date | Конкретная дата | `?date=2024-06-15` |

### Фильтры по сущностям

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `projectId` | number | ID проекта | `?projectId=1` |
| `clientId` | number | ID клиента | `?clientId=5` |
| `employeeId` | number | ID сотрудника | `?employeeId=3` |
| `status` | string | Статус | `?status=active` |
| `type` | string | Тип | `?type=feature` |

## 📝 Response Format

### Успешный ответ

```json
{
  "success": true,
  "data": { /* ... data ... */ },
  "message": "Operation successful"
}
```

### Список с пагинацией

```json
{
  "success": true,
  "data": [ /* ... items ... */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Ошибка

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 🔒 Authentication

Все защищенные endpoints требуют JWT токен в заголовке:

```
Authorization: Bearer <token>
```

Токен получается при успешном логине через `/api/auth/login`

## 📊 Итого

- **Всего endpoints**: 100+
- **Модулей**: 30+
- **CRUD операций**: 150+
- **Отчетов**: 18+
- **Query параметров**: 20+

---

**Полная документация доступна в Swagger**: http://localhost:4000/api-docs 🚀
