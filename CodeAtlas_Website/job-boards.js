(() => {
  "use strict";
  const sources = [
    {name:"GitLab",type:"company",ats:"Greenhouse",tags:["engineering","remote","software"],description:"Employer job board example. Review each role's location and remote-work policy.",url:"https://boards.greenhouse.io/gitlab"},
    {name:"Stripe",type:"company",ats:"Greenhouse",tags:["payments","backend","engineering"],description:"Roles across payments, infrastructure, product and business teams.",url:"https://boards.greenhouse.io/stripe"},
    {name:"Airbnb",type:"company",ats:"Greenhouse",tags:["travel","product","engineering"],description:"Explore current opportunities and check the role's hiring location.",url:"https://boards.greenhouse.io/airbnb"},
    {name:"Netflix",type:"company",ats:"Lever",tags:["streaming","software","data"],description:"Company job board example using the Lever postings platform.",url:"https://jobs.lever.co/netflix"},
    {name:"Shopify",type:"company",ats:"Lever",tags:["ecommerce","engineering","remote"],description:"Explore product, engineering and commerce-related roles.",url:"https://jobs.lever.co/shopify"},
    {name:"Figma",type:"company",ats:"Lever",tags:["design","frontend","product"],description:"Roles around collaborative design software and product development.",url:"https://jobs.lever.co/figma"},
    {name:"Notion",type:"company",ats:"Ashby",tags:["productivity","engineering","product"],description:"Company job board example using Ashby.",url:"https://jobs.ashbyhq.com/notion"},
    {name:"Linear",type:"company",ats:"Ashby",tags:["developer tools","product","engineering"],description:"Explore opportunities at the issue-tracking and product-development company.",url:"https://jobs.ashbyhq.com/linear"},
    {name:"Vercel",type:"company",ats:"Ashby",tags:["frontend","cloud","developer tools"],description:"Explore roles related to web development and frontend infrastructure.",url:"https://jobs.ashbyhq.com/vercel"},
    {name:"LinkedIn Jobs",type:"platform",ats:"Other",tags:["search","networking","alerts"],description:"Search by job title, skill, location and experience level.",url:"https://www.linkedin.com/jobs/"},
    {name:"Indeed",type:"platform",ats:"Other",tags:["search","location","alerts"],description:"Search jobs by keyword and location; verify listings with the employer.",url:"https://www.indeed.com/"},
    {name:"Wellfound",type:"platform",ats:"Other",tags:["startups","technology","early-stage"],description:"Explore startup roles and review company information before applying.",url:"https://wellfound.com/jobs"},
    {name:"Google Jobs Search",type:"platform",ats:"Other",tags:["search","multiple sources","discovery"],description:"Discover listings across sites; apply through the original employer or job board.",url:"https://www.google.com/search?q=software+jobs"},
    {name:"Y Combinator Work at a Startup",type:"platform",ats:"Other",tags:["startups","engineering","early-career"],description:"Browse startup openings and check the original application requirements.",url:"https://www.ycombinator.com/jobs"}
  ];
  const search = document.querySelector("#searchInput");
  const type = document.querySelector("#typeFilter");
  const ats = document.querySelector("#atsFilter");
  const directory = document.querySelector("#directory");
  const empty = document.querySelector("#emptyState");
  const count = document.querySelector("#resultCount");
  const summary = document.querySelector("#filterSummary");
  const normalize = value => String(value || "").toLowerCase().trim();
  function render() {
    const q = normalize(search.value);
    const selectedType = type.value;
    const selectedAts = ats.value;
    const filtered = sources.filter(item => {
      const haystack = normalize([item.name,item.type,item.ats,item.description,...item.tags].join(" "));
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
      [item.type === "company" ? "Company career page" : "Job search platform", item.ats, ...item.tags.slice(0,2)].forEach(label => {
        const chip = document.createElement("span"); chip.className = "chip"; chip.textContent = label; chips.append(chip);
      });
      const link = document.createElement("a"); link.className = "source-link"; link.href = item.url;
      link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = "Open job source ↗";
      card.append(heading, chips, description, link); directory.append(card);
    });
    count.textContent = String(sources.length);
    summary.textContent = `Showing ${filtered.length} of ${sources.length} sources`;
    empty.hidden = filtered.length !== 0;
    directory.hidden = filtered.length === 0;
  }
  [search,type,ats].forEach(control => control.addEventListener("input", render));
  render();
})();