/**
 * Career tracks part H: Artificial Intelligence & Machine Learning.
 * Uses the same compact builder as parts F/G: full authored metadata,
 * honest 'outline' lesson scaffolds (coverage shows outline status).
 */
'use strict';

function o(id, title, objectives, minutes) {
  return { id, title, estMinutes: minutes || 45, status: 'outline', objectives, intro: [], keyPoints: [], practice: [], resources: [] };
}
function mkLevels(prefix, beginner, inter, adv, job) {
  return [
    { id: 'Beginner', title: 'Beginner', modules: [{ id: prefix + '-beg', title: beginner[0], lessons: beginner[1].map((t, i) => o(prefix + '-beg-' + (i + 1), t[0], t[1])) }] },
    { id: 'Intermediate', title: 'Intermediate', modules: [{ id: prefix + '-inter', title: inter[0], lessons: inter[1].map((t, i) => o(prefix + '-inter-' + (i + 1), t[0], t[1])) }] },
    { id: 'Advanced', title: 'Advanced', modules: [{ id: prefix + '-adv', title: adv[0], lessons: adv[1].map((t, i) => o(prefix + '-adv-' + (i + 1), t[0], t[1])) }] },
    { id: 'Job preparation', title: 'Job preparation', modules: [{ id: prefix + '-job', title: job[0], lessons: job[1].map((t, i) => o(prefix + '-job-' + (i + 1), t[0], t[1])) }] },
  ];
}
function track(t) { return Object.assign({ sharedModules: ['foundations-tech-career'], status: 'outline' }, t); }

const tracks = [];

tracks.push(track({
  id: 'ai-ml',
  name: 'Artificial Intelligence & Machine Learning',
  emoji: '🧠', color: '#8b5cf6',
  tagline: 'Teach computers to learn patterns from data.',
  overview: ['Machine learning engineers build systems that improve from data: predicting churn, ranking search results, detecting fraud, transcribing speech. The role blends software engineering with statistics and careful experiment design.', 'Entry is demanding on maths (linear algebra, probability, calculus basics) and Python, but realistic through data analytics or backend routes plus focused ML study. Portfolios of well-evaluated models matter more than certificates.'],
  responsibilities: ['Frame problems as learnable prediction tasks', 'Prepare and validate datasets', 'Train, evaluate and tune models', 'Deploy models with monitoring for drift', 'Communicate uncertainty and limits honestly'],
  prerequisites: ['Strong Python (incl. NumPy/pandas basics)', 'Statistics and probability foundations', 'Linear algebra and calculus basics', 'SQL comfort'],
  skills: { technical: ['Supervised/unsupervised learning concepts', 'Model evaluation (train/val/test, cross-validation)', 'Feature engineering', 'Deep learning basics (PyTorch or TensorFlow)', 'MLOps basics (versioning, serving, monitoring)'], tools: ['Python + scikit-learn', 'PyTorch or TensorFlow', 'Jupyter notebooks', 'Git + experiment tracking', 'A cloud GPU option for larger training'], soft: ['Scepticism about metrics', 'Explaining model behaviour to non-experts', 'Ethics and bias awareness'] },
  sharedModules: ['foundations-tech-career', 'foundations-programming'],
  estHours: 600,
  levels: mkLevels('ml',
    ['ML foundations', [['How learning from data works', ['Explain train/validation/test splits', 'Describe overfitting and how to detect it']], ['Your first classifier end to end', ['Train and evaluate a scikit-learn model', 'Report precision, recall and a confusion matrix']]]],
    ['Models that generalise', [['Regularisation and validation', ['Tune models with cross-validation', 'Compare models fairly on held-out data']]]],
    ['Deep learning and deployment', [['Neural network basics', ['Train a small neural net on a real dataset', 'Monitor training and prevent overfitting']]]],
    ['ML interviews', [['Explaining a model project end to end', ['Walk through data, features, evaluation and deployment', 'Discuss what you would try next']]]]),
  projects: [{ id: 'ml-proj-1', title: 'Tabular prediction with honest evaluation', difficulty: 'beginner', description: 'Pick a public tabular dataset; build a classifier with a proper held-out test set and a short write-up.', steps: ['Define the prediction task', 'Clean and split data correctly', 'Train baselines then iterate', 'Write up metrics with caveats'] }],
  interview: [
    { q: 'What is overfitting and how do you detect it?', a: 'The model memorises training noise instead of general patterns; detected when training performance is much better than validation/test performance on unseen data.' },
    { q: 'Why split data into train/validation/test?', a: 'Train fits the model, validation guides choices (hyperparameters, model selection), and a held-out test estimates real-world performance once — keeping each role separate avoids optimistic bias.' },
    { q: 'Precision vs recall — when does each matter?', a: 'Precision: of flagged items, how many were right (matters when false alarms are costly). Recall: of real positives, how many were caught (matters when misses are costly, e.g. disease screening).' },
  ],
  checklist: ['Python + statistics foundations solid', 'One end-to-end model with honest held-out evaluation', 'Can explain overfitting and validation clearly', 'Deep learning basics attempted hands-on', 'Model limitations communicated without hype'],
  resources: [{ title: 'Google Machine Learning crash course', url: 'https://developers.google.com/machine-learning/crash-course' }, { title: 'scikit-learn tutorials', url: 'https://scikit-learn.org/stable/tutorial/index.html' }],
}));

module.exports = tracks;
