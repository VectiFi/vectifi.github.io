-- Key-value table used by the beta-signup edge function.
create table if not exists kv_store_0a93cb36 (
  key text not null primary key,
  value jsonb not null
);
