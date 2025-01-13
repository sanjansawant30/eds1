import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  ul.className = "container";
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = "card";
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture'))
        div.className = 'cards-card-image';

      else {
        div.className = 'card__info';
        div.querySelectorAll("p")[0].className = "card__heading";
        div.querySelectorAll("p")[1].className = "card__description";
      };
    });
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }], "card__img")));
  ul.querySelectorAll(".card").forEach((card) => {

    const cardHeading = card.querySelector(".card__heading");
    const cardInfo = card.querySelector(".card__info");

    cardInfo.style.transform = `translateY(calc(100% - ${getHeight(cardHeading)}px))`
    card.addEventListener("mouseover", () => {
      cardInfo.style.transform = "translateY(0)";
    });

    card.addEventListener("mouseout", () => {
      cardInfo.style.transform = `translateY(calc(100% - ${getHeight(cardHeading)}px))`;
    });
  })


  block.textContent = '';
  block.append(ul);
}

function getHeight(element) {
  element.style.visibility = "hidden";
  document.body.appendChild(element);
  var height = element.offsetHeight + 0;
  document.body.removeChild(element);
  element.style.visibility = "visible";
  return height;
}