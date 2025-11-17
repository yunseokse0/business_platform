import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// KPI
	await prisma.kPI.create({
		data: { title: "Monthly Revenue", value: 85000, target: 100000 },
	});
	await prisma.kPI.create({
		data: { title: "Customer Acquisition", value: 45, target: 50 },
	});

	// Leads
	await prisma.lead.create({
		data: { name: "Acme Inc", stage: "New", history: [{ at: new Date().toISOString(), note: "Initial contact" }] },
	});
	await prisma.lead.create({
		data: { name: "TechCorp", stage: "Qualified", history: [{ at: new Date().toISOString(), note: "Qualified" }] },
	});

	// Documents
	await prisma.document.create({
		data: { title: "Company Handbook", content: "Welcome to our company!", tags: ["hr", "policy"] },
	});
	await prisma.document.create({
		data: { title: "API Documentation", content: "API endpoints and usage", tags: ["tech", "docs"] },
	});

	// Opportunities
	await prisma.opportunity.create({
		data: { title: "Enterprise Deal", amount: 50000, stage: "Proposal" },
	});
	await prisma.opportunity.create({
		data: { title: "SMB Contract", amount: 15000, stage: "Negotiation" },
	});
	await prisma.opportunity.create({
		data: { title: "Won Deal", amount: 30000, stage: "Won" },
	});

	// Operation - Tasks
	await prisma.task.create({
		data: { title: "Setup CI/CD Pipeline", status: "InProgress", priority: "High" },
	});
	await prisma.task.create({
		data: { title: "Update Documentation", status: "Todo", priority: "Medium" },
	});

	// Operation - Incidents
	await prisma.incident.create({
		data: { title: "Server Downtime", severity: "High", status: "Open" },
	});

	// Brand - Assets
	await prisma.brandAsset.create({
		data: { name: "Company Logo", type: "Logo", url: "https://example.com/logo.png", tags: ["branding"] },
	});
	await prisma.brandAsset.create({
		data: { name: "Brand Colors", type: "Document", tags: ["branding", "design"] },
	});

	// Brand - Guidelines
	await prisma.guideline.create({
		data: { title: "Brand Voice Guide", content: "Our brand voice is professional yet friendly...", category: "Voice", tags: ["branding"] },
	});

	// Marketing - Campaigns
	await prisma.campaign.create({
		data: { name: "Q1 Product Launch", status: "Active", budget: 50000, spent: 25000 },
	});
	await prisma.campaign.create({
		data: { name: "Social Media Push", status: "Planning", budget: 10000 },
	});

	// HR - Employees
	await prisma.employee.create({
		data: { name: "John Doe", email: "john@example.com", department: "Engineering", position: "Senior Developer", status: "Active" },
	});
	await prisma.employee.create({
		data: { name: "Jane Smith", email: "jane@example.com", department: "Marketing", position: "Marketing Manager", status: "Active" },
	});

	// HR - Leaves
	await prisma.leave.create({
		data: { type: "Annual", startDate: new Date("2025-02-01"), endDate: new Date("2025-02-05"), status: "Approved" },
	});

	// Finance - Expenses
	await prisma.expense.create({
		data: { title: "Office Supplies", amount: 500, category: "Office", status: "Approved" },
	});
	await prisma.expense.create({
		data: { title: "Conference Tickets", amount: 2000, category: "Travel", status: "Pending" },
	});

	// Finance - Budgets
	await prisma.budget.create({
		data: { name: "Q1 Marketing Budget", amount: 100000, spent: 45000, category: "Marketing", period: "Quarterly" },
	});
	await prisma.budget.create({
		data: { name: "Monthly Operations", amount: 50000, spent: 32000, category: "Operations", period: "Monthly" },
	});

	// Product - Requirements
	await prisma.requirement.create({
		data: { title: "User Authentication", description: "Implement OAuth2", priority: "High", status: "InProgress" },
	});
	await prisma.requirement.create({
		data: { title: "Dashboard Redesign", description: "Modern UI update", priority: "Medium", status: "Backlog" },
	});

	// Product - Releases
	await prisma.release.create({
		data: { name: "Version 2.0", version: "2.0.0", status: "Development", releaseDate: new Date("2025-03-01") },
	});
	await prisma.release.create({
		data: { name: "Version 1.5", version: "1.5.0", status: "Released", releaseDate: new Date("2025-01-15") },
	});

	console.log("Seed data created successfully!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});


