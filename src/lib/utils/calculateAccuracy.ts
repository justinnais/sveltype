export function calculateAccuracy(currentChars: string[], errors: number): number {
  if (errors < 0 || isNaN(errors)) {
    throw new Error('errors must be a positive number');
  }

  const charLength = currentChars.length;
  const accuracy = parseInt((((charLength - errors) / charLength) * 100).toFixed(0));

  if (Number.isNaN(accuracy) || accuracy < 0) {
    return 0;
  }

  return accuracy;
}
