/**
 * Скрипт наполнения БД тестовыми данными.
 * Запускает миграцию 001 (users + админ), затем 002-029, затем вставляет тестовые записи.
 * Запуск: npm run seed (из папки backend)
 */
import pool from './db';
import { hashPassword } from '../utils/password';
import { runMigrations as runInitialMigration } from './migrations/001_initial_schema';
import * as m002 from './migrations/002_create_account_table';
import * as m003 from './migrations/003_create_transaction_table';
import * as m004 from './migrations/004_create_counterparty_table';
import * as m005 from './migrations/005_create_contract_table';
import * as m006 from './migrations/006_create_invoice_table';
import * as m007 from './migrations/007_create_payment_table';
import * as m008 from './migrations/008_create_cashoperation_table';
import * as m009 from './migrations/009_create_bankoperation_table';
import * as m010 from './migrations/010_create_product_table';
import * as m011 from './migrations/011_create_warehouseoperation_table';
import * as m012 from './migrations/012_create_inventory_table';
import * as m013 from './migrations/013_create_employee_table';
import * as m014 from './migrations/014_create_salarypayment_table';
import * as m015 from './migrations/015_create_taxrecord_table';
import * as m016 from './migrations/016_create_budget_table';
import * as m017 from './migrations/017_create_asset_table';
import * as m018 from './migrations/018_create_depreciation_table';
import * as m019 from './migrations/019_create_reconciliation_table';
import * as m020 from './migrations/020_create_project_table';
import * as m021 from './migrations/021_create_client_table';
import * as m022 from './migrations/022_create_task_table';
import * as m023 from './migrations/023_create_timeentry_table';
import * as m024 from './migrations/024_create_sprint_table';
import * as m025 from './migrations/025_create_repository_table';
import * as m026 from './migrations/026_create_technology_table';
import * as m027 from './migrations/027_create_subscription_table';
import * as m028 from './migrations/028_create_projectexpense_table';
import * as m029 from './migrations/029_create_milestone_table';

const migrations = [
  m002, m003, m004, m005, m006, m007, m008, m009, m010,
  m011, m012, m013, m014, m015, m016, m017, m018, m019, m020,
  m021, m022, m023, m024, m025, m026, m027, m028, m029,
];

async function runMigrations(): Promise<void> {
  console.log('Запуск миграции 001 (users)...');
  await runInitialMigration();
  console.log('Запуск миграций 002-029...');
  for (const m of migrations) {
    await m.up();
  }
  console.log('Миграции выполнены.');
}

