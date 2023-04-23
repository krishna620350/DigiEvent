import { Router } from "express";
import EventController from "../Controller/EventController.js";

const EventRouter = new Router();
const url = process.env.URL_EVENT;
// console.log(url);
const Controller = new EventController;

EventRouter.post(`${url}+/readData`, Controller.ReadData);

EventRouter.post(`${url}+/addData`, Controller.InsertData);

// EventRouter.put(`${url}+/updateData`, Controller.UpdateData);

// EventRouter.delete(`${url}+/deleteData`, Controller.DeleteData);

export default EventRouter;