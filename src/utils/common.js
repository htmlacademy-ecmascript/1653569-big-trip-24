const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const capitalizedFirstChar = (string) => string.replace(string[0], string[0].toUpperCase());
const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export { getRandomArrayElement, capitalizedFirstChar, updateItem };
