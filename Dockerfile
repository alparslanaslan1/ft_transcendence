FROM php:8.1-fpm

RUN apt-get update \
 && apt-get install -y \
    libsqlite3-dev libzip-dev zip unzip git \
 && docker-php-ext-install pdo_sqlite zip

# Composer’ı kopyala
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .
RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html/logs

CMD ["php-fpm"]
