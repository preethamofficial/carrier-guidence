(() => {
  "use strict";
  const $ = selector => document.querySelector(selector);
  const search = $("#searchInput"), locationInput = $("#locationFilter"), ats = $("#atsFilter"), recentOnly = $("#recentOnly");
  const jobsEl = $("#jobs"), statusEl = $("#status"), emptyEl = $("#emptyState");
  let allJobs = [], feed = {};
  const normalize = value => String(value || "").toLocaleLowerCase().trim();
  const dateOf = value => { if (!value) return null; const d = new Date(value); return Number.isNaN(d.getTime()) ? null : d; };
  const formatDate = value => { const d = dateOf(value); return d ? d.toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"}) : "Date not provided"; };
  function render() {
    const q = normalize(search.value), loc = normalize(locationInput.value), source = ats.value;
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const filtered = allJobs.filter(job => {
      const text = normalize([job.title,job.company,job.location,job.description,job.ats].join(" "));
      const jobLocation = normalize(job.location);
      const posted = dateOf(job.posted_date);
      return (!q || text.includes(q)) && (!loc || jobLocation.includes(loc)) &&
        (source === "all" || normalize(job.ats) === source) &&
        (!recentOnly.checked || (posted && posted.getTime() >= cutoff));
    });
    jobsEl.replaceChildren();
    for (const job of filtered) {
      const card = document.createElement("article"); card.className = "job";
      const company = document.createElement("div"); company.className = "company"; company.textContent = job.company || "Company not specified";
      const title = document.createElement("h3"); title.textContent = job.title || "Untitled role";
      const meta = document.createElement("div"); meta.className = "meta";
      for (const label of [job.location || "Location not specified",job.ats || "Source unknown",job.is_recent ? "Source date within 7 days" : (job.date_status === "unknown" ? "Date unverified" : "Date may reflect an update")]) {
        const chip = document.createElement("span"); chip.className = "chip"; chip.textContent = label; meta.append(chip);
      }
      const date = document.createElement("div"); date.className = "date";
      date.textContent = job.posted_date ? "Source date: " + formatDate(job.posted_date) : "First discovered: " + formatDate(job.first_seen_at) + " · source posting date unknown";
      const link = document.createElement("a"); link.className = "apply"; link.href = job.apply_url || "#"; link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = "View original posting ↗";
      card.append(company,title,meta,date,link); jobsEl.append(card);
    }
    $("#filterSummary").textContent = `Showing ${filtered.length} of ${allJobs.length} listings`;
    emptyEl.hidden = filtered.length !== 0;
    jobsEl.hidden = filtered.length === 0;
  }
  async function init() {
    try {
      const response = await fetch("./data/jobs.json", {cache:"no-store"});
      if (!response.ok) throw new Error("Feed returned HTTP " + response.status);
      feed = await response.json();
      allJobs = Array.isArray(feed.jobs) ? feed.jobs : [];
      $("#jobCount").textContent = String(allJobs.length);
      $("#boardCount").textContent = String(feed.companies_checked ?? "—");
      $("#updatedAt").textContent = feed.last_updated ? formatDate(feed.last_updated) : "Not yet run";
      statusEl.textContent = feed.last_updated ? "Feed loaded. Verify each opening on the employer's site." : "The feed has not been populated by a successful scheduled run yet. Try again after running the scraper.";
      if (feed.notice) statusEl.textContent += " " + feed.notice;
      render();
    } catch (error) {
      statusEl.textContent = "Could not load the job feed. Run CodeAtlas through a local web server and check that data/jobs.json exists. " + error.message;
      $("#jobCount").textContent = "0"; $("#boardCount").textContent = "—"; $("#updatedAt").textContent = "Unavailable";
      allJobs = []; render();
    }
  }
  [search,locationInput,ats,recentOnly].forEach(el => el.addEventListener("input",render));
  init();
})();