import { Router } from "express";
import UserController from "../Controller/UserController.js";

const UserRouter = new Router();
const url = process.env.URL_USER;
// console.log(url);
const Controller = new UserController;

UserRouter.get(`${url}+/readData`, Controller.ReadData);

UserRouter.post(`${url}+/addData`, Controller.InsertData);

UserRouter.put(`${url}+/updateData`, Controller.UpdateData);

UserRouter.delete(`${url}+/deleteData`, Controller.DeleteData);

export default UserRouter;