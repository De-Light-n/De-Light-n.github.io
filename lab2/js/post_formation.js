import { mainArticles } from "./articles_data.js";

function saveArticlesData() {
  localStorage.setItem('articlesData', JSON.stringify(mainArticles));
}

// Функція для завантаження даних з localStorage
function loadArticlesData() {
  const savedData = localStorage.getItem('articlesData');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    
    // Оновлюємо коментарі та лайки
    mainArticles.forEach(article => {
      const savedArticle = parsedData.find(a => a.id === article.id);
      if (savedArticle) {
        if (savedArticle.comments) article.comments = savedArticle.comments;
        if (savedArticle.isLiked !== undefined) article.isLiked = savedArticle.isLiked;
        if (savedArticle.likes !== undefined) article.likes = savedArticle.likes;
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Post page loaded.");

  // Отримуємо ID статті з URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  console.log("Post ID from URL:", postId);

  if (!postId) {
    console.error("No post ID found in URL");
    window.location.href = "articles.html";
    return;
  }

  // Знаходимо статтю напряму в mainArticles
  const article = mainArticles.find((article) => article.id == postId);
  console.log("Article retrieved from articles_data.js:", article);

  if (!article) {
    console.error("No article found with this ID");
    return;
  }

  // Оновлюємо заголовок
  document.querySelector(".post-title").textContent = article.title;

  // Оновлюємо зображення
  const postImage = document.querySelector(".post-image img");
  postImage.src = article.img || "../images/default-post.jpg";
  postImage.alt = article.title;
  postImage.onerror = function () {
    this.src = "../images/default-post.jpg";
  };

  // Інформація про автора
  const authorAvatar = document.querySelector(".post-author .author-avatar");
  authorAvatar.src = article.authorImg || "../icons/anonymous.png";
  authorAvatar.alt = article.author;
  authorAvatar.onerror = function () {
    this.src = "../icons/anonymous.png";
  };

  document.querySelector(".post-author .author-name").textContent =
    article.author;

  // Контент статті
  document.querySelector(".post-content p").innerHTML =
    article.content || "No content available";

  // Відображення коментарів
  const commentsContainer = document.querySelector(".comments");

  // Функція для відображення коментарів
  function renderComments() {
    commentsContainer.innerHTML = "";
    if (article.comments && article.comments.length > 0) {
      article.comments.forEach((comment) => {
        const commentHTML = `
                <div class="comment">
                    <img src="${comment.avatar || "../icons/anonymous.png"}" 
                        alt="${comment.author}" 
                        class="comment-avatar"
                        onerror="this.src='../icons/anonymous.png'"/>
                    <div class="comment-content">
                        <div class="comment-meta">
                            <div class="comment-author">${comment.author}</div>
                        </div>
                        <div class="comment-text">${comment.text}</div>
                        <div class="comment-date">${comment.date}</div>
                    </div>
                </div>
                `;
        commentsContainer.innerHTML += commentHTML;
      });
    } else {
      commentsContainer.innerHTML = `<p class="no-comments">No comments yet. Be the first to comment!</p>`;
    }
  }

  // Початковий рендер коментарів
  renderComments();

  // Обробник форми коментування
  const commentForm = document.querySelector(".add-comment-form");
  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const commentInput = this.querySelector(".comment-input");
      const commentText = commentInput.value.trim();

      if (!commentText) {
        alert("Please enter your comment");
        return;
      }

      const newComment = {
        avatar: "../icons/anonymous.png",
        author: "Anonymous",
        text: commentText,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };

      if (!article.comments) {
        article.comments = [];
      }
      article.comments.unshift(newComment);
      renderComments();
      commentInput.value = "";

      // Зберігаємо оновлені дані
      saveArticlesData();
    });
  }


  console.log("Article successfully loaded and displayed.");

  // Обробник кнопки лайка
    const likeBtn = document.querySelector('.like-btn');
    const likeIcon = document.querySelector('.like-icon');
    const likeCount = document.querySelector('.like-count');
    let isLiked = false;
    let likes = 0;
    
    // Завантажуємо стан лайка з localStorage
    const savedLikeState = localStorage.getItem(`post-${postId}-liked`);
    if (savedLikeState) {
      isLiked = JSON.parse(savedLikeState);
      if (isLiked) {
        likeBtn.classList.add('active');
        likeIcon.setAttribute('fill', '#ff4757');
      }
    }
    
    // Завантажуємо кількість лайків
    const savedLikes = localStorage.getItem(`post-${postId}-likes`);
    if (savedLikes) {
      likes = parseInt(savedLikes);
      likeCount.textContent = likes;
    }
    
    likeBtn.addEventListener('click', function() {
      isLiked = !isLiked;
      
      if (isLiked) {
        likes++;
        likeBtn.classList.add('active');
        likeIcon.setAttribute('fill', '#ff4757');
      } else {
        likes--;
        likeBtn.classList.remove('active');
        likeIcon.setAttribute('fill', 'currentColor');
      }
      
      likeCount.textContent = likes;
      
      // Зберігаємо стан у localStorage
      localStorage.setItem(`post-${postId}-liked`, JSON.stringify(isLiked));
      localStorage.setItem(`post-${postId}-likes`, likes.toString());
    });
    
    // Обробник кнопки поширення
    const shareBtn = document.querySelector('.share-btn');
    shareBtn.addEventListener('click', function() {
      if (navigator.share) {
        navigator.share({
          title: article.title,
          text: 'Check out this interesting article!',
          url: window.location.href,
        })
        .catch(err => console.log('Error sharing:', err));
      } else {
        // Fallback для браузерів, які не підтримують Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, '_blank');
      }
    });

});
