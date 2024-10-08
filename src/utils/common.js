const capitalizedFirstChar = (string) => string.replace(string[0], string[0].toUpperCase());

const showErrorMessage = (message) => {
  const element = document.createElement('div');
  element.style.width = `${100}%`;
  element.style.height = `${3}rem`;
  element.style.backgroundColor = 'red';
  element.style.fontSize = `${2}rem`;
  element.style.color = 'white';
  element.style.textAlign = 'center';
  element.textContent = `Error loading ${message}...`;
  document.body.append(element);
};

export { capitalizedFirstChar, showErrorMessage };
