export function getDisplayTimeFromSeconds(givenSeconds: number) {
  const hours = Math.floor(givenSeconds / 3600);
  const minutes = Math.floor((givenSeconds % 3600) / 60);
  const seconds = givenSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

export const addPad = (num: Number) => String(num).padStart(2, "0");
