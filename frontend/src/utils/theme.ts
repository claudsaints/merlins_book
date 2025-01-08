export const applySavedTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const htmlElement = document.body;

  if (savedTheme === 'dark') {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }
};
