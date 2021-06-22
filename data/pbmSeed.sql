--script de datas à des fins de démonstrations
BEGIN;

INSERT INTO category(label)
    VALUES ('salaire'),
           ('alimentation'),
           ('electricité'),
           ('restaurant');

INSERT INTO member(first_name,last_name,email,password,role)
VALUES ('John','Doe','john.doe@test.com','demo','admin'),
       ('Pierre','Dupont','pierre-dupont@test.com','demo','user');

INSERT INTO saving (label,amount,member_id)
VALUES ('livret A de John',2500,1);

INSERT INTO spent(intern_ref,label,amount,member_id,category_id)
VALUES ('spent-demo1','course',150,2,2),
       ('spent-demo2','facture edf',236.95,1,3),
       ('spent-demo3','resto 4e mur',125.05,1,4);

INSERT INTO income(intern_ref,label,amount,member_id,category_id)
VALUES ('income-demo1','salaire de juin',2545.03,1,1),
       ('income-demo2','salaire de juin',1545.78,2,1);


COMMIT;
