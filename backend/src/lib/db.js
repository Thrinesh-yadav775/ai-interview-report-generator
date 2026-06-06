const { PrismaClient } = require('../generated/prisma')
const { PrismaPg } = require('@prisma/adapter-pg')

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

const prisma = globalThis.prismaGlobal ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}

module.exports = prisma
