const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const capitalizedFirstChar = (string) => string.replace(string[0], string[0].toUpperCase());

export { getRandomArrayElement, capitalizedFirstChar };
