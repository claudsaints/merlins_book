export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
};
export const validateNickname = (nickname: string): boolean => {
  return nickname.length >= 6 && nickname.length <= 24;
};
export const validatePassword = (password: string): boolean => {
  return password.length >= 6 && password.length <= 12;
};
