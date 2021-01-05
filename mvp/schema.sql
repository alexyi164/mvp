DROP DATABASE IF EXISTS boarddash;

CREATE DATABASE boarddash;

\c boarddash;

CREATE TABLE IF NOT EXISTS allstates (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    state varchar(255) NOT NULL,
    death int NOT NULL,
    negative int NOT NULL,
    positive int NOT NULL,
    positiveCasesViral int,
    positiveIncrease int NOT NULL,
    totalTestResults int NOT NULL
);