-- Verify personnal-budget-manager:create_tables on pg

BEGIN;

SELECT * FROM category WHERE false;
SELECT * FROM member WHERE false;
SELECT * FROM saving WHERE false;
SELECT * FROM spent WHERE false;
SELECT * FROM income WHERE false;

ROLLBACK;
