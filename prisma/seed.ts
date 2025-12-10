import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set.');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  function generateRequestNumber() {
    const year = new Date().getFullYear();
    const random = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
    return `MR-${year}-${random}`;
  }

  const passwordHash = await bcrypt.hash('Pa$$w0rd!', 10);

  const engineering = await prisma.department.upsert({
    where: { name: 'Engineering' },
    update: {},
    create: { name: 'Engineering' },
  });

  const manager = await prisma.position.upsert({
    where: { name: 'Manager' },
    update: {},
    create: { name: 'Manager' },
  });

  const technician = await prisma.position.upsert({
    where: { name: 'Technician' },
    update: {},
    create: { name: 'Technician' },
  });

  const approver = await prisma.user.upsert({
    where: { email: 'approver@company.com' },
    update: {},
    create: {
      name: 'Alex Approver',
      email: 'approver@company.com',
      phone_number: '1234567890',
      password: passwordHash,
      role: 'APPROVER',
      status: 'ACTIVE',
      department_id: engineering.id,
      position_id: manager.id,
    },
  });

  const requester = await prisma.user.upsert({
    where: { email: 'requester@company.com' },
    update: {},
    create: {
      name: 'Bob Requester',
      email: 'requester@company.com',
      phone_number: '0987654321',
      password: passwordHash,
      role: 'REQUESTER',
      status: 'ACTIVE',
      department_id: engineering.id,
      position_id: technician.id,
    },
  });

  const request1 = await prisma.request.create({
    data: {
      requested_by_id: requester.id,
      department_id: engineering.id,
      request_code: generateRequestNumber(),
      request_date: new Date('2025-12-01T10:00:00Z'),
      project_name: 'Q4 Server Rack Upgrade',
      priority: 'HIGH',
      status: 'APPROVED',
      notes:
        'Critical materials needed immediately for infrastructure project.',
      approved_by_id: approver.id,
      approved_at: new Date(),

      MaterialDetails: {
        create: [
          {
            material_code: 'CBL-CAT6',
            material_description: 'CAT6 Plenum Ethernet Cable, 500ft',
            quantity: 1,
            unit: 'REEL',
            material_type: 'Network',
            specification: 'Plenum rated, Blue',
            brand: 'CommLink',
            notes: 'For ceiling runs.',
          },
          {
            material_code: 'SCW-5MM',
            material_description: '5mm Rack Mounting Screws',
            quantity: 200,
            unit: 'PCS',
            material_type: 'Hardware',
            specification: 'Zinc Plated',
            brand: 'FastenPro',
            notes: 'Need spares for expansion.',
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seeding Error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
