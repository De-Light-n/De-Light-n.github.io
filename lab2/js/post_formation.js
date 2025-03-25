document.addEventListener("DOMContentLoaded", function () {
    // 1. Отримуємо ID статті з URL параметрів
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    // 2. Перевіряємо наявність ID
    if (!postId) {
      console.error("No post ID found in URL");
      window.location.href = "articles.html"; // Перенаправляємо назад, якщо немає ID
      return;
    }
  
    // 3. Отримуємо дані статті з sessionStorage
    const articleData = JSON.parse(sessionStorage.getItem(`post-${postId}`));
  
    // 4. Перевіряємо наявність даних статті
    if (!articleData) {
      console.error("No article data found in sessionStorage");
      window.location.href = "articles.html";
      return;
    }
  
    // 5. Заповнюємо заголовок статті
    document.querySelector(".post-title").textContent = articleData.title;
  
    // 6. Оновлюємо головне зображення статті
    const postImage = document.querySelector(".post-image img");
    postImage.src = articleData.img;
    postImage.alt = articleData.title;
    
    // Обробник помилок для зображень
    postImage.onerror = function() {
      this.src = "../images/default-post.jpg"; // Запасне зображення
    };
  
    // 7. Заповнюємо інформацію про автора
    const authorAvatar = document.querySelector(".post-author .author-avatar");
    authorAvatar.src = articleData.authorImg;
    authorAvatar.alt = articleData.author;
    authorAvatar.onerror = function() {
      this.src = "../icons/anonymous.png"; // Запасний аватар
    };
  
    document.querySelector(".post-author .author-name").textContent = articleData.author;
  
    // 8. Вставляємо основний контент статті
    const postContent = document.querySelector(".post-content p");
    if (articleData.content) {
      postContent.innerHTML = articleData.content;
    } else {
      postContent.innerHTML = "No content available";
    }
  
    // 9. Обробляємо коментарі
    const commentsContainer = document.querySelector(".comments");
    commentsContainer.innerHTML = ''; // Очищаємо контейнер перед додаванням
  
    if (articleData.comments && articleData.comments.length > 0) {
      articleData.comments.forEach((comment) => {
        const commentHTML = `
          <div class="comment">
            <img src="${comment.avatar || "../icons/anonymous.png"}" 
                 alt="${comment.author}" 
                 class="comment-avatar"
                 onerror="this.src='../icons/anonymous.png'"/>
            <div class="comment-content">
              <div class="comment-meta">
                <div class="comment-author">${comment.author}</div>
                <button class="like-btn" aria-label="Like comment">
                  <img src="../icons/like.svg" alt="Лайк" />
                </button>
              </div>
              <div class="comment-text">${comment.text}</div>
              <div class="comment-date">${comment.date}</div>
            </div>
          </div>
        `;
        commentsContainer.innerHTML += commentHTML;
      });
    } else {
      commentsContainer.innerHTML = `
        <p class="no-comments">No comments yet. Be the first to comment!</p>
      `;
    }
  
    // 10. Очищаємо sessionStorage після використання
    sessionStorage.removeItem(`post-${postId}`);
    
    // 11. Додаємо обробник подій для форми коментарів (якщо потрібно)
    const commentForm = document.querySelector(".add-comment-form");
    if (commentForm) {
      commentForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const commentText = this.querySelector(".comment-input").value;
        // Тут можна додати логіку відправки коментаря
        alert("Comment functionality will be implemented soon!");
        this.reset();
      });
    }
  });