function toggleMenu() {
    const menu = document.querySelector('.nav-links');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function toggleFilterMenu() {
    const section = document.querySelector('.padding');
    section.classList.toggle('active');
}

document.getElementById("form-recherche").addEventListener('submit', async (e) => {
    e.preventDefault();

    const depart = document.getElementById('depart-input').value;
    const arrive = document.getElementById('arrive-input').value;
    const date = document.getElementById('date-input').value;
    const passagers = document.getElementById('nombre-passagers').value;

    const params = new URLSearchParams({ depart, arrive, date, passagers });
    const url = `http://localhost:3000/api/sql/carpools?${params.toString()}`;

    fetch(url)
        .then(res => res.json())
        .then(carpools => {
            const cardsContainer = document.querySelector('.cards');

            if (!carpools.length) {
                cardsContainer.innerHTML = "<p>Aucun trajet trouvé</p>";
                return;
            }
            cardsContainer.innerHTML = carpools.map(c => `
                <div class="card">
                    <h3>${c.from} → ${c.to}</h3>
                    <p>Date : ${new Date(c.date).toLocaleDateString()}</p>
                    <p>Prix : ${c.price} €</p>
                    <p>Places restantes : ${c.seatsLeft}</p>
                    <p>Conducteur : ${c.driver?.pseudo || 'N/A'}</p>
                    <button class="btn-reserver" data-id="${c.id}">Réserver</button>
                </div>
                `).join("");

                document.querySelectorAll('.btn-reserver').forEach(btn => {
                    btn.addEventListener('click', async e => {
                        const carpoolId = e.target.dataset.id;
                        const token = localStorage.getItem('token');

                        const res = await fetch('http://localhost:3000/api/sql/reservations', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                        body: JSON.stringify({ carpoolId })
                    });

                const data = await res.json();
                if (res.ok) {
                    alert("Réservation confirmée !");
                    // on redirige vers l'espace utilisateur
                    window.location.href = "user.html";
                } else {
                    alert(data.error);
                }
            });
            })
            .catch((err) => console.log(err));
        })
});