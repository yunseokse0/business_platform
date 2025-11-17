interface ModulePageProps {
	params: { module: string };
}

export default function ModulePage({ params }: ModulePageProps) {
	const { module } = params;
	return (
		<div style={{ padding: 20 }}>
			<h1>Module: {module}</h1>
			<p>Placeholder page for module routes.</p>
		</div>
	);
}


