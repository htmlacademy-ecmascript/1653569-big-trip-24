const capitalizedFirstChar = (string) => string.replace(string[0], string[0].toUpperCase());

const showErrorMessage = (message) => {
  const element = document.createElement('div');
  element.style.width = `${100}%`;
  element.style.height = `${1.2}rem`;
  element.style.backgroundColor = 'red';
  element.style.color = 'white';
  element.style.textAlign = 'center';
  element.style.position = 'absolute';
  element.style.top = `${18}vh`;
  element.textContent = `Error loading ${message}. Try reload page...`;
  document.body.append(element);
};

export { capitalizedFirstChar, showErrorMessage };
