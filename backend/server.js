import app from "./app.js"
import { connectDB } from "./src/config/dbConnect.js"
import { config } from 'dotenv';

config();

await connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log(`server is listening on ${PORT}`) })
