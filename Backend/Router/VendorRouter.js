import { Router } from "express";
import VendorController from "../Controller/VendorController.js";

const VendorRouter = new Router();
const url = process.env.URL_VENDOR;
// console.log(url);
const Controller = new VendorController;

VendorRouter.post(`${url}+/readData`, Controller.ReadData);

VendorRouter.post(`${url}+/addData`, Controller.InsertData);

VendorRouter.post(`${url}+/fetchData`, Controller.FetchData);

VendorRouter.put(`${url}+/updateData`, Controller.UpdateData);

export default VendorRouter;