import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get('/', (req, res)=>{
    res.render('index');
});

//Exportamos el router
export default viewsRouter;