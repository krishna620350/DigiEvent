import { Router } from "express";
import GuestController from "../Controller/GuestController.js";

const GuestRouter = new Router();
const url = process.env.URL_GUEST;
// console.log(url);
const Controller = new GuestController;

GuestRouter.post(`${url}+/readData`, Controller.ReadData);

GuestRouter.post(`${url}+/addData`, Controller.InsertData);

GuestRouter.post(`${url}+/fetchData`, Controller.FetchData);

GuestRouter.put(`${url}+/updateData`, Controller.UpdateData);

export default GuestRouter;