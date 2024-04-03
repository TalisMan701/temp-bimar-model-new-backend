import express from "express";
import fs from "fs";

const router = express.Router();
router.get("/:fileId", async (req, res) => {
	try {
		const { fileId } = req.params;
		const { scope } = req.query;
		if (!fileId) return res.status(405).json({ message: "Missing param" });
		if (scope && scope === "json") {
			let buffer = fs.readFileSync("uploads/" + fileId + ".json");
			res.write(buffer);
			res.write("\n\n");
			res.end();
		} else {
			let buffer = fs.readFileSync("uploads/" + fileId + ".frag");
			getFileWeb(res, fileId, buffer);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

function getFileWeb(res, fileId, buffer) {
	res.setHeader("Content-Type", "application/octet-stream");
	res.setHeader("Content-Disposition", `attachment; filename="${fileId}.frag"`);
	res.setHeader("Content-Length", buffer.length);

	res.write(buffer);
	res.write("\n\n");
	res.end();
}

export default router;
