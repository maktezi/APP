# Laravel Nuxt App

## Introduction

This is a full-stack application combining the Laravel framework and Nuxt.js using Graphql and simple authentication with Laravel Sanctum. These instructions will help you set up the project on your local development environment.

### Prerequisites

Make sure you have the following software installed on your system:
- [Composer](https://getcomposer.org/) - PHP dependency manager
- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [XAMPP](https://www.apachefriends.org/index.html) or another local server environment
- [PHP 8.2](https://www.php.net/) or a compatible version
- [GitHub CLI](https://cli.github.com/) (optional)
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) (optional)

## Installation Steps

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
```

### 6. Then run the server
```
 npm start
```
