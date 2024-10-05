// ----------------Conver String to time function------------------
const stringToTime = (stringTime) => {
  const hours = parseInt(stringTime / 3600);
  const remainingSecond = stringTime % 3600;
  const minutes = parseInt(remainingSecond / 60);
  const second = remainingSecond % 60;
  return `${hours}h ${minutes}m ${second}s`;
};
// =============== Video categories ===============
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// fetch category
const loadCategoryByButton = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((response) => response.json())
    .then((data) => showVideos(data.category))
    .catch((error) => console.log(error));
};

// =============== Display categories ===============
const displayCategories = (categoriesData) => {
  const categoriesButtonContainer =
    document.getElementById('categories-button');

  categoriesData.forEach((categoriesItem) => {
    // create button
    const categorieContainer = document.createElement('div');
    categorieContainer.innerHTML = `
      <button onclick="loadCategoryByButton(${categoriesItem.category_id})" class="btn">
        ${categoriesItem.category}
      </button>
    `;
    categoriesButtonContainer.appendChild(categorieContainer);
  });
};

// =============== Load Video ===============
const loadVideos = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((response) => response.json())
    .then((data) => showVideos(data.videos))
    .catch((error) => console.log(error));
};

// =============== Show Video ===============
const showVideos = (showVideosData) => {
  const showVideosContainer = document.getElementById('show-video');
  showVideosContainer.innerHTML = '';
  showVideosData.forEach((video) => {
    const videoCard = document.createElement('div');
    videoCard.className = 'card card-compact';
    videoCard.innerHTML = `
    <figure class="h-[200px] relative">
        <img
        src="${video.thumbnail}"
        class="h-full w-full object-cover"
        alt="Pero tube videos thumbnails" />
        
        ${
          video.others.posted_date?.length == 0
            ? ''
            : `<span class="absolute bg-[#171717] rounded-md px-2 py-1 text-gray-200 text-xs font-light bottom-2 right-2">${stringToTime(
                video.others.posted_date
              )}</span>`
        }
    </figure>

    <div class="px-2 py-2 border rounded-md shadow-sm">
        <div>
            <div class="w-10 h-10">
                <img class="h-full w-full object-cover rounded-full" src="${
                  video.authors[0].profile_picture
                }"/>
            </div>
        </div>
        
        <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex flex-row space-x-1 items-center">
              <p class="text-sm font-normal text-gray-500">${
                video.authors[0].profile_name
              }</p>
              
              ${
                video.authors[0].verified === true
                  ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000">`
                  : ''
              }
            </div>
            <p></p>
        </div>
    </div>
    `;
    showVideosContainer.appendChild(videoCard);
  });
};

// load function
loadCategories();
loadVideos();
