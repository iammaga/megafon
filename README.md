<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/MegaFon_logo_without_text.svg/2048px-MegaFon_logo_without_text.svg.png" width="100"></a></p>

## О проекте
### CRM приложение
Этот проект построен на **Laravel 8**, использует **Sanctum** для аутентификации и включает **Vue.js** для фронтенда. В качестве базы данных используется **MySQL**, а сборка фронтенда выполняется с помощью **Laravel Mix**.

## Требования
Перед началом работы убедитесь, что у вас установлены:
- **PHP** (>=7.3 | >=8.0)
- **Composer**
- **Node.js** и **npm**
- **MySQL**

## Установка проекта
Следуйте этим шагам, чтобы настроить и запустить проект локально.

### 1. Клонирование репозитория
```bash
git clone https://github.com/iammaga/megafon.git
cd megafon
```

### 2. Установка зависимостей
```bash
composer install
npm install
```

### 3. Настройка `.env`
```bash
cp .env.example .env
```
Откройте файл `.env` и укажите параметры подключения к базе данных:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=megafon
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Генерация ключа приложения
```bash
php artisan key:generate
```

### 5. Запуск миграций и сидеров
```bash
php artisan migrate --seed
```

### 6. Запуск локального сервера
```bash
php artisan serve
```

### 7. Данные Админа
```bash
email => admin@admin.com
password => password
```

Откройте браузер и перейдите по адресу [http://localhost:8000](http://localhost:8000).

## Сборка фронтенда
Если проект использует Vue.js или другие фронтенд-ресурсы, выполните команду:
```bash
npm run dev
```
Для production-сборки:
```bash
npm run prod
```

## Используемые технологии
- **Backend**: Laravel 8
- **Frontend**: Vue.js 3, Vue Router, Vuex
- **API аутентификация**: Laravel Sanctum
- **Сборка**: Laravel Mix
- **База данных**: MySQL
- **Дополнительные пакеты**: Guzzle, Laravel UI, Bootstrap 5

## Контакты
Разработчик: **Muhammad Zikirzoda**  
GitHub: [iammaga](https://github.com/iammaga/)

