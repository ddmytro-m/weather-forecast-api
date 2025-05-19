# Weather API

## Installation
Set up the environment variables:

### API
`API_KEY` – get one from [weatherapi.com](https://www.weatherapi.com/)

### Databases
**Postgres:** <br>
`POSTGRES_DB` – database name <br>
`POSTGRES_USER` – database user <br>
`POSTGRES_PASSWORD` – database password <br>
`DATABASE_URL` – database connection url: postgres://{POSTGRES_USER}:{POSTGRES_PASSWORD}@postgres:5432/{POSTGRES_DB}?schema=public

**REDIS:** <br>
`REDIS_PORT` – redis port *(required)* <br>
`REDIS_PASSWORD` – redis password *(required)* <br>
`REDIS_USER` – redis user *(required)* <br>
`REDIS_USER_PASSWORD` – redis user password *(required)* <br>

### Mail
**Common**: <br>
`MAIL_HOST` – provider smtp url *(required)* <br>
`MAIL_PORT` – smtp port <br>
`MAIL_USER` – email adress *(required)* <br>
`MAIL_ORGANISATION_NAME` – mail sender name <br>

**Authentication:** <br>
You should pass authentication method and corresponding credentials

`MAIL_AUTH_METHOD` – authentication method (OAuth2 or login)

**Login:** <br>
`MAIL_USER_PASSWORD` – user password *(required)*

**OAuth2** <br>
`MAIL_CLIENT_ID` – oauth client id *(required)* <br>
`MAIL_CLIENT_SECRET` – oauth client secret *(required)*

At least one of the following: <br>
`MAIL_REFRESH_TOKEN` – oauth refresh token *(recommended)* <br>
`MAIL_ACCESS_TOKEN` – oauth access token

---

After that, launch the app with the following command:
```sh
docker-compose up --build
```

Front-end will be available at http://localhost <br>
API will be available at http://localhost/api