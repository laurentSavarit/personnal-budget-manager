-- Revert personnal-budget-manager:create_functions from pg

BEGIN;

DROP FUNCTION update_category(json);
DROP FUNCTION insert_category(json);

DROP FUNCTION update_spent(json);
DROP FUNCTION insert_spent(json);

DROP FUNCTION update_income(json);
DROP FUNCTION insert_income(json);

DROP FUNCTION update_member(json);
DROP FUNCTION insert_member(json);

DROP FUNCTION update_saving(json);
DROP FUNCTION insert_saving(json);

COMMIT;
