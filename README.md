# Laravel Nuxt Template Boilerplate

## Introduction

Boilerplate with Laravel framework and NuxtJS. These instructions will guide you through setting up the project on your local development environment.

### Prerequisites

Ensure you have the following software installed on your system:

- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/index.html) or any other local server environment
- [PHP 8.2](https://www.php.net/) or a compatible version
- [GitHub CLI](https://cli.github.com/) (optional)
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) (optional)

### 1. Clone the project
```
git clone https://github.com/maktezi/APP.git
```

### 2. Goto project directory
```
cd APP
```

### 3. Copy the .env.example to .env then Install Composer
```
cp .env.example .env
composer install
```
### 4. Run migrations and db seed
```
php artisan migrate:fresh
php artisan db:seed
```

### 5. Then install npm
```
npm install
npm install --save-dev concurrently
```

### 6. Then run the server
```
 npm start
```
