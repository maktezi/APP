<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>APP - Api</title>
    </head>
    <body>
      <main class="mt-6">
        <div>API for Web App</div>
        <div>Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})</div>
      </main>
    </body>
</html>

<style>
  body {
    background-color: #000;
    color: #fff;
  }
</style>