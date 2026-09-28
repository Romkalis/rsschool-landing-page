import {generateList, handleTab, showAllCards, findProduct} from './products/utils';
import { openModal } from './modal';

function openCardModal(event) {
  const card = event.target.closest('.catalog__item')

  if (card) {
    openModal(findProduct(card.id))
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const productsList = document.querySelector(".catalog__list");

  if (productsList) {
      generateList(productsList)
  }

  const tabs = document.querySelector('.catalog__tabs')
  tabs.addEventListener('click', (e) => handleTab(e, productsList))

  const moreButton = document.querySelector('.catalog__more')
  moreButton.addEventListener('click', () => showAllCards(productsList))

  productsList.addEventListener('click', openCardModal)
  productsList.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') openCardModal(e)
  })
});
