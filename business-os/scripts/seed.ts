import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	await prisma.kPI.create({
		data: { title: "Revenue", value: 0, target: 100 },
	});
	await prisma.lead.create({
		data: { name: "Acme Inc", stage: "New" },
	});
	await prisma.document.create({
		data: { title: "Company Handbook", content: "Welcome!", tags: ["hr", "policy"] },
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});


