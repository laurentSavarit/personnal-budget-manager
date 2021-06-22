-- Revert personnal-budget-manager:create_tables from pg

BEGIN;

DROP TABLE income;
DROP TABLE spent;
DROP TABLE saving;
DROP TABLE member;
DROP TABLE category;

DROP DOMAIN format_email;
DROP DOMAIN posreal;

COMMIT;
