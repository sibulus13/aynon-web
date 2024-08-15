create
or replace function nearby_posts (lat float, long float) returns table (
  id int4,
  content text,
  location_name text,
  created_at timestamptz,
  user_id int8,
  vote int8)
language sql 
as $$
select (
  p.id,
  p.content,
  l.name,
  p.created_at,
  p.vote
)
from (public.posts as p
join public.locations as l
on p.location_id = l.id)
$$;
