function toggleMenu() {
    const menu = document.querySelector('.nav-links');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

document.getElementById('form-contact').addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('nom-input').value + " " + document.getElementById('prenom-input').value; 
    const email = document.getElementById('email-input').value;
    const message = document.querySelector('.contact-message').value;

    const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    alert(data.message);
});