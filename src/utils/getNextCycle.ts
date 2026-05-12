export function getNextCycle(currentCycle: number) {
  if (currentCycle === 0) {
    return 1;
  }

  if (currentCycle === 8) {
    return 1;
  }

  return currentCycle + 1;
}