import { TimeLimit } from './const.js';

const capitalizedFirstChar = (element) => element.replace(element[0], element[0].toUpperCase());

const showErrorMessage = (message) => {
  const element = document.createElement('div');
  element.style.width = `${100}%`;
  element.style.height = `${1.2}rem`;
  element.style.backgroundColor = 'red';
  element.style.color = 'white';
  element.style.textAlign = 'center';
  element.style.position = 'fixed';
  element.style.top = 0;
  element.textContent = `${message}. Check all completed fields or your internet connection and try again.`;
  document.body.append(element);
  setTimeout(() => element.remove(), TimeLimit.REMOVE);
};

export { capitalizedFirstChar, showErrorMessage };
