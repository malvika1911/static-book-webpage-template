document.addEventListener('DOMContentLoaded', function () {
    // Users stored in localStorage for static authentication
    let users = JSON.parse(localStorage.getItem('users')) || [
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' }
    ];

    // Save users to localStorage
    function saveUsers() {
      localStorage.setItem('users', JSON.stringify(users));
    }

    // Show sections based on URL fragment
    function showSectionByHash() {
      const hash = window.location.hash;
      if (hash === '#book-section') {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('signup-section').style.display = 'none';
        document.getElementById('book-section').style.display = 'block';
      } else {
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('signup-section').style.display = 'none';
        document.getElementById('book-section').style.display = 'none';
      }
    }

    // Initial section display based on URL
    showSectionByHash();

    // Listen to hash changes to update section display
    window.addEventListener('hashchange', showSectionByHash);

    // Apply saved theme (if any)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.className = savedTheme;
    }

    // Login functionality using localStorage users
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username && password) {
          const user = users.find(u => u.username === username && u.password === password);
          if (user) {
            localStorage.setItem('user', username);
            localStorage.setItem('password', password);

            // Navigate to book section with fragment
            window.location.hash = '#book-section';
          } else {
            alert("Invalid username or password");
          }
        } else {
          alert("Please enter username and password");
        }
      });
    }

    // Signup functionality adds user to localStorage users
    const signupBtn = document.getElementById("signup-btn");
    if (signupBtn) {
      signupBtn.addEventListener("click", () => {
        const signupUsername = document.getElementById("signup-username").value;
        const signupPassword = document.getElementById("signup-password").value;

        if (signupUsername && signupPassword) {
          const existingUser = users.find(u => u.username === signupUsername);
          if (existingUser) {
            alert("Username already exists");
          } else {
            users.push({ username: signupUsername, password: signupPassword });
            saveUsers();
            alert("Account created successfully!");

            // Switch back to login section
            document.getElementById("signup-section").style.display = "none";
            document.getElementById("login-section").style.display = "block";
          }
        } else {
          alert("Please enter username and password");
        }
      });
    }

    // Switch between login and signup sections
    document.getElementById("signup-link").addEventListener("click", () => {
      document.getElementById("login-section").style.display = "none";
      document.getElementById("signup-section").style.display = "block";
    });

    document.getElementById("login-link").addEventListener("click", () => {
      document.getElementById("signup-section").style.display = "none";
      document.getElementById("login-section").style.display = "block";
    });

    // Theme toggle functionality
    const toggleThemeButton = document.getElementById("toggleTheme");
    if (toggleThemeButton) {
      toggleThemeButton.addEventListener("click", function () {
        const body = document.body;
        if (body.classList.contains("light-theme")) {
          body.classList.remove("light-theme");
          body.classList.add("dark-theme");
          localStorage.setItem('theme', 'dark-theme');
        } else {
          body.classList.remove("dark-theme");
          body.classList.add("light-theme");
          localStorage.setItem('theme', 'light-theme');
        }
      });
    }

    // Font style change functionality
    const fontStyleSelect = document.getElementById('fontStyle');
    const bookContent = document.getElementById('bookContent');
    if (fontStyleSelect && bookContent) {
      fontStyleSelect.addEventListener('change', function () {
        bookContent.style.fontFamily = this.value;
      });
    }

    // Font size change functionality
    const fontSizeSelect = document.getElementById('fontSize');
    if (fontSizeSelect && bookContent) {
      fontSizeSelect.addEventListener('change', function () {
        bookContent.style.fontSize = this.value;
      });
    }

    // Navigation through chapters
    const chapterContents = document.querySelectorAll('.chapter-content');

    // Function to hide all chapter contents
    function hideAllChapters() {
      chapterContents.forEach((content) => {
        content.style.display = 'none';
      });
    }

    // Function to show the selected chapter content
    function showChapterContent(chapterIndex) {
      hideAllChapters();
      chapterContents[chapterIndex].style.display = 'block';
    }

    // Initially display the first chapter
    showChapterContent(0); // Default to the first chapter

    // Table of Contents navigation
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        // Removed e.preventDefault() to allow default link navigation
        console.log('Chapter link clicked:', this);
        // Get chapter number from data attribute
        const chapterNumber = this.getAttribute('data-chapter');
        console.log('Chapter number:', chapterNumber);
        // No manual redirection needed as href points to chapter pages
      });
    });
});
