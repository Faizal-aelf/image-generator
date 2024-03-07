export const generateRandomString = (length = 15) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
}

export const handleDownload = (imageURL, format) => {
    if (imageURL) {
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = `${generateRandomString()}.${format}`;
      link.click();
    }
};

export const generateColorCombination = (min = 10, max = 20) => {
  const numOfColors = Math.floor(Math.random() * (max - min + 1)) + min;
  const colorCombination = [];
  for (let i = 0; i < numOfColors; i++) {
      const colorCode = '#' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
      colorCombination.push(colorCode);
  }
  return colorCombination;
}

export const convertImageUrlToDataUrl = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};