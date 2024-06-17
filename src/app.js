import express from "express";
import { router } from "./routes/index.route.js";
import { userTable } from "./models/user.model.js";
// import { logMiddleware } from "./middlewares/log.middleware.js";


try {
    console.log('\n')
    await userTable();
    
} catch (e) {
    console.log(e);
}



export const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(logMiddleware);

app.use(router);



