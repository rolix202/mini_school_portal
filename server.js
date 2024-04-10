import mongoose from "mongoose";
import app from "./index.js";
import * as dotenv from "dotenv";
dotenv.config()

mongoose.connect(process.env.LOCAL_CONN_URL)
.then((conn) => {
    console.log('Database successfully connected ...!');
})
.catch((err) => {
    console.log("Error occured:", err);
    console.log('Could not connect to database');
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port} `));