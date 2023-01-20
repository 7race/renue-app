export interface Denomination {
  denomination: number;
  amount: number;
}

export const denominationHelper = {
  objectsToDenominationNumbers: (counts: Denomination[]): number[] => {
    const numbers: number[] = [];
    counts.forEach((count) => {
      for (let i = 0; i < count.amount; i++) {
        numbers.push(count.denomination);
      }
    });
    return numbers;
  },
  denominationNumbersToObjects: (numbers: number[]): Denomination[] => {
    const count: Record<number, Denomination> = {};
    numbers.forEach(
      (x) => (count[x] = count[x] || { denomination: x, amount: 0 })
    );
    numbers.forEach((x) => count[x].amount++);
    return Object.values(count);
  }
};
