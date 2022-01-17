export const secondsToHms = (secs: number) => {
  const refreshedSeconds = Number(secs);
  const h = Math.floor(refreshedSeconds / 3600);
  const m = Math.floor((refreshedSeconds % 3600) / 60);
  const s = Math.floor((refreshedSeconds % 3600) % 60);

  const hours = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
  const minutes = m > 0 ? ` ${m}m` : '';
  const seconds = s > 0 ? ` ${s}s` : '';
  return hours + minutes + seconds;
};
