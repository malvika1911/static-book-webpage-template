document.addEventListener('DOMContentLoaded', function() {
    // Load saved preferences for font style, size, and theme
    const savedFontStyle = localStorage.getItem('fontStyle');
    const savedFontSize = localStorage.getItem('fontSize');
    const savedTheme = localStorage.getItem('theme');

    // Apply saved font style if it exists
    if (savedFontStyle) {
        document.getElementById('bookContent').style.fontFamily = savedFontStyle;
        document.getElementById('fontStyle').value = savedFontStyle;
    }

    // Apply saved font size if it exists
    if (savedFontSize) {
        document.getElementById('bookContent').style.fontSize = savedFontSize;
        document.getElementById('fontSize').value = savedFontSize;
    }

    // Apply saved theme if it exists
    if (savedTheme) {
        document.body.className = savedTheme;
    }

    // Function to apply the selected font style and save it
    function applySelectedFont() {
        var selectedFontStyle = document.getElementById('fontStyle').value;
        document.getElementById('bookContent').style.fontFamily = `'${selectedFontStyle}', sans-serif`;
        localStorage.setItem('fontStyle', selectedFontStyle);
    }

    // Apply the default or saved font style on page load
    applySelectedFont();

    // Event listener for font style changes
    document.getElementById('fontStyle').addEventListener('change', applySelectedFont);

    // Event listener for font size changes
    document.getElementById('fontSize').addEventListener('change', function() {
        document.getElementById('bookContent').style.fontSize = this.value;
        localStorage.setItem('fontSize', this.value);
    });

    // Toggle theme functionality
    var toggleThemeButton = document.getElementById('toggleTheme');

    toggleThemeButton.addEventListener('click', function() {
        var body = document.body;
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    // Initialize theme on page load based on saved preference
    if (savedTheme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(savedTheme);
    }

    // Navigation through chapters
    let currentChapter = 1; // Start with the first chapter
    const totalChapters = document.querySelectorAll('.chapter').length;

    function showChapter(chapter) {
        document.querySelectorAll('.chapter').forEach((element, index) => {
            element.style.display = index === chapter - 1 ? 'block' : 'none';
        });
    }

    document.getElementById('nextChapter').addEventListener('click', function() {
        if (currentChapter < totalChapters) {
            currentChapter++;
            showChapter(currentChapter);
        }
    });

    document.getElementById('prevChapter').addEventListener('click', function() {
        if (currentChapter > 1) {
            currentChapter--;
            showChapter(currentChapter);
        }
    });

    // Initialize the reader to show the first chapter, considering saved preferences
    showChapter(currentChapter);document.addEventListener('DOMContentLoaded', function () {
    // Load saved preferences for font style, size, and theme
    const savedFontStyle = localStorage.getItem('fontStyle');
    const savedFontSize = localStorage.getItem('fontSize');
    const savedTheme = localStorage.getItem('theme');

    if (savedFontStyle) {
        document.getElementById('bookContent').style.fontFamily = savedFontStyle;
        document.getElementById('fontStyle').value = savedFontStyle;
    }

    if (savedFontSize) {
        document.getElementById('bookContent').style.fontSize = savedFontSize;
        document.getElementById('fontSize').value = savedFontSize;
    }

    if (savedTheme) {
        document.body.className = savedTheme;
    }

    function applySelectedFont() {
        const selectedFontStyle = document.getElementById('fontStyle').value;
        document.getElementById('bookContent').style.fontFamily = `'${selectedFontStyle}', sans-serif`;
        localStorage.setItem('fontStyle', selectedFontStyle);
    }

    applySelectedFont();

    document.getElementById('fontStyle').addEventListener('change', applySelectedFont);

    document.getElementById('fontSize').addEventListener('change', function () {
        document.getElementById('bookContent').style.fontSize = this.value;
        localStorage.setItem('fontSize', this.value);
    });

    const toggleThemeButton = document.getElementById('toggleTheme');
    toggleThemeButton.addEventListener('click', function () {
        const body = document.body;
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    if (savedTheme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(savedTheme);
    }

    // Navigation through chapters (Next/Previous)
    let currentChapter = 1;
    const totalChapters = document.querySelectorAll('.chapter').length;

    function showChapter(chapter) {
        document.querySelectorAll('.chapter').forEach((element, index) => {
            element.style.display = index === chapter - 1 ? 'block' : 'none';
        });
    }

    document.getElementById('nextChapter').addEventListener('click', function () {
        if (currentChapter < totalChapters) {
            currentChapter++;
            showChapter(currentChapter);
        }
    });

    document.getElementById('prevChapter').addEventListener('click', function () {
        if (currentChapter > 1) {
            currentChapter--;
            showChapter(currentChapter);
        }
    });

    showChapter(currentChapter);

    // Table of Contents navigation
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const chapterId = this.getAttribute('href');
            const chapterNumber = parseInt(chapterId.replace('#chapter', ''), 10);
            if (!isNaN(chapterNumber)) {
                currentChapter = chapterNumber;
                showChapter(currentChapter);
            }
        });
    });

    // Login functionality
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username && password) {
                document.getElementById("login-section").style.display = "none";
                document.getElementById("book-section").style.display = "block";
            } else {
                alert("Please enter username and password");
            }
        });
    }

    // Extra chapter button navigation (optional)
    document.querySelectorAll(".chapter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");
            document.querySelectorAll(".chapter").forEach(ch => ch.style.display = "none");
            document.getElementById(target).style.display = "block";
        });
    });
});

    // Table of Contents navigation
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            const chapterId = this.getAttribute('href');
            const chapterNumber = parseInt(chapterId.replace('#chapter', ''), 10);
            if (!isNaN(chapterNumber)) {
                currentChapter = chapterNumber;
                showChapter(currentChapter);
            }
        });
    });
});
