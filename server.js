import app from "./src/app.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Serveur is running on http://localhost:${port}`);
});
