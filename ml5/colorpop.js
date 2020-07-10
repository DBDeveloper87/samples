function loadImage(src) {
  const img = new Image();
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  // Load the image on canvas
  img.addEventListener('load', () => {
    // Set canvas width, height same as image
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // TODO: Implement pop()
    pop();
  });

  img.src = src;
}