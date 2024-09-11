import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { saveScript, getScripts } from "./helpers/ScriptController.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Turn website into structured data.");
});

// POST /scape
app.post("/scrape", async (req, res) => {
	// destructure req and get url
	const { url, command } = req.body;

	// check if url is valid
	if (!url) {
		return res.status(400).json({ error: "URL is required" });
	}

	// check if command is valid
	if (!command) {
		return res.status(400).json({ error: "Command is required" });
	}

	const outputSchema = {
		type: "array",
		items: {
			type: "object",
			properties: {
				title: { type: "string" },
				url: { type: "string" },
				points: { type: "integer" },
				author: { type: "string" },
				comments: { type: "integer" },
			},
		},
	};

	const data = {
		url,
		command,
		output_schema: outputSchema,
	};

	// Send a POST request to the Capybara API
	fetch(`${process.env.CAPYBARA_URL}/v1/scripts/generate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": process.env.CAPYBARA_API,
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			const scriptId = data.id;
			console.log(scriptId);

			if (scriptId) saveScript({ command, url, scriptId });
			else console.error("Scroid ID not found");

			console.log(data);
			res.status(200).json(data);
		})
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).json({ error });
		});
});

// GET /scripts
app.get("/scripts", async (req, res) => {
	const scripts = await getScripts();
	res.json(scripts);
});

// Execute script by ID
app.post("/execute/:id", (req, res) => {
	const { id } = req.params;

	fetch(`${process.env.CAPYBARA_URL}/v1/scripts/execute`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": process.env.CAPYBARA_API,
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => console.log(data));
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
