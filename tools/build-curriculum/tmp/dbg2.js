const SHARED = {};
["concepts-1.js","concepts-2.js","concepts-3.js","concepts-4.js","concepts-5.js","concepts-6.js","concepts-7.js","concepts-8a.js","concepts-8b.js","concepts-8c.js","concepts-8d.js"].forEach(f => {
  try { Object.assign(SHARED, require("c:/Users/preet/Downloads/CodeAtlas_Website_v1_13/tools/build-curriculum/" + f)); } catch (e) { }
});
console.log("keys:", Object.keys(SHARED).join(","));