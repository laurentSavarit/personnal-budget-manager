-- Deploy personnal-budget-manager:create_functions to pg

BEGIN;

--fonctions pour insert et update pour chaque model
--category
CREATE FUNCTION insert_category(json) RETURNS category AS $$

    INSERT INTO category(label)
    VALUES ($1->>'label')
    RETURNING *;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_category(json) RETURNS void AS $$

    UPDATE category
    SET label = $1->>'label'
    WHERE id = ($1->>'id')::int;

$$ LANGUAGE SQL STRICT;

--income
CREATE FUNCTION insert_income(json) RETURNS income AS $$

    INSERT INTO income(intern_ref,label,amount,date,member_id,category_id)
    VALUES (
        $1->>'intern_ref',
        $1->>'label',
        ($1->>'amount')::posreal,
        ($1->>'date')::timestamptz,
        ($1->>'member_id')::int,
        ($1->>'category_id')::int
        )
    RETURNING *;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_income(json) RETURNS void AS $$

    UPDATE income
    SET 
        label = $1->>'label',
        intern_ref = $1->>'intern_ref',
        amount = ($1->>'amount')::posreal,
        date = ($1->>'date')::timestamptz,
        member_id = ($1->>'member_id')::int,
        category_id = ($1->>'category_id')::int
    WHERE id = ($1->>'id')::int;

$$ LANGUAGE SQL STRICT;

--spent
CREATE FUNCTION insert_spent(json) RETURNS spent AS $$

    INSERT INTO spent(intern_ref,label,amount,date,member_id,category_id)
    VALUES (
        $1->>'intern_ref',
        $1->>'label',
        ($1->>'amount')::posreal,
        ($1->>'date')::timestamptz,
        ($1->>'member_id')::int,
        ($1->>'category_id')::int
        )
    RETURNING *;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_spent(json) RETURNS void AS $$

    UPDATE spent
    SET 
        label = $1->>'label',
        intern_ref = $1->>'intern_ref',
        amount = ($1->>'amount')::posreal,
        date = ($1->>'date')::timestamptz,
        member_id = ($1->>'member_id')::int,
        category_id = ($1->>'category_id')::int
    WHERE id = ($1->>'id')::int;

$$ LANGUAGE SQL STRICT;

--member
CREATE FUNCTION insert_member(json) RETURNS member AS $$

    INSERT INTO member(first_name,last_name,email,password,role)
    VALUES (
        $1->>'first_name',
        $1->>'last_name',
        $1->>'email',
        $1->>'password',
        $1->>'role'
        )
    RETURNING *;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_member(json) RETURNS void AS $$

    UPDATE member
    SET 
        first_name = $1->>'first_name',
        last_name = $1->>'last_name',
        email = $1->>'email',
        password = $1->>'password',
        role = $1->>'role'
    WHERE id = ($1->>'id')::int;

$$ LANGUAGE SQL STRICT;


--saving
CREATE FUNCTION insert_saving(json) RETURNS saving AS $$

    INSERT INTO saving(label,amount,member_id)
    VALUES (
        $1->>'label',
        ($1->>'amount')::posreal,
        ($1->>'member_id')::int
        )
    RETURNING *;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_saving(json) RETURNS void AS $$

    UPDATE saving
    SET 
        label = $1->>'label',
        amount = ($1->>'amount')::posreal,
        member_id = ($1->>'member_id')::int
    WHERE id = ($1->>'id')::int;

$$ LANGUAGE SQL STRICT;


COMMIT;
