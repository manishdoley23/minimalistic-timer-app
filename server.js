import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(path.resolve(), "dist")));
app.get("/", (req, res) => {
	res.sendFile(path.join(path.resolve(), "dist", "index.html"));
});

app.listen(9999, () => {
	console.log("NODE ON 9999 EXPRESS");
});
// import http from "http";
// import fs from "fs";
// import path from "path";

// const server = http.createServer(async (req, res) => {
// 	// if (req.method === "GET") {
// 	// if (req.url === "/") {
// 	const filePath = path.join(path.resolve(), "dist", "index.html");
// 	fs.readFile(filePath, (err, data) => {
// 		if (err) {
// 			res.writeHead(500, { "Content-Type": "text/plain" });
// 			res.end("Internal Server Error");
// 		} else {
// 			res.writeHead(200, { "Content-Type": "text/html" });
// 			res.end(data);
// 		}
// 	});
// 	// } else {
// 	// res.writeHead(404, { "Content-Type": "text/plain" });
// 	// res.end("Not Found");
// 	// }
// 	// }
// });

// server.listen(9999, () => {
// 	console.log("NODE ON 9999 NODE");
// });
