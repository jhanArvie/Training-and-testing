const productImage = document.querySelector('#product-image');

const imageButtons = document.querySelectorAll('.btn-color-picker');

const colorPicker = document.querySelector('.color-picker');

const colors = [
  'https://www.rudecru.com/eu/29775-home_default/plain-hoodie-yellow.jpg',
  'https://www.rudecru.com/eu/30786-home_default/plain-hoodie-blue.jpg',
  'https://www.rudecru.com/eu/27335-home_default/hoodie-all-orange-by-bsat-classic.jpg',
];

createColorPicker();

function createColorPicker() {
  for (let i = 0; i < colors.length; i++) {
    const button = document.createElement('button');
    const image = document.createElement('img');
    image.src = colors[i];
    button.append(image);
    colorPicker.append(button);

    button.addEventListener('click', () => {
      setProductImageSrc(colors[i]);
    });
  }
}

function setProductImageSrc(src) {
  if (productImage) {
    productImage.src = src;
  }
}
