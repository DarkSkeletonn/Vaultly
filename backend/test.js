const {
    updateMemory,
    getMemoryById
} = require("./database/memoryRepository");

updateMemory(
    1,
    "Google Summer Internship",
    "Apply before 25 June"
);

console.log(
    getMemoryById(1)
);