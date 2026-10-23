# Optional Supabase cloud sync setup

Guest mode remains the default. Cloud sync is disabled until you configure a Supabase project. The browser may contain the **public anon key** only; never place the service-role key in `CodeAtlas_Website`.

## Configure the project

1. Create a Supabase project and configure its authentication providers (email/password and, if desired, Google OAuth redirect URLs for the deployed domain).
2. Open SQL Editor and run `supabase/schema.sql`. Confirm every listed table has Row Level Security enabled and the policies are present.
3. In `CodeAtlas_Website/supabase-config.js`, set `url` to the project URL and `anonKey` to the project public anon key. These values are public configuration; RLS is the security boundary.
4. Deploy the Edge Function from `supabase/functions/delete-account/index.ts` using the Supabase CLI.
5. Configure Edge Function secrets `SITE_ORIGIN=https://codeatlas-career-guidance.onrender.com`, `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. The service-role key must remain in Supabase secrets and never be copied to the static site.
6. In Supabase Auth URL configuration, allow the public site URL and OAuth redirect URL.
7. Test with two separate accounts: verify one account cannot read or update another account's rows; sign out; test email confirmation, Google OAuth, sync, export and account deletion.
8. Re-check `privacy.html` and update it before enabling sync publicly.

## Current behavior and limits

- If `url` or `anonKey` is blank, the page explicitly keeps cloud sync disabled and guest mode continues to work.
- Progress records merge without losing completed lessons/bookmarks. Assessment results and notes use per-record timestamps where available.
- The schema includes an applications table for a future application tracker. The current sync UI does not yet offer a full application-management interface.
- Account deletion requires the Edge Function and its server-side secrets to be deployed. Local browser data is intentionally retained unless the user clears it or exports and removes it separately.
- Do not use the service-role key in the frontend. Do not disable RLS to make an error disappear.
