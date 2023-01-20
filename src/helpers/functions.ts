export const findFirstSumSubset = (
  nums: number[],
  target: number
): number[] => {
  let result: number[] = [];
  const find = (start: number, path: number[], sum: number): boolean => {
    if (sum === target) {
      result = [...path];
      return true;
    }
    if (sum > target) {
      return false;
    }
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue;
      if (find(i + 1, [...path, nums[i]], sum + nums[i])) return true;
    }
    return false;
  };
  nums.sort((a, b) => a - b);
  find(0, [], 0);

  return result;
};
