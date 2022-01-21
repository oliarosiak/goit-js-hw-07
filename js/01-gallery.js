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
 * 
 * <div class="gallery__item">
      <a class="gallery__link" href="large-image.jpg">
        <img
          class="gallery__image"
          src="small-image.jpg"
          data-source="large-image.jpg"
          alt="Image description"
        />
      </a>
    </div>
*/

const galleryWrapper = document.querySelector('div.gallery');

const markupGalleryItems = galleryItems.map(item => { 
  const { description, preview, original } = item;

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
  </div>`
}).join('');

galleryWrapper.insertAdjacentHTML('afterbegin', markupGalleryItems);
galleryWrapper.addEventListener('click', openGalleryModalWindow);

let showBigImage;

function openGalleryModalWindow(event) {
  event.preventDefault();

  const bigImageUrl = event.target.dataset.source;
  const bigImageAlt = event.target.alt;

  if (event.target.nodeName !== 'IMG') {
    //Перевірка може бути ще така: if(event.currentTarget === event.target)
    console.log('Мазіла :)');
    return;
  }

  /** 
   * Варіант 1
  */
  
  showBigImage = basicLightbox.create(`<img src="${bigImageUrl}" alt="${bigImageAlt}" width="800" height="600">`);   
  showBigImage.show();
  console.log('Ай, молодець :)');
  window.addEventListener('keydown', onEscapeBtnClick);

  /** 
   * Варіант 2
  */
  
  // const bigImageMarkup = `<img src="${bigImageUrl}" alt="${bigImageAlt}" width="800" height="600">`;
  // showBigImage = basicLightbox.create(bigImageMarkup, {
  //   onShow: (showBigImage) => console.log('onShow', showBigImage),
  //   onClose: (showBigImage) => console.log('onClose', showBigImage),
  // });
  // showBigImage.show(() => window.addEventListener('keydown', onEscapeBtnClick));   
}

function onEscapeBtnClick(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscapeKey = event.code === ESC_KEY_CODE;
  console.log('Прослушка в ділі:', event.code);

  if (isEscapeKey) {
    showBigImage.close(() => {
      window.removeEventListener('keydown', onEscapeBtnClick);
      console.log('Нарешті спокій:', event.code);
    })
  } 
}