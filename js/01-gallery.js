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

/**
 * Варіант 1
*/

// const galleryContainer = document.querySelector('div.gallery');

// const markupGallery = galleryItems.map(createGalleryItems).join('');
// galleryContainer.insertAdjacentHTML('afterbegin', markupGallery);

// galleryContainer.addEventListener('click', callBigImage);

// function createGalleryItems({ description, preview, original }) {
//     return `
//     <div class="gallery__item">
//         <a class="gallery__link" href="${original}">
//             <img
//             class="gallery__image"
//             src="${preview}"
//             data-source="${original}"
//             alt="${description}"
//             />
//         </a>
//     </div>
//     `;
// }

// function callBigImage(event) {
//   event.preventDefault();
//   const bigImageURL = event.target.dataset.source;     

//   //Перевірка може бути ще така: event.currentTarget === event.target
//   if (event.target.nodeName !==`IMG`) {
//     console.log('Фуууу, мимо');
//     return;
//   }
    
//   const bigImage = basicLightbox.create(`
//     <img src="${bigImageURL}" width="800" height="600">
//   `);   
//   bigImage.show();
//   console.log('Молодєц, попала');

//   window.addEventListener('keydown', escapeClick);

//   function escapeClick(event) {
//     console.log('code', event.code);
//     if (event.code === "Escape") {
//       bigImage.close();
//       window.removeEventListener('keydown', escapeClick);
//       console.log('fooooo', event.code);
//     }
//   }  
// };


/**
 * Варіант 2
*/

const galleryDiv = document.querySelector('div.gallery');

const markupGalleryItem = galleryItems.map(item => { 
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
    </div>
  `
}).join('');

galleryDiv.insertAdjacentHTML('afterbegin', markupGalleryItem);
galleryDiv.addEventListener('click', getBigImageUrl);

// let imgShow;

function getBigImageUrl(event) {
  event.preventDefault();

  const bigImageUrl = event.target.dataset.source;
  const bigImageAlt = event.target.alt;

  // if (event.target.nodeName !== 'IMG') {
  //   console.log('Мазіла');
  //   return;
  // }

  document.querySelector('a.gallery__link').onclick = () => {
    const bigImg = `<img src="${bigImageUrl}" alt="${bigImageAlt}" width="800" height="600">`;

    const imgShow = basicLightbox.create(bigImg, {
      onShow: (bigImg) => console.log('onShow', bigImg),
      onClose: (bigImg) => console.log('onClose', bigImg)
    });

    imgShow.show(() => window.addEventListener('keydown', checkEscapeBtnClick));

    function checkEscapeBtnClick(event) {
      const ESC_KEY_CODE = 'Escape';
      const isEscapeKey = event.code === ESC_KEY_CODE;
      console.log('відкрито', event.code);

      if (isEscapeKey) {
        imgShow.close(() => {
          window.removeEventListener('keydown', checkEscapeBtnClick);
          console.log('закрито', event.code);
        })
      }
    }  
  }
  //console.log('Мєткий глаз');

  // const bigImg = `<img src="${bigImageUrl}" alt="${bigImageAlt}" width="800" height="600">`;

  // const imgShow = basicLightbox.create(bigImg, {
  //   onShow: (bigImg) => console.log('onShow', bigImg),
  //   onClose: (bigImg) => console.log('onClose', bigImg)
  // });

  // imgShow.show(() => window.addEventListener('keydown', checkEscapeBtnClick));

  // function checkEscapeBtnClick(event) {
  //   const ESC_KEY_CODE = 'Escape';
  //   const isEscapeKey = event.code === ESC_KEY_CODE;
  //   console.log('відкрито', event.code);

  //   if (isEscapeKey) {
  //     imgShow.close(() => {
  //       window.removeEventListener('keydown', checkEscapeBtnClick);
  //       console.log('закрито', event.code);
  //     })
  //   }
  // }


  /** const content = document.createElement('div')

		const h1 = document.createElement('h1')
		const p = document.createElement('p')

		h1.textContent = 'Create element'
		p.textContent = 'Create elements dynamicly and use them in your lightbox.'

		content.appendChild(h1)
		content.appendChild(p)

		const instance = basicLightbox.create(content)

		document.querySelector('button.create').onclick = instance.show
 */
  
  

  // imgShow = basicLightbox.create(`<img src="${bigImageUrl}" alt="${bigImageAlt}" width="800" height="600">`);
  // document.querySelector('a.gallery__link').onclick = imgShow.show();
  
  //imgShow.show(() => window.addEventListener('keydown', checkEscapeBtnClick));  

  /**
   *document.querySelector('button.image').onclick = () => {
			basicLightbox.create(`
				<img width="1400" height="900" src="https://placehold.it/1400x900">
			`).show()
		}

    document.querySelector('button.callbacks').onclick = (e) => {

			const html = `
				<h1>Callbacks</h1>
				<p>Take a look at the console of your browser.<br>This lightbox will close automaticly to demonstrate the close-callback.</p>
			`

			const instance = basicLightbox.create(html, {
				onShow: (instance) => console.log('onShow', instance),
				onClose: (instance) => console.log('onClose', instance)
			})

			instance.show((instance) => console.log('finished show()', instance))

			setTimeout(() => {
				instance.close((instance) => console.log('finished close()', instance))
			}, 3000)

		}
   */
}

/** */
// function checkEscapeBtnClick(event) {
//   const ESC_KEY_CODE = 'Escape';
//   const isEscapeKey = event.code === ESC_KEY_CODE;
//   console.log('відкрито', event.code);

//   if (isEscapeKey) {
//     imgShow.close(() => {
//       window.removeEventListener('keydown', checkEscapeBtnClick);      
//       console.log('закрито', event.code);
//     })
  //   }
//}