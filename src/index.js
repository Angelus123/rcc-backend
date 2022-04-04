import express from "express";
import userRouter from "./users/routers/user.route.js";
import blogRouter from "./blogs/routers/blog.route.js";
import messageRouter from "./messages/routers/message.route.js";
import * as globalErrorHandling from "./utils/ErrorController.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import low from "lowdb";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import FileSync from "lowdb/adapters/FileSync.js";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("uncaught Exception * Shutdown");
  process.exit(1);
});
dotenv.config({ path: "./config/config.env" });


const port = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Db connection done successfully"));

  const options = { 
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "My brand Library API",
      },
      servers: [
        {
          url: "http://localhost:4042",
        },
      ],
    },
    apis: ["./src/messages/*/*.js", "./src/users/*/*.js", "./src/blogs/*/*.js" ],
  };
const specs = swaggerJsDoc(options);
const app = express(); 
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// app.use("/books", booksRouter);
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.get('/', (req,res)=>{res.status(200).send({
  status:200, 
  message:'welcome to patiente registration',
})})
// app.use("/books", booksRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", blogRouter);
app.use("/api/v1/", messageRouter);
app.use(globalErrorHandling.globalErrorHandling);
app.listen(port, () => console.log(`server is running at port ${port}`));
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhundled rejection * Shutdown");
  server.close(() => process.exit(1));
});
export default app
