do $$
begin
for r in 1..500000 loop
                INSERT INTO books ( category_id, author, title, year)
                VALUES ( 1, Concat('Lina Kostenko-' , r), Concat('Lina Kostenko-' , r), 1958);
end loop;
end;
$$;

do $$
begin
for r in 1..500000 loop
                INSERT INTO books ( category_id, author, title, year)
                VALUES ( 2, Concat('Lina Kostenko-' , r), Concat('Lina Kostenko-' , r), 1958);
end loop;
end;
$$;