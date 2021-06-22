-- Deploy personnal-budget-manager:create_tables to pg

BEGIN;

--Domaine pour avoir un nombre réel positif
CREATE DOMAIN posreal AS REAL CHECK (VALUE > 0);

--Domaine pour controler le format de l'email
CREATE DOMAIN format_email AS TEXT CHECK (
    VALUE ~ '^\w+[\.\-\_]?\w+@\w+[\.\-\_]?\w+\.\w+$');

--table categories
CREATE TABLE category (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE 
);

--table membres
CREATE TABLE member (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email format_email NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL  
);

--table epargnes
CREATE TABLE saving (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    amount posreal NOT NULL,
    member_id INT NOT NULL REFERENCES member(id)
);

--table dépenses
CREATE TABLE spent (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    intern_ref TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    amount posreal NOT NULL,
    date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    member_id INT NOT NULL REFERENCES member(id),
    category_id INT NOT NULL REFERENCES category(id)
);

--table revenus
CREATE TABLE income (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    intern_ref TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    amount posreal NOT NULL,
    date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    member_id INT NOT NULL REFERENCES member(id),
    category_id INT NOT NULL REFERENCES category(id)
);


COMMIT;
