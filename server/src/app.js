import express from "express";
import cors from "cors";
import { openDb } from './infra/configDB.js'

import CreateTableCinema from "./models/cinema.js";
import CreateTableFilme from "./models/filme.js";

import CinemaController from "./controller/cinema-controller.js";
import FilmeController from "./controller/filme-controller.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

openDb();
CreateTableCinema.cinema();
CreateTableFilme.filme();

CinemaController.rotas(app);
FilmeController.rotas(app);

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Servidor conectado na porta ${port}`);
})