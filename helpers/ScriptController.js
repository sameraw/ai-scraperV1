import fs from "fs";

export const saveScript = (data) => {
	const { command, url, scriptId } = data;

	const scriptPath = "./scripts/scripts.json";

	// Read existing scripts from scripts.json
	let scripts = [];
	try {
		const scriptsData = fs.readFileSync(scriptPath);
		scripts = JSON.parse(scriptsData);
	} catch (error) {
		console.error("Error reading scripts.json:", error);
	}

	// Add new script to scripts array
	const newScript = {
		command,
		url,
		scriptId,
	};
	scripts.push(newScript);

	// Write updated scripts array to scripts.json
	try {
		fs.writeFile(scriptPath, JSON.stringify(scripts), (error) => {
			if (error) {
				console.error("Error writing to scripts.json:", error);
			} else {
				console.log("Script saved to scripts.json");
			}
		});
	} catch (error) {
		console.error("Error writing to scripts.json:", error);
	}
};


export const getScripts = async () => {
	const scriptPath = "./scripts/scripts.json";

	let scripts = [];
	try {
		const scriptsData = fs.readFileSync(scriptPath);
		scripts = JSON.parse(scriptsData);
	} catch (error) {
		console.error("Error reading scripts.json:", error);
	}

	return scripts;
}