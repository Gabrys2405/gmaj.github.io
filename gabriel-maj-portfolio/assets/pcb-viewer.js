(() => {
  const shell = document.querySelector('[data-pcb-model]');
  if (!shell) return;
  const viewer = shell.querySelector('model-viewer');
  const reset = shell.querySelector('[data-reset-model]');
  if (!viewer) return;

  const defaultOrbit = viewer.getAttribute('camera-orbit') || '35deg 68deg auto';
  const defaultTarget = viewer.getAttribute('camera-target') || 'auto auto auto';

  viewer.addEventListener('error', () => {
    shell.classList.add('pcb-viewer-error');
  });
  viewer.addEventListener('load', () => {
    shell.classList.remove('pcb-viewer-error');
  });

  reset?.addEventListener('click', () => {
    viewer.cameraOrbit = defaultOrbit;
    viewer.cameraTarget = defaultTarget;
    viewer.jumpCameraToGoal?.();
    viewer.resetTurntableRotation?.();
  });
})();
