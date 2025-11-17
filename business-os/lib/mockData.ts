// Mock data for frontend development without server

export const mockTasks = [
	{ id: "1", title: "Setup CI/CD Pipeline", status: "InProgress", priority: "High", dueDate: "2025-02-15" },
	{ id: "2", title: "Update Documentation", status: "Todo", priority: "Medium", dueDate: "2025-02-20" },
	{ id: "3", title: "Code Review", status: "Done", priority: "Low", dueDate: "2025-02-10" },
];

export const mockIncidents = [
	{ id: "1", title: "Server Downtime", status: "Open", severity: "High" },
	{ id: "2", title: "Database Connection Issue", status: "InProgress", severity: "Medium" },
	{ id: "3", title: "API Rate Limit", status: "Resolved", severity: "Low" },
];

export const mockBrandAssets = [
	{ id: "1", name: "Company Logo", type: "Logo", url: "https://via.placeholder.com/200", tags: ["branding", "logo"] },
	{ id: "2", name: "Brand Colors", type: "Document", url: "https://via.placeholder.com/200", tags: ["branding", "design"] },
	{ id: "3", name: "Social Media Template", type: "Image", url: "https://via.placeholder.com/200", tags: ["social", "template"] },
];

export const mockGuidelines = [
	{ id: "1", title: "Brand Voice Guide", category: "Voice", tags: ["branding", "voice"] },
	{ id: "2", title: "Design System", category: "Design", tags: ["design", "ui"] },
	{ id: "3", title: "Content Guidelines", category: "Content", tags: ["content", "writing"] },
];

export const mockCampaigns = [
	{ id: "1", name: "Q1 Product Launch", status: "Active", budget: 50000, spent: 25000 },
	{ id: "2", name: "Social Media Push", status: "Planning", budget: 10000, spent: 0 },
	{ id: "3", name: "Email Campaign", status: "Active", budget: 5000, spent: 3200 },
];

export const mockEmployees = [
	{ id: "1", name: "John Doe", email: "john@example.com", department: "Engineering", position: "Senior Developer", status: "Active" },
	{ id: "2", name: "Jane Smith", email: "jane@example.com", department: "Marketing", position: "Marketing Manager", status: "Active" },
	{ id: "3", name: "Bob Johnson", email: "bob@example.com", department: "Sales", position: "Sales Representative", status: "Active" },
];

export const mockLeaves = [
	{ id: "1", type: "Annual", startDate: "2025-02-01", endDate: "2025-02-05", status: "Approved" },
	{ id: "2", type: "Sick", startDate: "2025-02-10", endDate: "2025-02-11", status: "Pending" },
	{ id: "3", type: "Personal", startDate: "2025-02-20", endDate: "2025-02-21", status: "Approved" },
];

export const mockExpenses = [
	{ id: "1", title: "Office Supplies", amount: 500, category: "Office", status: "Approved" },
	{ id: "2", title: "Conference Tickets", amount: 2000, category: "Travel", status: "Pending" },
	{ id: "3", title: "Software License", amount: 1200, category: "Software", status: "Approved" },
];

export const mockBudgets = [
	{ id: "1", name: "Q1 Marketing Budget", amount: 100000, spent: 45000, category: "Marketing", period: "Quarterly" },
	{ id: "2", name: "Monthly Operations", amount: 50000, spent: 32000, category: "Operations", period: "Monthly" },
	{ id: "3", name: "R&D Budget", amount: 75000, spent: 28000, category: "R&D", period: "Quarterly" },
];

export const mockRequirements = [
	{ id: "1", title: "User Authentication", status: "InProgress", priority: "High" },
	{ id: "2", title: "Dashboard Redesign", status: "Backlog", priority: "Medium" },
	{ id: "3", title: "API Integration", status: "Done", priority: "High" },
];

export const mockReleases = [
	{ id: "1", name: "Version 2.0", version: "2.0.0", status: "Development", releaseDate: "2025-03-01" },
	{ id: "2", name: "Version 1.5", version: "1.5.0", status: "Released", releaseDate: "2025-01-15" },
	{ id: "3", name: "Version 1.6", version: "1.6.0", status: "Testing", releaseDate: "2025-02-20" },
];

export const mockKPIs = [
	{ id: "1", title: "Monthly Revenue", value: 85000, target: 100000 },
	{ id: "2", title: "Customer Acquisition", value: 45, target: 50 },
	{ id: "3", title: "User Engagement", value: 78, target: 80 },
];

export const mockOpportunities = [
	{ id: "1", title: "Enterprise Deal", amount: 50000, stage: "Proposal" },
	{ id: "2", title: "SMB Contract", amount: 15000, stage: "Negotiation" },
	{ id: "3", title: "Won Deal", amount: 30000, stage: "Won" },
	{ id: "4", title: "New Lead", amount: 10000, stage: "New" },
	{ id: "5", title: "Qualified Lead", amount: 25000, stage: "Qualified" },
];

export const mockSalesMetrics = {
	stages: {
		New: { count: 1, amount: 10000 },
		Qualified: { count: 1, amount: 25000 },
		Proposal: { count: 1, amount: 50000 },
		Negotiation: { count: 1, amount: 15000 },
		Won: { count: 1, amount: 30000 },
		Lost: { count: 0, amount: 0 },
	},
};

export const mockAuditLogs = [
	{ id: "1", action: "create", entity: "opportunity", createdAt: "2025-01-20T10:00:00Z" },
	{ id: "2", action: "update", entity: "kpi", createdAt: "2025-01-20T09:30:00Z" },
	{ id: "3", action: "create", entity: "task", createdAt: "2025-01-20T09:00:00Z" },
	{ id: "4", action: "delete", entity: "document", createdAt: "2025-01-19T16:00:00Z" },
	{ id: "5", action: "update", entity: "campaign", createdAt: "2025-01-19T15:30:00Z" },
];

