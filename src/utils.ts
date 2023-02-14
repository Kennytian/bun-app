export const getRandom = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isMobile = (str: string) => /^1[3-9]\d{9}$/.test(str);

export const isCode = (str: string) => /^\+?[1-9][0-9]{5}$/.test(str);
