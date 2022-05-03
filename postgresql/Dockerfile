FROM postgres:14.2

LABEL Bradley Reeves "reevesbra@outlook.com"

# By copying it to below directory, init.sql runs each time the postgres container is started.
COPY init.sql /docker-entrypoint-initdb.d