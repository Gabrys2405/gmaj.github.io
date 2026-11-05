(() => {
  const shell = document.querySelector('[data-pcb-model]');
  if (!shell) return;
  const viewer = shell.querySelector('model-viewer');
  const button = shell.querySelector('[data-load-model]');
  const overlay = shell.querySelector('[data-model-overlay]');
  const status = shell.querySelector('[data-model-status]');
  const reset = shell.querySelector('[data-reset-model]');
  const fullscreen = shell.querySelector('[data-fullscreen-model]');
  if (!viewer || !button || !overlay || !status) return;

  let pending = null;
  let finished = false;
  let loading = false;
  const modelUrl = viewer.dataset.modelSrc;
  const setLabel = text => {
    button.replaceChildren(document.createTextNode(text), document.createTextNode(' ↗'));
  };
  const stopTimer = () => {
    if (pending !== null) clearTimeout(pending);
    pending = null;
  };
  const fail = (message) => {
    if (finished) return;
    stopTimer();
    loading = false;
    button.disabled = false;
    setLabel(button.dataset.tryLabel);
    overlay.classList.remove('is-loading');
    status.textContent = message;
  };

  const load = async () => {
    if (loading || finished) return;
    loading = true;
    button.disabled = true;
    overlay.classList.add('is-loading');
    status.textContent = status.dataset.loading;
    pending = setTimeout(() => fail(status.dataset.timeout), 30000);

    try {
      // The model-viewer component is fetched from the official Google CDN.
      await Promise.race([
        customElements.whenDefined('model-viewer'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('CDN failed')), 12000))
      ]);
      if (!loading || finished) return;
      // Avoid file:// loading, and trigger download only on the user's click.
      if (viewer.getAttribute('src') === modelUrl) viewer.removeAttribute('src');
      viewer.setAttribute('src', modelUrl);
    } catch (e) {
      fail(status.dataset.error);
    }
  };
  button.addEventListener('click', load);
  viewer.addEventListener('load', () => {
    finished = true;
    loading = false;
    stopTimer();
    overlay.hidden = true;
    status.textContent = '';
  });
  viewer.addEventListener('error', () => fail(status.dataset.error));
  viewer.addEventListener('progress', event => {
    if (!loading || !event.detail) return;
    const fraction = event.detail.totalProgress;
    if (typeof fraction === 'number' && fraction < 0.99) {
      status.textContent = `${status.dataset.loading} ${Math.round(100 * fraction)}%`;
    }
  });
  reset?.addEventListener('click', () => {
    viewer.cameraOrbit = '35deg 68deg auto';
    viewer.cameraTarget = 'auto auto auto';
    viewer.resetTurntableRotation?.();
  });
  fullscreen?.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement === shell) await document.exitFullscreen();
      else if (shell.requestFullscreen) await shell.requestFullscreen();
    } catch (_) { /* fullscreen may be disabled by the browser */ }
  });
})();
