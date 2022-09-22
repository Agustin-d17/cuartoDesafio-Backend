import express, {json} from 'express';
import { router } from './expressRoutes.js'
import randomInteger from 'random-int'

const app = express();

app.use(json())

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

server.on('error', (err) => {console.log(err)});

app.use("/api/productos/", router)
app.use(express.static("./public"))
