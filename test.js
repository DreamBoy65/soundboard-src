const { Get, All } = require("./src");

console.log(Get("anime", "arigato").then(console.log));
console.log(All());
