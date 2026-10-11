/**
 * Career tracks part E: Data Analytics, AI/ML, AI Applications, Cybersecurity,
 * Cloud, DevOps. Compact table-driven build: full authored metadata, one real
 * authored Beginner lesson per track, honest 'outline' scaffolds elsewhere.
 */
'use strict';

function outlineLesson(id, title, objectives, minutes) {
  return { id, title, estMinutes: minutes || 45, status: 'outline', objectives, intro: [], keyPoints: [], practice: [], resources: [] };
}
function lesson(id, title, objectives, intro, keyPoints, practice, resources) {
  return { id, title, estMinutes: 50, status: 'reviewed', objectives, intro, keyPoints, practice, resources: resources || [] };
}

/** Build standard 4-level structure: authored beginner module + outline modules. */
function mkLevels(prefix, beginnerModule, upperTitles) {
  return [
    { id: 'Beginner', title: 'Beginner', modules: [beginnerModule] },
    { id: 'Intermediate', title: 'Intermediate', modules: [{ id: prefix + '-inter', title: upperTitles[0], lessons: [outlineLesson(prefix + '-inter-1', upperTitles[1], upperTitles[2], 55)] }] },
    { id: 'Advanced', title: 'Advanced', modules: [{ id: prefix + '-adv', title: upperTitles[3], lessons: [outlineLesson(prefix + '-adv-1', upperTitles[4], upperTitles[5], 60)] }] },
    { id: 'Job preparation', title: 'Job preparation', modules: [{ id: prefix + '-job', title: upperTitles[6], lessons: [lesson(prefix + '-job-1', upperTitles[7], upperTitles[8], upperTitles[9], upperTitles[10], upperTitles[11])] }] },
  ];
}

function track(t) { return Object.assign({ sharedModules: ['foundations-tech-career'], status: 'draft' }, t); }

const tracks = [];

tracks.push(track({
  id: 'data-analytics',
  name: 'Data Analytics & Business Intelligence',
  emoji: '📊',
  color: '#f59e0b',
  tagline: 'Turn raw data into decisions people can act on.',
  overview: [
    'Data analysts answer questions business people actually have: why did sales drop, which segment churns most, is the new feature working. The day-to-day toolkit is SQL for extracting data, a spreadsheet or Python/R for wrangling and statistics, and a visualisation tool (Power BI, Tableau or Python) for communicating findings.',
    'It is an accessible entry point if you like questions more than code: SQL can be learned in weeks, and analysis quality comes from framing the right question and communicating clearly more than from fancy models.',
  ],
  responsibilities: ['Translate business questions into data queries', 'Clean and validate messy datasets', 'Build dashboards and reports', 'Communicate findings to non-technical stakeholders', 'Define metrics and track them over time'],
  prerequisites: ['Comfort with spreadsheets', 'Basic maths (percentages, averages, rates)', 'Curiosity about why numbers move'],
  skills: { technical: ['SQL (joins, aggregation, window functions)', 'Spreadsheets at power-user level', 'Statistics foundations', 'A visualisation tool', 'Python or R basics'], tools: ['SQL database', 'Power BI or Tableau', 'Excel/Sheets', 'Jupyter notebooks', 'Git for analysis code'], soft: ['Storytelling with data', 'Asking clarifying questions', 'Writing concise reports'] },
  sharedModules: ['foundations-tech-career', 'foundations-programming'],
  estHours: 380,
  levels: mkLevels('da',
    { id: 'da-basics', title: 'Questions, data and your first insights', lessons: [
      lesson('da-basics-1',
        'Framing questions the data can actually answer',
        ['Frame a vague business question as an answerable data question', 'Identify what data you would need'],
        ['"Is the business doing well?" is not answerable; "did weekly active users grow or shrink over the last quarter, and in which region?" is. Analysts spend their early career learning to sharpen questions like this.', 'Before touching SQL, write down: the metric, the comparison (vs last month? vs target?), the segment, and the time range. This prevents beautiful analyses of the wrong question.'],
        ['A good data question names metric, segment, comparison and time range.', 'Always ask what decision the answer will drive.', 'Write the question down before writing any query.', 'Garbage in, garbage out: check data quality first.'],
        ['Take three vague questions ("are customers happy?", "is marketing working?", "is the app slow?") and rewrite each as an answerable data question.']),
    ] },
    ['Analysis in depth', 'Advanced SQL: window functions and CTEs', ['Write window functions for running totals and rankings', 'Use CTEs for readable multi-step queries'],
      'Scale and experimentation', 'A/B testing and statistical significance', ['Design a valid A/B test', 'Interpret results without common pitfalls'],
      'Communicating like an analyst', 'Presenting findings to stakeholders', ['Structure an insight deck (situation→insight→recommendation)', 'Choose the right chart for the message'],
      ['You have a dataset and a stakeholder who needs an answer. Lead with the decision, not the method: one slide situation, one slide what the data says, one slide what you recommend, then appendix with method.', 'Practice the "one-minute summary": if you cannot state the finding in a minute, you have not finished thinking.'],
      ['Lead with the decision, not the method.', 'One chart, one message.', 'State confidence and caveats honestly.', 'Appendix holds method details; main deck holds the story.'],
      ['Summarise a real or public dataset’s top three findings in a 3-slide outline.'],
      [{ title: 'Kaggle — public datasets', url: 'https://www.kaggle.com/datasets' }]],
  ),
  projects: [
    { id: 'da-proj-1', title: 'Sales dashboard from a public dataset', difficulty: 'beginner', description: 'Load a sales CSV, answer 5 business questions in SQL, and visualise monthly trends.', steps: ['Clean and load data', 'Write 5 analytical queries', 'Build a dashboard with 3 charts', 'Write a 1-page findings summary'] },
    { id: 'da-proj-2', title: 'Customer churn analysis', difficulty: 'intermediate', description: 'Identify which customer segments churn most and why, with evidence.', steps: ['Define churn precisely', 'Cohort analysis by signup month', 'Segment by behaviour/demographics', 'Present top 3 drivers with charts'] },
  ],
  interview: [
    { q: 'Difference between INNER JOIN and LEFT JOIN?', a: 'INNER JOIN returns only rows matching in both tables; LEFT JOIN returns all rows from the left table plus matching rows from the right (NULL where no match).' },
    { q: 'What is a window function and when do you use one?', a: 'A window function computes across a set of rows related to the current row without collapsing them (running totals, rankings, per-segment averages) — unlike GROUP BY which aggregates many rows into one.' },
    { q: 'How would you explain a p-value to a non-technical manager?', a: 'It is the probability of seeing an effect this big in the test data if there were actually no real difference — small p-values mean the result would be surprising under "no effect".' },
  ],
  checklist: ['SQL: joins, GROUP BY, window functions comfortable', 'One dashboard built and shared', 'Can explain a metric definition precisely', 'Statistics: distributions, confidence, significance basics', 'One written analysis with a clear recommendation'],
  resources: [{ title: 'SQLBolt — interactive SQL lessons', url: 'https://sqlbolt.com/' }, { title: 'Kaggle Learn', url: 'https://www.kaggle.com/learn' }],
  status: 'reviewed',
}));

module.exports = tracks;
