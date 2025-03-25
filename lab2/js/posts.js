import { mainArticles, sidebarArticles } from "./articles_data.js";
import mainArticles from "lab2/js/articles_data.js";
// Функція для збереження даних у localStorage перед переходом
function setPostData(event, articleId) {
  event.preventDefault();
  const article = mainArticles.find(item => item.id === articleId);
  if (article) {
    sessionStorage.setItem(`currentPost`, JSON.stringify(article));
    window.location.href = `post.html?id=${articleId}`;
  }
}

// Генерація статей на головній сторінці
const mainContainer = document.querySelector(".cards");
mainArticles.forEach((article) => {
  const articleHTML = `
    <a class="card" href="post.html?id=${article.id}" onclick='setPostData(event, ${article.id})'>
      <div class="card-image-container">
        <img src="${article.img}" alt="Post Image" class="card-image"/>
      </div>
      <div class="card-content">
        <div class="author-container">
          <img src="${article.authorImg}" alt="${article.author}" class="author-avatar" onerror="this.parentElement.textContent = '👤'"/>
          <span class="author">${article.author}</span>
        </div>
        <h3 class="card-title">${article.title}</h3>
        <div class="card-date">${article.time}</div>
      </div>
    </a>
  `;
  mainContainer.innerHTML += articleHTML;
});

// Генерація статей для сайдбару
const sidebarContainer = document.querySelector(".sidebar");
let j = 0;
while (j < sidebarArticles.length) {
  const article = sidebarArticles[j];
  const articleHTML = `
    <a href="post.html" class="sidebar-post-link">
      <div class="sidebar-post">
        <h3>${article.author}</h3>
        <p>${article.title}</p>
        <div class="divider"></div>
      </div>
      </a>
    `;
  sidebarContainer.innerHTML += articleHTML;
  j++;
}
