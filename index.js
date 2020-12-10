const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/generate", require("./routes/generate"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Succesfully Started');
    console.log(`Server has started on PORT ${PORT}`);
  });
  