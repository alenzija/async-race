const mixArray = (arr: string[]) => {
  const newArr = arr;
  for (let i = 0; i < newArr.length; i += 1) {
    const j = Math.floor(Math.random() * (newArr.length - i) + i);
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export const generateRandomColor = () => {
  let result = '#';
  result += mixArray(Array.from({ length: 15 }, (_, i) => i.toString(16))).slice(0, 6).join('');
  return result;
};
