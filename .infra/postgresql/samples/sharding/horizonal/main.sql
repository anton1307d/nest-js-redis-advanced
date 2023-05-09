CREATE SEQUENCE IF NOT EXISTS id_seq;

CREATE TABLE "public"."books"
(
    "id"          SERIAL NOT NULL,
    "category_id" int8    NOT NULL,
    "author"      varchar NOT NULL,
    "title"       varchar NOT NULL,
    "year"        int8    NOT NULL,
    PRIMARY KEY ("id")
);

CREATE INDEX books_category_id_idx ON "public"."books" USING btree (category_id);

CREATE EXTENSION postgres_fdw;
CREATE SERVER postgres_1 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'postgres_s1', port '5432', dbname 'content');
CREATE USER MAPPING FOR username SERVER postgres_1 OPTIONS (user 'username', password 'password');

CREATE FOREIGN TABLE books_1 (
    "id" SERIAL NOT NULL,
    "category_id" int8 NOT NULL,
    "author" varchar NOT NULL,
    "title" varchar NOT NULL,
    "year" int8 NOT NULL
    ) SERVER postgres_1 OPTIONS (SCHEMA_NAME 'public', TABLE_NAME 'books');

CREATE SERVER postgres_2 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'postgres_s2', port '5432', dbname 'content');
CREATE USER MAPPING FOR username SERVER postgres_2 OPTIONS (user 'username', password 'password');

CREATE FOREIGN TABLE books_2 (
    "id" SERIAL NOT NULL,
    "category_id" int8 NOT NULL,
    "author" varchar NOT NULL,
    "title" varchar NOT NULL,
    "year" int8 NOT NULL
    ) SERVER postgres_2 OPTIONS (SCHEMA_NAME 'public', TABLE_NAME 'books');


CREATE VIEW v_books AS
SELECT *
FROM books_1
UNION ALL
SELECT *
FROM books_2;

CREATE RULE books_insert AS ON INSERT TO "public"."books" DO INSTEAD NOTHING;
CREATE RULE books_update AS ON UPDATE TO "public"."books" DO INSTEAD NOTHING;
CREATE RULE books_delete AS ON DELETE TO "public"."books" DO INSTEAD NOTHING;

CREATE RULE books_insert_to_1 AS ON INSERT TO "public"."books" WHERE (category_id = 1) DO INSTEAD INSERT INTO books_1
                                                                                       VALUES (NEW.*);
CREATE RULE books_insert_to_2 AS ON INSERT TO "public"."books" WHERE (category_id = 2) DO INSTEAD INSERT INTO books_2
                                                                                       VALUES (NEW.*);