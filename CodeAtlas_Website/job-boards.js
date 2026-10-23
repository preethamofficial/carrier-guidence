(() => {
  "use strict";
  const search = document.querySelector("#searchInput");
  const type = document.querySelector("#typeFilter");
  const ats = document.querySelector("#atsFilter");
  const directory = document.querySelector("#directory");
  const empty = document.querySelector("#emptyState");
  const count = document.querySelector("#resultCount");
  const summary = document.querySelector("#filterSummary");
  const normalize = value => String(value || "").toLowerCase().trim();
  const platformSources = [
    {name:"LinkedIn Jobs",type:"platform",ats:"Other",tags:["search","networking","alerts"],description:"Search by job title, skill, location and experience level.",url:"https://www.linkedin.com/jobs/"},
    {name:"Indeed",type:"platform",ats:"Other",tags:["search","location","alerts"],description:"Search jobs by keyword and location; verify listings with the employer.",url:"https://www.indeed.com/"},
    {name:"Wellfound",type:"platform",ats:"Other",tags:["startups","technology","early-stage"],description:"Explore startup roles and review company information before applying.",url:"https://wellfound.com/jobs"},
    {name:"Google Jobs Search",type:"platform",ats:"Other",tags:["search","multiple sources","discovery"],description:"Discover listings across sites; apply through the original employer or job board.",url:"https://www.google.com/search?q=software+jobs"},
    {name:"Y Combinator Work at a Startup",type:"platform",ats:"Other",tags:["startups","engineering","early-career"],description:"Browse startup openings and check the original application requirements.",url:"https://www.ycombinator.com/jobs"}
  ];
  let sources = [...platformSources];
  function render() {
    const q = normalize(search.value);
    const selectedType = type.value;
    const selectedAts = ats.value;
    const filtered = sources.filter(item => {
      const haystack = normalize([item.name,item.type,item.ats,item.description,...(item.tags || [])].join(" "));
      return (!q || haystack.includes(q)) &&
        (selectedType === "all" || item.type === selectedType) &&
        (selectedAts === "all" || item.ats === selectedAts);
    });
    directory.replaceChildren();
    filtered.forEach(item => {
      const card = document.createElement("article");
      card.className = "source-card";
      const heading = document.createElement("h3"); heading.textContent = item.name;
      const description = document.createElement("p"); description.textContent = item.description;
      const chips = document.createElement("div"); chips.className = "chips";
      [(item.type === "company" ? "Company career page" : "Job search platform"), item.ats, ...(item.tags || []).slice(0,2)].forEach(label => {
        const chip = document.createElement("span"); chip.className = "chip"; chip.textContent = label; chips.append(chip);
      });
      const link = document.createElement("a"); link.className = "source-link"; link.href = item.url;
      link.target = "_blank"; link.rel = "noopener noreferrer";
      link.textContent = item.type === "company" ? "Open official careers page ↗" : "Open job source ↗";
      card.append(heading, chips, description, link); directory.append(card);
    });
    count.textContent = String(sources.length);
    summary.textContent = `Showing ${filtered.length} of ${sources.length} sources`;
    empty.hidden = filtered.length !== 0;
    directory.hidden = filtered.length === 0;
  }
  async function init() {
    try {
      const response = await fetch("./data/companies.json", {cache:"no-store"});
      if (!response.ok) throw new Error("Company source list returned HTTP " + response.status);
      const companies = await response.json();
      if (!Array.isArray(companies)) throw new Error("Company source list must be an array");
      const companySources = companies.filter(company => company && company.name && /^https:\/\//i.test(company.careers_url || "")).map(company => {
        const platform = String(company.ats || "other").toLowerCase();
        const label = platform === "greenhouse" ? "Greenhouse" : platform === "lever" ? "Lever" : platform === "ashby" ? "Ashby" : "Other";
        return {
          name: company.name,
          type: "company",
          ats: label,
          tags: ["daily public-feed check", "employer-posted roles"],
          description: "Official employer careers page. Public " + label + " postings are included in the daily job-feed check when the source board responds successfully.",
          url: company.careers_url
        };
      });
      sources = [...companySources, ...platformSources];
    } catch (error) {
      summary.textContent = "Could not load the configured employer list: " + error.message;
    }
    render();
  }
  [search,type,ats].forEach(control => control.addEventListener("input", render));
  init();
})();