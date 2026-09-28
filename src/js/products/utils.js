    import { catalogItems } from "./catalogItems";

    const VISIBLE_CARDS_ON_MOBILE = 4;

    export function formatPrice(price) {
      return `$${Number(price).toFixed(2)}`;
    }

    export function createCard({ id, name, description, price, image, alt }) {
      return `<li class="catalog__item" id="${id}" tabindex="0">
                <article class="card">
                  <img class="card__image" src="${image}" width="310" height="310" loading="lazy" alt="${alt}" />
                  <div class="card__body">
                  <p class="card__text">${description}</p>
                  <h3 class="card__name">${name}</h3>
                    <p class="card__price">${formatPrice(price)}</p>
                  </div>
                </article>
              </li>`;
    }

    export function sortList(category) {
      return catalogItems
        .filter((el) => el.category === category)
        .map((el) => createCard(el)).join('');
    }

    export function generateList(elementToInsert, filter = 'coffee') {
        elementToInsert.innerHTML = ""
        elementToInsert.insertAdjacentHTML('afterbegin', sortList(filter))
        collapseList(elementToInsert)
    }

    // On mobile only the first cards are visible until "Show more" is pressed
    export function collapseList(list) {
        const moreButton = document.querySelector('.catalog__more')
        const hasHiddenCards = list.children.length > VISIBLE_CARDS_ON_MOBILE

        list.classList.add('catalog__list--collapsed')
        moreButton.hidden = !hasHiddenCards
    }

    export function showAllCards(list) {
        const moreButton = document.querySelector('.catalog__more')

        list.classList.remove('catalog__list--collapsed')
        moreButton.hidden = true
    }

    export function findProduct(id) {
        return catalogItems.find((el) => el.id === id)
    }

    export function handleTab(event, elementToInsert) {
        const tabs = document.querySelector('.catalog__tabs')
        if (tabs) {
            if ( event.target.dataset.tab === 'coffee'
                || event.target.dataset.tab === 'tea'
                || event.target.dataset.tab === 'dessert') {

                    let tabValue = event.target.dataset.tab
                    tabs.querySelectorAll('button').forEach( btn => btn.classList.remove('catalog__tab--active'))
                    event.target.classList.add('catalog__tab--active')
                    generateList(elementToInsert, tabValue)
            }
        }
    }
