export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function sortImagesById(listImage = []) {
  return listImage.sort((f_image, s_image) => f_image > s_image);
}
