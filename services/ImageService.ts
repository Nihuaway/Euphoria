
export const resize = (image: CanvasImageSource, maxWidth: number, maxHeight: number) => {
  let width = parseInt(image.width.toString());
  let height = parseInt(image.height.toString());



  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      //height *= max_width / width;
      height = Math.round((height *= maxWidth / width));
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      //width *= max_height / height;
      width = Math.round((width *= maxHeight / height));
      height = maxHeight;
    }
  }
  // resize the canvas and draw the image data into it
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', 0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)
};