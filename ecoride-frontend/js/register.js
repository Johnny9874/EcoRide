function toggleMenu() {
    const menu = document.querySelector('.nav-links');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

document.getElementById('register-form').addEventListener('submit', async e => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const pseudo = document.getElementById('pseudo').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const res = await fetch('https://ecoride-43lc.onrender.com/api/sql/register', {
        method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role, pseudo })
    });

    const data = await res.json();
        
    if (res.ok) {
        localStorage.setItem('token', data.token); //Stock le token
        alert('Inscription réussie !');
        window.location.href = "connexion.html";
    } else {
        alert(data.error);
    }
});