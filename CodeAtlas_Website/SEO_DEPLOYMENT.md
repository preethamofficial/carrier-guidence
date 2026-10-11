# SEO and deployment checklist

## Before a public URL exists

The repository does not yet define a production domain or hosting base path. Do not add guessed canonical URLs or a guessed sitemap. After deployment:

1. Decide whether the site is hosted at a custom domain, a repository subpath (such as GitHub Pages), or a static host.
2. Add a correct canonical URL and Open Graph URL to each public HTML page.
3. Generate `sitemap.xml` containing only the actual public canonical URLs.
4. Set `robots.txt` to allow public pages and point its Sitemap directive to the actual deployed sitemap URL.
5. Confirm that the host serves `CodeAtlas_Website` as the site root and that every internal link works at the real base path.
6. Test the deployed site in mobile and desktop browsers and inspect the rendered source.
7. Run Lighthouse and accessibility checks, record actual results, and fix the highest-impact issues.
8. Do not add fake testimonials, fabricated learner counts, unsupported salary numbers, or unverified performance claims.

## Current repository state

The main landing page and Career Studio have description and Open Graph metadata. Static validation checks local references, HTML viewport metadata, JSON files and service-worker cache entries. Other pages should receive page-specific metadata before a public SEO launch. The actual sitemap and production robots rules are intentionally deferred until a real deployment URL is selected.

## Performance and accessibility targets

Treat these as checks to measure, not current claims:
- Lighthouse performance, accessibility, best practices and SEO: aim for 90+ where practical, then report actual results.
- Avoid layout shifts and load non-critical imagery lazily.
- Use semantic headings, labels, skip links, visible focus and reduced-motion support.
- Test with keyboard navigation and at least one screen reader.
- Test service-worker cache updates and stale-cache recovery on the deployed origin.
