// Basic Audio utility for study-related feedback
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx = null;

const playTone = (freq, type, duration, volume = 0.1) => {
  if (!ctx) ctx = new AudioCtx();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  g.gain.setValueAtTime(volume, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export const playSuccess = () => {
  playTone(523.25, 'sine', 0.5); // C5
  setTimeout(() => playTone(659.25, 'sine', 0.5), 100); // E5
  setTimeout(() => playTone(783.99, 'sine', 0.5), 200); // G5
};

export const playLevelUp = () => {
  playTone(261.63, 'square', 0.8, 0.05); // C4
  setTimeout(() => playTone(392.00, 'square', 0.8, 0.05), 150); // G4
  setTimeout(() => playTone(523.25, 'square', 1.2, 0.05), 300); // C5
};

export const playClick = () => {
  playTone(800, 'sine', 0.1, 0.05);
};
