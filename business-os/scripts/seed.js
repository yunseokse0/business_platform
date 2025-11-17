/* eslint-disable no-console */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
	console.log("Seeding: clearing existing data...");
	await prisma.auditLog.deleteMany();
	await prisma.opportunity.deleteMany();
	await prisma.document.deleteMany();
	await prisma.lead.deleteMany();
	await prisma.kPI.deleteMany();

	console.log("Seeding: KPI...");
	await prisma.kPI.createMany({
		data: [
			{ title: "Revenue", value: 80, target: 100, ownerId: null },
			{ title: "Revenue", value: 90, target: 100, ownerId: null },
			{ title: "Revenue", value: 110, target: 120, ownerId: null },
			{ title: "Leads", value: 40, target: 50, ownerId: null },
			{ title: "Leads", value: 48, target: 50, ownerId: null }
		],
	});

	console.log("Seeding: Leads...");
	await prisma.lead.createMany({
		data: [
			{ name: "Acme Inc", stage: "New" },
			{ name: "Globex", stage: "Qualified" },
			{ name: "Initech", stage: "Proposal" },
		],
	});

	console.log("Seeding: Documents...");
	await prisma.document.createMany({
		data: [
			{ title: "Company Handbook", content: "Welcome to BUSINESS OS", tags: ["hr", "policy"] },
			{ title: "Brand Guide", content: "Logo usage and colors", tags: ["brand"] },
			{ title: "Sales Playbook", content: "Discovery → Demo → Close", tags: ["sales"] },
		],
	});

	console.log("Seeding: Opportunities...");
	await prisma.opportunity.createMany({
		data: [
			{ title: "ACV Expansion", amount: 5000, stage: "Qualified" },
			{ title: "New Deal - Northwind", amount: 12000, stage: "New" },
			{ title: "Renewal - Contoso", amount: 8000, stage: "Negotiation" },
			{ title: "Pilot - Umbrella", amount: 3000, stage: "Proposal" },
			{ title: "Churn Risk - Wayne", amount: 0, stage: "Lost" },
			{ title: "Enterprise - Stark", amount: 40000, stage: "Won" },
		],
	});

	console.log("Seed completed.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});