async function seed(): Promise<void> {
  const client = await pool.connect();

  try {
    await runMigrations();

    // Проверяем, есть ли уже тестовые данные (кроме дефолтного админа)
    const userCount = (await pool.query('SELECT COUNT(*) FROM users')).rows[0].count;
    if (parseInt(userCount, 10) > 1) {
      console.log('В БД уже есть пользователи (кроме админа). Пропуск сидирования пользователей.');
    } else {
      const testPassword = await hashPassword('test123');
      await pool.query(
        `INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO NOTHING`,
        ['user@test.com', testPassword, 'Тестовый Пользователь', 'user']
      );
      console.log('Добавлен тестовый пользователь: user@test.com / test123');
    }

    const clientCount = (await pool.query('SELECT COUNT(*) FROM clients')).rows[0].count;
    if (parseInt(clientCount, 10) === 0) {
      await pool.query(
        `INSERT INTO clients (name, contactPerson, email, phone, company, website, address, inn, contractNumber, status, industryType, isActive)
         VALUES
         ('ООО Ромашка', 'Иван Петров', 'ivan@romashka.ru', '+7 495 111-22-33', 'ООО Ромашка', 'https://romashka.ru', 'г. Москва, ул. Цветочная, 1', '7707123456', 'Д-001', 'active', 'retail', true),
         ('ИП Сидоров', 'Пётр Сидоров', 'sidorov@mail.ru', '+7 916 222-33-44', 'ИП Сидоров', null, 'г. Санкт-Петербург, Невский пр., 10', '781612345678', 'Д-002', 'active', 'services', true),
         ('АО ТехноСервис', 'Анна Козлова', 'kozlov@techno.ru', '+7 495 333-44-55', 'АО ТехноСервис', 'https://techno.ru', 'г. Москва, ул. Техническая, 5', '7705987654321', 'Д-003', 'active', 'it', true)`
      );
      console.log('Добавлено 3 клиента.');
    }

    const counterpartyCount = (await pool.query('SELECT COUNT(*) FROM counterpartys')).rows[0].count;
    if (parseInt(counterpartyCount, 10) === 0) {
      await pool.query(
        `INSERT INTO counterpartys (name, type, inn, kpp, address, phone, email, bankaccount, bankname, bik, isactive)
         VALUES
         ('ООО Поставщик Плюс', 'supplier', '7707123456', '770701001', 'г. Москва, ул. Складская, 2', '+7 495 100-00-01', 'supplier@plus.ru', '40702810000000000001', 'ПАО Сбербанк', '044525225', true),
         ('ООО Заказчик Сервис', 'customer', '7707987654', '770701002', 'г. Москва, ул. Заказная, 3', '+7 495 200-00-02', 'client@zakaz.ru', '40702810000000000002', 'ПАО ВТБ', '044525187', true)`
      );
      console.log('Добавлено 2 контрагента.');
    }

    const accountCount = (await pool.query('SELECT COUNT(*) FROM accounts')).rows[0].count;
    if (parseInt(accountCount, 10) === 0) {
      await pool.query(
        `INSERT INTO accounts (code, name, type, parentcode, description, isactive)
         VALUES
         ('50', 'Касса', 'asset', null, 'Наличные в кассе', true),
         ('51', 'Расчётный счёт', 'asset', null, 'Денежные средства на р/с', true),
         ('60', 'Расчёты с поставщиками', 'liability', null, 'Задолженность перед поставщиками', true),
         ('62', 'Расчёты с покупателями', 'asset', null, 'Дебиторская задолженность', true),
         ('70', 'Расчёты с персоналом', 'liability', null, 'Зарплата и прочее', true),
         ('80', 'Уставный капитал', 'equity', null, 'УК организации', true),
         ('90', 'Выручка', 'revenue', null, 'Доходы от продаж', true),
         ('91', 'Прочие доходы и расходы', 'expense', null, 'Прочие операции', true)`
      );
      console.log('Добавлено 8 счетов.');
    }

    const contractCount = (await pool.query('SELECT COUNT(*) FROM contracts')).rows[0].count;
    if (parseInt(contractCount, 10) === 0) {
      const cp = (await pool.query('SELECT id FROM counterpartys LIMIT 1')).rows[0];
      const cpId = cp ? cp.id : 1;
      await pool.query(
        `INSERT INTO contracts (number, counterpartyid, type, signdate, startdate, enddate, amount, status, description)
         VALUES
         ('ДОГ-2024-001', $1, 'service', '2024-01-15', '2024-01-15', '2024-12-31', 1200000, 'active', 'Договор на оказание услуг'),
         ('ДОГ-2024-002', $1, 'supply', '2024-02-01', '2024-02-01', '2025-01-31', 500000, 'active', 'Договор поставки')`,
        [cpId]
      );
      console.log('Добавлено 2 договора.');
    }

    const projectCount = (await pool.query('SELECT COUNT(*) FROM projects')).rows[0].count;
    if (parseInt(projectCount, 10) === 0) {
      const cl = (await pool.query('SELECT id FROM clients LIMIT 1')).rows[0];
      const clientId = cl ? cl.id : 1;
      await pool.query(
        `INSERT INTO projects (name, clientid, code, type, status, startdate, enddate, budget, actualcost, hourlyrate, description, repository, isactive)
         VALUES
         ('Портал госуслуг', $1, 'PRJ-001', 'development', 'in_progress', '2024-03-01', '2024-12-01', 3000000, 800000, 2500, 'Разработка веб-портала', 'https://github.com/company/portal', true),
         ('Мобильное приложение', $1, 'PRJ-002', 'development', 'planning', '2024-06-01', '2025-03-01', 2000000, 0, 2200, 'iOS/Android приложение', null, true)`,
        [clientId]
      );
      console.log('Добавлено 2 проекта.');
    }

    const employeeCount = (await pool.query('SELECT COUNT(*) FROM employees')).rows[0].count;
    if (parseInt(employeeCount, 10) === 0) {
      await pool.query(
        `INSERT INTO employees (firstname, lastname, middlename, position, department, hiredate, salary, phone, email, isactive)
         VALUES
         ('Алексей', 'Иванов', 'Сергеевич', 'Разработчик', 'IT', '2022-01-10', 120000, '+7 903 111-11-11', 'ivanov@company.ru', true),
         ('Мария', 'Кузнецова', 'Андреевна', 'Бухгалтер', 'Бухгалтерия', '2021-05-15', 85000, '+7 903 222-22-22', 'kuznetsova@company.ru', true),
         ('Дмитрий', 'Смирнов', null, 'Менеджер проектов', 'Управление', '2023-03-01', 95000, '+7 903 333-33-33', 'smirnov@company.ru', true)`
      );
      console.log('Добавлено 3 сотрудника.');
    }

    const productCount = (await pool.query('SELECT COUNT(*) FROM products')).rows[0].count;
    if (parseInt(productCount, 10) === 0) {
      await pool.query(
        `INSERT INTO products (code, name, type, unit, price, cost, vatrate, description, isactive)
         VALUES
         ('SRV-001', 'Консультация', 'service', 'час', 3000, 1500, 20, 'Консультационные услуги', true),
         ('SRV-002', 'Разработка модуля', 'service', 'шт', 50000, 25000, 20, 'Разработка по ТЗ', true),
         ('PRD-001', 'Лицензия ПО', 'product', 'шт', 15000, 10000, 20, 'Годовая лицензия', true)`
      );
      console.log('Добавлено 3 продукта/услуги.');
    }

    const budgetCount = (await pool.query('SELECT COUNT(*) FROM budgets')).rows[0].count;
    if (parseInt(budgetCount, 10) === 0) {
      await pool.query(
        `INSERT INTO budgets (period, category, type, plannedamount, actualamount, variance, notes)
         VALUES
         ('2024-Q1', 'Зарплата', 'expense', 900000, 870000, 30000, 'План по ФОТ'),
         ('2024-Q1', 'Закупки', 'expense', 200000, 215000, -15000, 'Оборудование и ПО'),
         ('2024-Q1', 'Выручка', 'revenue', 1500000, 1420000, 80000, 'План продаж')`
      );
      console.log('Добавлено 3 записи бюджета.');
    }

    const taskCount = (await pool.query('SELECT COUNT(*) FROM tasks')).rows[0].count;
    if (parseInt(taskCount, 10) === 0) {
      const proj = (await pool.query('SELECT id FROM projects LIMIT 1')).rows[0];
      const emp = (await pool.query('SELECT id FROM employees LIMIT 1')).rows[0];
      const projectId = proj ? proj.id : 1;
      const assignedTo = emp ? emp.id : 1;
      await pool.query(
        `INSERT INTO tasks (projectid, title, description, type, priority, status, assignedto, estimatedhours, actualhours, startdate, duedate)
         VALUES
         ($1, 'Дизайн главной страницы', 'Макеты и прототипы', 'design', 'high', 'in_progress', $2, 40, 20, '2024-03-01', '2024-04-15'),
         ($1, 'Бэкенд API', 'REST API для портала', 'development', 'high', 'todo', $2, 80, 0, '2024-04-01', '2024-06-01')`,
        [projectId, assignedTo]
      );
      console.log('Добавлено 2 задачи.');
    }

    const invoiceCount = (await pool.query('SELECT COUNT(*) FROM invoices')).rows[0].count;
    if (parseInt(invoiceCount, 10) === 0) {
      const cp = (await pool.query('SELECT id FROM counterpartys LIMIT 1')).rows[0];
      const contract = (await pool.query('SELECT id FROM contracts LIMIT 1')).rows[0];
      const cpId = cp ? cp.id : 1;
      const contractId = contract ? contract.id : 1;
      await pool.query(
        `INSERT INTO invoices (number, counterpartyid, contractid, date, duedate, totalamount, vatamount, status, paid, paiddate)
         VALUES
         ('INV-2024-001', $1, $2, '2024-02-01', '2024-02-15', 120000, 20000, 'paid', true, '2024-02-10'),
         ('INV-2024-002', $1, $2, '2024-03-01', '2024-03-15', 180000, 30000, 'sent', false, null)`,
        [cpId, contractId]
      );
      console.log('Добавлено 2 счёта.');
    }

    const technologyCount = (await pool.query('SELECT COUNT(*) FROM technologys')).rows[0].count;
    if (parseInt(technologyCount, 10) === 0) {
      await pool.query(
        `INSERT INTO technologys (name, category, version, description, licensetype, isactive)
         VALUES
         ('TypeScript', 'language', '5.3', 'Язык программирования', 'MIT', true),
         ('Vue.js', 'frontend', '3.4', 'Фреймворк для UI', 'MIT', true),
         ('PostgreSQL', 'database', '16', 'Реляционная БД', 'PostgreSQL', true),
         ('Node.js', 'backend', '20', 'Среда выполнения', 'MIT', true)`
      );
      console.log('Добавлено 4 технологии.');
    }

    const repositoryCount = (await pool.query('SELECT COUNT(*) FROM repositorys')).rows[0].count;
    if (parseInt(repositoryCount, 10) === 0) {
      const proj = (await pool.query('SELECT id FROM projects LIMIT 1')).rows[0];
      const projectId = proj ? proj.id : 1;
      await pool.query(
        `INSERT INTO repositorys (projectid, name, url, provider, isprivate, language, status)
         VALUES
         ($1, 'accounting-system', 'https://github.com/company/accounting-system', 'github', false, 'TypeScript', 'active'),
         ($1, 'portal-frontend', 'https://github.com/company/portal-frontend', 'github', false, 'Vue', 'active')`,
        [projectId]
      );
      console.log('Добавлено 2 репозитория.');
    }

    const sprintCount = (await pool.query('SELECT COUNT(*) FROM sprints')).rows[0].count;
    if (parseInt(sprintCount, 10) === 0) {
      const proj = (await pool.query('SELECT id FROM projects LIMIT 1')).rows[0];
      const projectId = proj ? proj.id : 1;
      await pool.query(
        `INSERT INTO sprints (projectid, name, startdate, enddate, goal, status)
         VALUES
         ($1, 'Спринт 1', '2024-03-01', '2024-03-14', 'Старт разработки', 'completed'),
         ($1, 'Спринт 2', '2024-03-15', '2024-03-28', 'API и дизайн', 'active')`,
        [projectId]
      );
      console.log('Добавлено 2 спринта.');
    }

    console.log('\nСидирование завершено.');
  } catch (e) {
    console.error('Ошибка сидирования:', e);
    throw e;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
