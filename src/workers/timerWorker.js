let timerId = null;

self.onmessage = function (event) {
  // Clear any existing timer so a new task restarts the countdown
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }

  const state = event.data;
  const { activeTask } = state;

  if (!activeTask) return;

  // `duration` in the app is in minutes; convert to milliseconds
  const endDate = activeTask.startDate + activeTask.duration * 60 * 1000;

  function tick() {
    const now = Date.now();
    const countDownSeconds = Math.max(0, Math.floor((endDate - now) / 1000));
    self.postMessage(countDownSeconds);

    if (countDownSeconds <= 0) return;

    timerId = setTimeout(tick, 1000);
  }

  tick();
};
