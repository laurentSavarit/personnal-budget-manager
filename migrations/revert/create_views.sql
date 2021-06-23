-- Revert personnal-budget-manager:create_views from pg

BEGIN;

DROP VIEW saving_with_details;
DROP VIEW income_with_details;
DROP VIEW spent_with_details;

COMMIT;
