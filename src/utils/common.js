const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const capitalizedString = (string) => string.replace(string[0], string[0].toUpperCase());

export { getRandomArrayElement, capitalizedString };
