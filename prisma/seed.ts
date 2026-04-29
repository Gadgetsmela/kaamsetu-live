import { PrismaClient, Role, JobUrgency } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.jobApplication.deleteMany();
  await prisma.savedJob.deleteMany();
  await prisma.message.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.job.deleteMany();
  await prisma.ownerProfile.deleteMany();
  await prisma.workerProfile.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = hashSync("password123", 10);

  const owner = await prisma.user.create({
    data: {
      phone: "+919900000001",
      email: "owner@kaamsetu.app",
      passwordHash,
      role: Role.OWNER,
      name: "Ravi Constructions",
      ownerProfile: { create: { organization: "Ravi Constructions", whatsapp: "+919900000001" } }
    }
  });

  const worker = await prisma.user.create({
    data: {
      phone: "+919900000002",
      email: "worker@kaamsetu.app",
      passwordHash,
      role: Role.WORKER,
      name: "Suresh Kumar",
      workerProfile: {
        create: {
          location: "Delhi",
          skills: ["masonry", "painting"],
          experienceYears: 4,
          expectedWage: 1200,
          availability: "Weekdays"
        }
      }
    }
  });

  await prisma.user.create({
    data: {
      phone: "+919900000003",
      email: "admin@kaamsetu.app",
      passwordHash,
      role: Role.ADMIN,
      name: "Platform Admin"
    }
  });

  await prisma.job.create({
    data: {
      ownerId: owner.id,
      title: "Need 2 painters for shop renovation",
      category: "Painting",
      description: "Exterior and interior painting for a 500 sq ft shop",
      budgetMin: 2000,
      budgetMax: 4000,
      location: "Delhi",
      requiredDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      workersRequired: 2,
      skillRequirement: ["painting"],
      contactPreference: "WhatsApp",
      urgency: JobUrgency.HIGH,
      imageUrls: [],
      applications: {
        create: {
          workerId: worker.id,
          coverMessage: "I have handled similar renovation work.",
          proposedWage: 3000
        }
      }
    }
  });
}

main().finally(async () => prisma.$disconnect());
