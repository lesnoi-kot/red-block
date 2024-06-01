export const winAudio = new Audio("/elevbell1.wav");
export const resetAudio = new Audio("/button4.wav");
export const startAudio = new Audio("/lever4.wav");

winAudio.volume = 0.4;
startAudio.volume = 0.4;
resetAudio.volume = 0.2;

export function playAudio(audio: HTMLAudioElement) {
  audio.currentTime = 0;
  audio.play();
}
