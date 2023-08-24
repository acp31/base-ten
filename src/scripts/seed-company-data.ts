import { prisma } from "@/lib/prisma";
import { companies } from "@/config/companies";

const createCompanies = async () => {
  await prisma.company.createMany({ data: [...companies] })
}

(async function run() {
  try {
    await createCompanies()
    await prisma.$disconnect()
  } catch (error) {
    console.error('error occured:', error);
    await prisma.$disconnect()
  }
})();


