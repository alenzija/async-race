export const getOrdinalAdverb = (value: number) => {
  if (value < 1 || Math.round(value) !== value) {
    return '';
  }
  if (value === 1) {
    return 'firstly';
  }

  if (value === 2) {
    return 'secondly';
  }

  if (value === 3) {
    return 'thirdly';
  }

  if (value === 5) {
    return 'fifthly';
  }

  return `${value}thly`;
};
