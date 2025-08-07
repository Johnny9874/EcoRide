import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'password123',
      pseudo: 'EcoRider',
      role: 'USER',
      credits: 50,
    },
  });

  // Créer un véhicule lié à cet utilisateur
  const vehicle = await prisma.vehicle.create({
    data: {
      brand: 'Toyota',
      model: 'Prius',
      energy: 'Hybrid',
      color: 'Green',
      plate: 'ABC123XYZ',
      seats: 4,
      ownerId: user.id,
    },
  });

  // Créer un covoiturage avec ce véhicule et conducteur
  const carpool = await prisma.carpool.create({
    data: {
      from: 'Paris',
      to: 'Lyon',
      date: new Date('2025-08-15T09:00:00Z'),
      price: 15.5,
      isEco: true,
      seatsTotal: 4,
      seatsLeft: 3,
      driverId: user.id,
      vehicleId: vehicle.id,
      status: 'PLANNED',
    },
  });

  // Créer une réservation pour cet utilisateur
  const reservation = await prisma.reservation.create({
    data: {
      userId: user.id,
      carpoolId: carpool.id,
    },
  });

  // Ajouter un feedback à cette réservation
  const feedback = await prisma.feedback.create({
    data: {
      rating: 5,
      comment: 'Super trajet, très agréable !',
      status: 'APPROVED',
      reservationId: reservation.id,
    },
  });

  console.log('Données test insérées avec succès');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
