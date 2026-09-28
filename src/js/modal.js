import { categoryOptions } from "./products/catalogItems";
import { formatPrice } from "./products/utils";

const modal = document.querySelector(".modal");

function createOption(label, value, isActive = false) {
  const activeClass = isActive ? " modal__option--active" : "";

  return `<button class="modal__option${activeClass}" type="button" aria-pressed="${isActive}">
            <span class="modal__option-icon" aria-hidden="true">${label}</span>
            ${value}
          </button>`;
}

function createSizes(sizes) {
  return sizes
    .map((size, index) => createOption(size.label, size.value, index === 0))
    .join("");
}

function createAdditives(additives) {
  return additives
    .map((additive, index) => createOption(index + 1, additive))
    .join("");
}

function fillModal({ category, name, description, price, image, alt }) {
  const { sizes, additives } = categoryOptions[category];

  modal.querySelector(".modal__image").src = image;
  modal.querySelector(".modal__image").alt = alt;
  modal.querySelector(".modal__name").textContent = name;
  modal.querySelector(".modal__text").textContent = description;
  modal.querySelector(".modal__sizes").innerHTML = createSizes(sizes);
  modal.querySelector(".modal__additives").innerHTML = createAdditives(additives);
  modal.querySelector(".modal__price").textContent = formatPrice(price);
}

export function openModal(product) {
  fillModal(product);
  modal.showModal();
}

// A click on the dark backdrop lands on the <dialog> itself, not on its content
function closeOnBackdropClick(event) {
  if (event.target === modal) {
    modal.close();
  }
}

modal?.addEventListener("click", closeOnBackdropClick);
