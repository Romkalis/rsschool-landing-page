import { formatPrice } from "./products/utils";

const modal = document.querySelector(".modal");
const sizesList = modal?.querySelector(".modal__sizes");
const additivesList = modal?.querySelector(".modal__additives");

let basePrice = 0;

function createOption(label, value, addPrice, isActive = false) {
  const activeClass = isActive ? " modal__option--active" : "";

  return `<button class="modal__option${activeClass}" type="button" aria-pressed="${isActive}" data-add-price="${addPrice}">
            <span class="modal__option-icon" aria-hidden="true">${label}</span>
            ${value}
          </button>`;
}

function createSizes(sizes) {
  return Object.entries(sizes)
    .map(([label, size], index) => createOption(label.toUpperCase(), size.size, size["add-price"], index === 0))
    .join("");
}

function createAdditives(additives) {
  return additives
    .map((additive, index) => createOption(index + 1, additive.name, additive["add-price"]))
    .join("");
}

function setActive(option, isActive) {
  option.classList.toggle("modal__option--active", isActive);
  option.setAttribute("aria-pressed", isActive);
}

function calculateTotal() {
  const activeOptions = modal.querySelectorAll(".modal__option--active");

  return [...activeOptions].reduce((total, option) => total + Number(option.dataset.addPrice), basePrice);
}

function updateTotal() {
  modal.querySelector(".modal__price").textContent = formatPrice(calculateTotal());
}

function selectSize(event) {
  const option = event.target.closest(".modal__option");

  if (option) {
    [...sizesList.children].forEach((size) => setActive(size, size === option));
    updateTotal();
  }
}

function toggleAdditive(event) {
  const option = event.target.closest(".modal__option");

  if (option) {
    setActive(option, !option.classList.contains("modal__option--active"));
    updateTotal();
  }
}

function fillModal({ name, description, price, image, alt, sizes, additives }) {
  basePrice = Number(price);
  modal.querySelector(".modal__image").src = image;
  modal.querySelector(".modal__image").alt = alt;
  modal.querySelector(".modal__name").textContent = name;
  modal.querySelector(".modal__text").textContent = description;
  sizesList.innerHTML = createSizes(sizes);
  additivesList.innerHTML = createAdditives(additives);
  updateTotal();
}

export function openModal(product) {
  fillModal(product);
  modal.showModal();
}

function closeOnBackdropClick(event) {
  if (event.target === modal) {
    modal.close();
  }
}

modal?.addEventListener("click", closeOnBackdropClick);
sizesList?.addEventListener("click", selectSize);
additivesList?.addEventListener("click", toggleAdditive);
