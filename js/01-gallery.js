import { galleryItems } from './gallery-items.js';
// Change code below this line

/**Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне. 
 * 
 * Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:
 * 1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
 * 2. Реализация делегирования на div.gallery и получение url большого изображения.
 * 3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. 
 * Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
 * 4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
 * 5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. 
 * Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.
*/

/* <div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</div> */

const galleryList = document.querySelector('.gallery');

const foo = ({ description, preview, original }) => {
    return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
    </div>
    `;
}


console.log(foo(galleryItems[0]));

const bar = galleryItems.map(foo).join('');
galleryList.insertAdjacentHTML('afterbegin', bar);

console.log(bar);
console.log(galleryItems);
