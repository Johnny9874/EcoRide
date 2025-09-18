function toggleMenu() {
    const menu = document.querySelector('.nav-links');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

window.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:3000/api/sql/reservations/me', {
      headers: { 'Authorization': `Bearer ${token}` }
  });

  const reservations = await res.json();

  const body = document.getElementById('reservations-body');

  body.innerHTML = reservations.map(r => `
      <tr>
          <td>${new Date(r.carpool.date).toLocaleDateString()}</td>
          <td>${r.carpool.from}</td>
          <td>${r.carpool.to}</td>
          <td>${r.carpool.driver.pseudo}</td>
          <td><button class="btn-delete" data-id="${r.id}">Supprimer</button></td>
      </tr>
  `).join("");

  document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async e => {
          const reservationId = e.target.dataset.id;
          const token = localStorage.getItem('token');

          const res = await fetch(`http://localhost:3000/api/sql/reservations/${reservationId}`, {
              method: 'DELETE',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });

          if (res.ok) {
                alert("Réservation supprimée !");
                // Recharger la page ou mettre à jour l'interface
                location.reload();
            } else {
                const data = await res.json();
                alert(data.error);
            }
        });
    });
});