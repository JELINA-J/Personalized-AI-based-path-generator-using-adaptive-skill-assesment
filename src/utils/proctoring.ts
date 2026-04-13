export const enableProctoring = (autoSubmit: () => void) => {
  // Tab switch detection
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) autoSubmit();
  });

  // Disable copy-paste
  document.addEventListener("copy", (e) => e.preventDefault());
  document.addEventListener("paste", (e) => e.preventDefault());

  // Fullscreen enforcement
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
};
