const API_KEY = '46848082-fcb1caa7401941f7a1ae37827';
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&editors_choice=true&image_type=photo&per_page=6`;

let page = 1;

const btn = document.querySelector('#load-more')
btn.addEventListener('click', loadMoreImages)



async function fetchImages() {
  try {
    const response = await fetch(`${API_URL}&page=${page}`);
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error("Помилка завантаження зображень:", error);
    return [];
  }
}

async function displayImages() {
  const images = await fetchImages();
  const imageContainer = document.getElementById('image-container');

  if (images.length === 0) {
    imageContainer.innerHTML = '<p>Не вдалося завантажити зображення. Перевірте API-ключ або інтернет-з’єднання.</p>';
    return;
  }

  images.forEach((image) => {
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    imageContainer.appendChild(imgElement);
  });
}

function loadMoreImages() {
  page++;
  displayImages();
}

// Початкове завантаження зображень
displayImages();
