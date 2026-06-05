const {
    getMemoryById
} = require("./database/memoryRepository");

const memory = getMemoryById(1);

console.log(memory);