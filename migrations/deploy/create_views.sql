-- Deploy personnal-budget-manager:create_views to pg

BEGIN;

--view pour spent
CREATE VIEW spent_with_details AS (
    SELECT 
    spent.*,(member.first_name ||' '|| member.last_name) AS utilisateur, 
    category.label AS categorie 
    FROM spent
    JOIN member ON spent.member_id = member.id
    JOIN category ON spent.category_id = category.id
);

--viem pour saving
CREATE VIEW saving_with_details AS (
    SELECT 
    saving.*,(member.first_name ||' '|| member.last_name) AS utilisateur
    FROM saving
    JOIN member ON income.member_id = member.id
);


--viem pour income
CREATE VIEW income_with_details AS (
    SELECT 
    income.*,(member.first_name ||' '|| member.last_name) AS utilisateur, 
    category.label AS categorie 
    FROM "income" JOIN member ON income.member_id = member.id
    JOIN category ON income.category_id = category.id
);


COMMIT;
