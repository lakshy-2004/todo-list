import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connection from './connection/connection.js';
import auth from './routes/auth.js';
import list from './routes/list.js';

const PORT = 1000;
const app = express();
app.use(express.json());
app.use(cors());  // cors used to request api from frontend to backend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

app.use(express.static(path.join(__dirname, "frontend", "build")));


connection(); // Database Connection 

// app.get("/" , (req,res) => {
//     res.send("Hello");
// })

app.use("/api/v1", auth);   
app.use("/api/v2", list);   


app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(PORT , () => {
    console.log(`Server is running on port : ${PORT}`);
})