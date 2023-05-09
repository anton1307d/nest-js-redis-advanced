CREATE TABLE "public"."books"
(
    "id"          SERIAL NOT NULL,
    "category_id" int8    NOT NULL,
    "author"      varchar NOT NULL,
    "title"       varchar NOT NULL,
    "year"        int8    NOT NULL,
    PRIMARY KEY ("id")
);

CREATE INDEX books_category_id_idx ON books USING btree (category_id);