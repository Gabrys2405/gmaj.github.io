/* Minimal Formspree submit handler. The form endpoint is configured in contact.html / pl/contact.html. */
(() => {
  const form = document.querySelector('form[data-formspree-form]');
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const feedback = form.querySelector('[data-form-feedback]');
  const labels = {
    pl: {
      missing: 'Formularz wymaga konfiguracji. Właściciel strony musi najpierw dodać identyfikator formularza Formspree.',
      sending: 'Wysyłanie…',
      success: 'Wiadomość została wysłana. Dziękuję!',
      failed: 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na kontakt@gmajtech.com.',
      timeout: 'Serwer nie odpowiedział w ciągu 15 sekund. Sprawdź połączenie i spróbuj ponownie.',
      send: 'Wyślij wiadomość ↗'
    },
    en: {
      missing: 'Contact form setup is not complete yet. The site owner must add their Formspree form ID.',
      sending: 'Sending…',
      success: 'Your message has been sent. Thank you!',
      failed: 'Could not send your message. Please retry or email kontakt@gmajtech.com.',
      timeout: 'The server did not respond within 15 seconds. Check your connection and retry.',
      send: 'Send message ↗'
    }
  };
  const t = labels[document.documentElement.lang === 'pl' ? 'pl' : 'en'];
  const action = form.getAttribute('action') || '';
  const configured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]{6,}$/.test(action);
  const report = (message, kind = '') => {
    feedback.textContent = message;
    feedback.dataset.state = kind;
    feedback.hidden = !message;
  };
  if (!configured) {
    button.disabled = true;
    report(t.missing, 'warning');
    return;
  }
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity() || button.disabled) return;
    button.disabled = true;
    report(t.sending, 'progress');
    button.textContent = t.sending;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      let result = {};
      try { result = await response.json(); } catch (_) { /* empty response */ }
      if (!response.ok) {
        const errors = Array.isArray(result.errors) ? result.errors.map(x => x.message).filter(Boolean).join(' ') : '';
        throw new Error(errors || t.failed);
      }
      form.reset();
      report(t.success, 'success');
    } catch (error) {
      const message = error.name === 'AbortError' ? t.timeout : (error instanceof TypeError ? t.failed : (error.message || t.failed));
      report(message, 'error');
    } finally {
      clearTimeout(timer);
      button.disabled = false;
      button.textContent = t.send;
    }
  });
})();
