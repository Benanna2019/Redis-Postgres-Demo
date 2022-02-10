# Demo Express/postgres/redis application

## SETUP

`yarn install` to make sure you have all dependencies installed.

The `.env` file details the expected locations/credentials for postgres and redis.

For postgres, a database called `country_listing_api` is expected to exist (as per `.env` file).

The database has a single table:

`CREATE TABLE countries (id int not null, name text not null);`

## START UP

`node index.js`

## CURL REQUESTS

`curl -X GET localhost:8080/countries` returns a list of countries in `data`. Look to `source` to see if the data came from the database or the cache.

`curl -X POST localhost:8080/clear_cache` clears the cache.

# Redis-Postgres-Demo
