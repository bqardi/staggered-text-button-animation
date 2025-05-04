document.addEventListener("click", async (e) => {
  const button = e.target.closest("[data-copy-button]");
  if (!button) return;

  const text = getCopyText(button);

  try {
    await navigator.clipboard.writeText(text);

    const feedback = document.querySelector(button.dataset.copyFeedback);
    if (feedback) {
      feedback.hidden = false;
      setTimeout(() => (feedback.hidden = true), 1500);
    }
  } catch (err) {
    console.error("Copy failed", err);
  }
});

function getCopyText(button) {
  const selector = button.dataset.copySelector;
  const element = selector ? document.querySelector(selector) : null;

  if (element) {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement
    ) {
      return element.value;
    }
    return element.textContent.trim();
  }

  return button.dataset.copyText || "NULL";
}
