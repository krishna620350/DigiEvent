import { Router } from "express";
import GuestController from "../Controller/GuestController.js";

const GuestRouter = new Router();
const url = process.env.URL_Guest;
// console.log(url);
const Controller = new GuestController;

GuestRouter.post(`${url}+/readData`, Controller.ReadData);

GuestRouter.post(`${url}+/addData`, Controller.InsertData);

GuestRouter.post(`${url}+/fetchData`, Controller.FetchData);

// EventRouter.delete(`${url}+/deleteData`, Controller.DeleteData);

export default GuestRouter;