-- Verify personnal-budget-manager:create_views on pg

BEGIN;

SELECT * FROM saving_with_details WHERE false;
SELECT * FROM income_with_details WHERE false;
SELECT * FROM spent_with_details WHERE false;


ROLLBACK;
