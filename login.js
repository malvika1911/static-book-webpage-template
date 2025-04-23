document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const userInput = document.getElementById('username').value.trim();
  const passInput = document.getElementById('password').value;

  fetch('users.xml')
    .then(r => r.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(xml => {
      const users = Array.from(xml.getElementsByTagName('user'));
      const match = users.find(u => {
        return u.getElementsByTagName('username')[0].textContent === userInput
            && u.getElementsByTagName('password')[0].textContent === passInput;
      });
      if (match) {
        window.location.href = 'home.html';
      } else {
        document.getElementById('msg').textContent = 'Invalid credentials.';
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('msg').textContent = 'Error loading users.';
    });
});
