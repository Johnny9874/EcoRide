function toggleMenu() {
    const menu = document.querySelector('.nav-links');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  try {
    const res = await fetch('https://ecoride-43lc.onrender.com/api/sql/logins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Connexion réussie !');
      // redirection selon le rôle si nécessaire
      if (role === 'USER') window.location.href = 'user.html';
      else if (role === 'EMPLOYEE') window.location.href = 'dashboard-driver.html';
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert('Erreur serveur, réessayez plus tard.');
  }
});
