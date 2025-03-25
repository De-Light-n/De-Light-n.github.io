import { mainArticles } from "./articles_data.js";

function isArticleLiked(articleId) {
  const savedLikeState = localStorage.getItem(`post-${articleId}-liked`);
  return savedLikeState ? JSON.parse(savedLikeState) : false;
}

// 🔹 Функція створення HTML-картки для головної сторінки
function createMainArticleHTML(article) {
  const isLiked = isArticleLiked(article.id);
  const likedClass = isLiked ? 'liked' : '';
  
  return `
    <a class="card ${likedClass}" href="post.html?id=${article.id}">
      <div class="card-image-container">
        <img src="${article.img}" alt="Post Image" class="card-image"/>
      </div>
      <div class="card-content">
        <div class="author-container">
          <img src="${article.authorImg}" alt="${article.author}" class="author-avatar" 
               onerror="this.src='../icons/anonymous.png'"/>
          <span class="author">${article.author}</span>
        </div>
        <h3 class="card-title">${article.title}</h3>
        <div class="card-date">${article.time}</div>
      </div>
    </a>
  `;
}

// 🔹 Функція створення HTML-картки для сайдбару
function createSidebarArticleHTML(article) {
  return `
    <a href="post.html?id=${article.id}" class="sidebar-post-link">
      <div class="sidebar-post">
        <h3>${article.author}</h3>
        <p>${article.title}</p>
        <div class="divider"></div>
      </div>
    </a>
  `;
}

// 🔹 Розділяємо mainArticles на дві частини
const halfLength = Math.ceil(mainArticles.length / 2);
const mainArticlesToRender = mainArticles.slice(0, halfLength);
const sidebarArticlesToRender = mainArticles.slice(halfLength);

// 🔹 Рендер головних статей
const mainContainer = document.querySelector(".cards");
if (mainContainer) {
  mainContainer.innerHTML = mainArticlesToRender.map(createMainArticleHTML).join('');
} else {
  console.error("Error: .cards container not found.");
}

// 🔹 Рендер статей у сайдбарі
const sidebarContainer = document.querySelector(".sidebar");
if (sidebarContainer) {
  sidebarContainer.innerHTML = sidebarArticlesToRender.map(createSidebarArticleHTML).join('');
} else {
  console.error("Error: .sidebar container not found.");
}
