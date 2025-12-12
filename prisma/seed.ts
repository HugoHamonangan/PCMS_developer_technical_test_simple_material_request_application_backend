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

  const passwordHash = await bcrypt.hash('Pa$$w0rd!', 11);

  // Create 5 Departments
  const engineering = await prisma.department.upsert({
    where: { name: 'Engineering' },
    update: {},
    create: { name: 'Engineering' },
  });

  const it = await prisma.department.upsert({
    where: { name: 'IT' },
    update: {},
    create: { name: 'IT' },
  });

  const operations = await prisma.department.upsert({
    where: { name: 'Operations' },
    update: {},
    create: { name: 'Operations' },
  });

  const maintenance = await prisma.department.upsert({
    where: { name: 'Maintenance' },
    update: {},
    create: { name: 'Maintenance' },
  });

  const procurement = await prisma.department.upsert({
    where: { name: 'Procurement' },
    update: {},
    create: { name: 'Procurement' },
  });

  // Create 5 Positions
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

  const supervisor = await prisma.position.upsert({
    where: { name: 'Supervisor' },
    update: {},
    create: { name: 'Supervisor' },
  });

  const engineer = await prisma.position.upsert({
    where: { name: 'Engineer' },
    update: {},
    create: { name: 'Engineer' },
  });

  const specialist = await prisma.position.upsert({
    where: { name: 'Specialist' },
    update: {},
    create: { name: 'Specialist' },
  });

  // Create 5 Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@company.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@company.com',
      phone_number: '1111111111',
      password: passwordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      department_id: it.id,
      position_id: manager.id,
    },
  });

  const approver = await prisma.user.upsert({
    where: { email: 'approver@company.com' },
    update: {},
    create: {
      name: 'Alex Approver',
      email: 'approver@company.com',
      phone_number: '2222222222',
      password: passwordHash,
      role: 'APPROVER',
      status: 'ACTIVE',
      department_id: engineering.id,
      position_id: supervisor.id,
    },
  });

  const requester1 = await prisma.user.upsert({
    where: { email: 'requester1@company.com' },
    update: {},
    create: {
      name: 'Bob Requester',
      email: 'requester1@company.com',
      phone_number: '3333333333',
      password: passwordHash,
      role: 'REQUESTER',
      status: 'ACTIVE',
      department_id: engineering.id,
      position_id: technician.id,
    },
  });

  const requester2 = await prisma.user.upsert({
    where: { email: 'requester2@company.com' },
    update: {},
    create: {
      name: 'Carol Engineer',
      email: 'requester2@company.com',
      phone_number: '4444444444',
      password: passwordHash,
      role: 'REQUESTER',
      status: 'ACTIVE',
      department_id: operations.id,
      position_id: engineer.id,
    },
  });

  const requester3 = await prisma.user.upsert({
    where: { email: 'requester3@company.com' },
    update: {},
    create: {
      name: 'David Specialist',
      email: 'requester3@company.com',
      phone_number: '5555555555',
      password: passwordHash,
      role: 'REQUESTER',
      status: 'ACTIVE',
      department_id: maintenance.id,
      position_id: specialist.id,
    },
  });

  // Create 5 Requests with Material Details
  const request1 = await prisma.request.create({
    data: {
      requested_by_id: requester1.id,
      department_id: engineering.id,
      request_code: generateRequestNumber(),
      request_date: new Date('2025-12-01T10:00:00Z'),
      project_name: 'Q4 Server Rack Upgrade',
      priority: 'HIGH',
      status: 'APPROVED',
      notes:
        'Critical materials needed immediately for infrastructure project.',
      approved_by_id: approver.id,
      approved_at: new Date('2025-12-02T09:30:00Z'),

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
          {
            material_code: 'PWR-PDU',
            material_description: '8-Outlet Rack PDU',
            quantity: 4,
            unit: 'PCS',
            material_type: 'Power',
            specification: '15A, 120V',
            brand: 'PowerTech',
            notes: 'Vertical mount preferred.',
          },
        ],
      },
    },
  });

  const request2 = await prisma.request.create({
    data: {
      requested_by_id: requester2.id,
      department_id: operations.id,
      request_code: generateRequestNumber(),
      request_date: new Date('2025-12-03T14:15:00Z'),
      project_name: 'Factory Floor Lighting Replacement',
      priority: 'MEDIUM',
      status: 'SUBMITTED',
      notes: 'LED upgrades for energy efficiency.',

      MaterialDetails: {
        create: [
          {
            material_code: 'LED-150W',
            material_description: '150W LED High Bay Light',
            quantity: 24,
            unit: 'PCS',
            material_type: 'Lighting',
            specification: '5000K, 18000 Lumens',
            brand: 'BrightView',
            notes: 'Include mounting hardware.',
          },
          {
            material_code: 'WR-14G',
            material_description: '14 AWG Electrical Wire',
            quantity: 500,
            unit: 'FEET',
            material_type: 'Electrical',
            specification: 'THHN, Black',
            brand: 'WirePro',
            notes: '',
          },
        ],
      },
    },
  });

  const request3 = await prisma.request.create({
    data: {
      requested_by_id: requester3.id,
      department_id: maintenance.id,
      request_code: generateRequestNumber(),
      request_date: new Date('2025-12-04T08:45:00Z'),
      project_name: 'HVAC System Maintenance',
      priority: 'LOW',
      status: 'APPROVED',
      notes: 'Quarterly maintenance supplies.',
      approved_by_id: approver.id,
      approved_at: new Date('2025-12-05T11:20:00Z'),

      MaterialDetails: {
        create: [
          {
            material_code: 'FLT-20X25',
            material_description: 'HVAC Air Filter 20x25x4',
            quantity: 12,
            unit: 'PCS',
            material_type: 'HVAC',
            specification: 'MERV 13',
            brand: 'AirFlow',
            notes: 'For all AHU units.',
          },
          {
            material_code: 'REF-R410A',
            material_description: 'R-410A Refrigerant',
            quantity: 3,
            unit: 'CYLINDER',
            material_type: 'HVAC',
            specification: '25 lb cylinder',
            brand: 'CoolTech',
            notes: 'Handle with care.',
          },
          {
            material_code: 'BLT-V',
            material_description: 'V-Belt Set',
            quantity: 6,
            unit: 'SET',
            material_type: 'Mechanical',
            specification: 'Size B',
            brand: 'DriveMax',
            notes: '',
          },
        ],
      },
    },
  });

  const request4 = await prisma.request.create({
    data: {
      requested_by_id: requester1.id,
      department_id: engineering.id,
      request_code: generateRequestNumber(),
      request_date: new Date('2025-12-06T16:30:00Z'),
      project_name: 'Control Panel Assembly',
      priority: 'HIGH',
      status: 'REJECTED',
      notes: 'Components for new automation panel.',
      approved_by_id: approver.id,
      approved_at: new Date('2025-12-07T10:00:00Z'),

      MaterialDetails: {
        create: [
          {
            material_code: 'PLC-AB',
            material_description: 'Allen Bradley CompactLogix PLC',
            quantity: 1,
            unit: 'PCS',
            material_type: 'Control',
            specification: '1769-L33ER',
            brand: 'Allen Bradley',
            notes: 'Include programming cable.',
          },
          {
            material_code: 'RLY-24V',
            material_description: '24VDC Control Relay',
            quantity: 10,
            unit: 'PCS',
            material_type: 'Control',
            specification: '10A contacts',
            brand: 'Omron',
            notes: '',
          },
        ],
      },
    },
  });

  const request5 = await prisma.request.create({
    data: {
      requested_by_id: requester2.id,
      department_id: operations.id,
      request_code: generateRequestNumber(),
      request_date: new Date('2025-12-08T11:00:00Z'),
      project_name: 'Safety Equipment Restocking',
      priority: 'MEDIUM',
      status: 'SUBMITTED',
      notes: 'Monthly safety supplies order.',

      MaterialDetails: {
        create: [
          {
            material_code: 'PPE-GLOVE',
            material_description: 'Cut-Resistant Gloves',
            quantity: 50,
            unit: 'PAIR',
            material_type: 'Safety',
            specification: 'Level 5 protection, Size L',
            brand: 'SafeGuard',
            notes: '',
          },
          {
            material_code: 'PPE-GLASS',
            material_description: 'Safety Glasses',
            quantity: 30,
            unit: 'PCS',
            material_type: 'Safety',
            specification: 'Anti-fog, Clear lens',
            brand: 'VisionPro',
            notes: '',
          },
          {
            material_code: 'TAPE-WARN',
            material_description: 'Caution Tape',
            quantity: 10,
            unit: 'ROLL',
            material_type: 'Safety',
            specification: 'Yellow/Black, 300ft',
            brand: 'WarnLine',
            notes: '',
          },
        ],
      },
    },
  });

  console.log('Seeding completed successfully!');
  console.log({
    departments: 5,
    positions: 5,
    users: 5,
    requests: 5,
    totalMaterialDetails: 13,
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
