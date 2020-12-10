const express = require("express");
const router = express.Router();
const json2md = require("json2md");
let fs = require("fs");
const { mdToPdf } = require("md-to-pdf");

router.post("/", async (req, res) => {
  try {
    const result = json2md([
      { h1: "JSON To Markdown" },
      { blockquote: "A JSON to Markdown converter." },
      {
        img: [
          { title: "Some image", source: "https://example.com/some-image.png" },
          {
            title: "Another image",
            source: "https://example.com/some-image1.png",
          },
          {
            title: "Yet another image",
            source: "https://example.com/some-image2.png",
          },
        ],
      },
      { h2: "Features" },
      {
        ul: [
          "Easy to use",
          "You can programmatically generate Markdown content",
          "...",
        ],
      },
      { h2: "How to contribute" },
      {
        ol: ["Fork the project", "Create your branch", "Raise a pull request"],
      },
      { h2: "Code blocks" },
      { p: "Below you can see a code block example." },
      {
        code: {
          language: "js",
          content: [
            "function sum (a, b) {",
            "   return a + b",
            "}",
            "sum(1, 2)",
          ],
        },
      },
    ]);
    await mdToPdf({ content: result }, { dest: "./output.pdf" });
    var file = fs.createReadStream("./output.pdf");
    var stat = fs.statSync("./output.pdf");
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=quote.pdf");
    file.pipe(res)
        try {
            fs.unlinkSync("./output.pdf")
        } catch (err) {
            throw err
        }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
});

module.exports = router;
