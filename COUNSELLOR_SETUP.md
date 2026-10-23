# Optional AI career counsellor setup

The AI counsellor is deliberately **disabled by default**. CodeAtlas remains usable without it. The static site and free Render plan do not make model inference free; Anthropic API calls can incur usage charges for the site owner.

## Deploy the API

1. Review the second service in the root `render.yaml`: `codeatlas-counsellor-api` runs from `server/`, exposes `GET /health`, and accepts `POST /api/counsellor`.
2. Sync the Render Blueprint to create the API service. The service starts without an API key and reports `configured: false`; chat requests return a friendly 503 until the owner explicitly configures the provider.
3. In the API service's Render Environment settings, add `ANTHROPIC_API_KEY` as a secret. Never add it to `CodeAtlas_Website`, GitHub source, or the static site's configuration.
4. Confirm `SITE_ORIGIN` is exactly `https://codeatlas-career-guidance.onrender.com` and `ANTHROPIC_MODEL` is an active model ID in the provider's current documentation. The blueprint defaults to `claude-haiku-4-5-20251001`; review provider model lifecycle and pricing before use.
5. After deployment, test `https://codeatlas-counsellor-api.onrender.com/health`. The response exposes only whether a key is configured, not the key itself.
6. Set `apiBaseUrl` in `CodeAtlas_Website/counsellor-config.js` to `https://codeatlas-counsellor-api.onrender.com`. Deploy the static site again and test the widget from the live My Path page.

## Security controls in the service

- Strict allowed-origin CORS for the CodeAtlas site.
- JSON body size limit, message length validation and a fixed allowlist of career roles/context fields.
- Per-IP in-memory rate limit of 10 requests per 15 minutes.
- Provider key held in a server environment variable only.
- Request logs contain a generated request ID, route, status and duration; they do not log the user's message or profile.
- Generic provider/network errors and a health endpoint for deployment checks.
- The system prompt does not promise jobs/salaries, and the widget warns users not to share sensitive data.

## Important operational limitations

- The current in-memory rate limiter resets when the free service restarts and is not a distributed abuse-prevention system. Before a high-traffic public launch, use a shared limiter and stronger abuse controls.
- The chat is optional and may be unavailable during a free host's cold start. The career assessment and non-AI learning tools remain available.
- The model provider is paid unless the owner has an applicable credit/grant. Set usage limits/alerts in the provider console and consider disabling the service if cost controls are not available.
- Verify the provider's current API model list, terms, privacy settings and pricing before enabling public access.
