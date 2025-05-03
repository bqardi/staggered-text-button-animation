import Prism from "prismjs";
import beautify from "js-beautify";

const form = document.querySelector("form");
const container = document.querySelector("[data-container]");
const button = container.querySelector(".button");
const letterWrapper = button.querySelector(".letter-wrapper");

const defaultOptions = {
  each: parseInt(form.each.value),
  amount: parseInt(form.amount.value),
};

const duration = Number(form.duration.value);
button.ariaLabel = form.text.value;
button.parentElement.style.setProperty("--staggered-duration", `${duration}ms`);

buildCode(buildChar(form.text.value, defaultOptions), {
  duration,
});

function handleRangeInput(target) {
  const label = target.previousElementSibling;
  const counter = label.querySelector("span");
  counter.textContent = `(${target.value}ms)`;
}

form.addEventListener("input", (e) => {
  e.preventDefault();

  if (!form.text.value) return;

  const duration = Number(form.duration.value);

  button.ariaLabel = form.text.value;
  button.parentElement.style.setProperty(
    "--staggered-duration",
    `${duration}ms`
  );

  const options = {
    each: Number(form.each.value),
    amount: Number(form.amount.value),
  };

  if (e.target.name === "each") {
    form.amount.value = 0;
    handleRangeInput(form.amount);
  }
  if (e.target.name === "amount") {
    form.each.value = 0;
    handleRangeInput(form.each);
  }

  if (e.target.type === "range") {
    handleRangeInput(e.target);
  }

  buildCode(buildChar(form.text.value, options), {
    duration,
  });
});

function buildCode(
  text,
  options = {
    duration: 1500,
    lineHeight: 1.25,
  }
) {
  letterWrapper.innerHTML = "";
  letterWrapper.append(...text);

  const escapedHTML = beautify
    .html(button.outerHTML, {
      indent_size: 2,
      inline: [],
    })
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  document.querySelector(
    "[data-output='html']"
  ).innerHTML = `<pre><code class="language-html">${escapedHTML}</code></pre>`;

  document.querySelector(
    "[data-output='css']"
  ).innerHTML = `<pre><code class="language-css">.button {
  --staggered-duration: ${options.duration}ms;
  --staggered-line-height: 1.5;

  background-color: black;
  color: white;
  padding: 1rem 2rem;

  /* Don't remove! */
  line-height: var(--staggered-line-height);
}

.letter-wrapper {
  display: flex;
  overflow: clip;
}

.letter {
  display: inline-block;
  text-shadow: 0px calc(1em * var(--staggered-line-height)) currentColor;
  transition: transform var(--staggered-duration)
    cubic-bezier(0.625, 0.05, 0, 1);
}

.button:hover .letter {
  transform: translateY(calc(-1em * var(--staggered-line-height)));
}
</code></pre>`;

  Prism.highlightAll();
}

function buildChar(text, options = { each: 0, amount: 0 }) {
  const totalChars = text.length;
  const delayPerChar = options.each || options.amount / (totalChars - 1 || 1);

  return [...text].map((char, index) => {
    const offsetDelay = delayPerChar * index;
    return createChar(char, offsetDelay);
  });
}

function createChar(char, delay) {
  const span = document.createElement("span");
  span.textContent = char === " " ? "\u00A0" : char;
  span.style.transitionDelay = `${delay}ms`;
  span.classList.add("letter");
  return span;
}
