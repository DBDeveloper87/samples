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
    pop();
  });

  img.src = src;
}
      
async function pop() {
  const net = await bodyPix.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2
  });

  // Segmentation
  const canvas = document.querySelector('canvas');
  const { data:map } = await net.segmentPerson(canvas, {
    internalResolution: 'full',
  });

  // Extracting image data
  const ctx = canvas.getContext('2d');
  const { data:imgData } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Creating new image data
  const newImg = ctx.createImageData(canvas.width, canvas.height);
  const newImgData = newImg.data;
  
  // Apply the effect
  for(let i=0; i<map.length; i++) {
    // Extract data into r, g, b, a from imgData
    const [r, g, b, a] = [
      imgData[i*4],
      imgData[i*4+1],
      imgData[i*4+2],
      imgData[i*4+3]
    ];

    // Calculate the gray color
    const gray = ((0.3 * r) + (0.59 * g) + (0.11 * b));

    // Set new RGB color to gray if map value is not 1
    // for the current pixel in iteration
    [
      newImgData[i*4],
      newImgData[i*4+1],
      newImgData[i*4+2],
      newImgData[i*4+3]
    ] = !map[i] ? [gray, gray, gray, 255] : [r, g, b, a];
  }
  
  // Draw the new image back to canvas
  ctx.putImageData(newImg, 0, 0);

}



