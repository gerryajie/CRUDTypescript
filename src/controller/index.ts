import express, { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { TodoInstance } from "../model";

class TodoController {
  async create(req: Request, res: Response) {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({
        ...req.body,
        id,
      });
      return res.send({ record, message: "Success Create todo" });
    } catch (e) {
      return res.json({
        message: "failed create",
        status: 500,
        route: "/create",
      });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.limit as number | undefined;

      const records = await TodoInstance.findAll({ where: {}, limit, offset });

      return res.json(records);
    } catch (e) {
      return res.json({
        message: "failed create",
        status: 500,
        route: "/read",
      });
    }
  }
  async readId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const records = await TodoInstance.findOne({
        where: { id },
      });
      return res.json(records);
    } catch (e) {
      return res.json({
        message: "failed create",
        status: 500,
        route: "/read/:id",
      });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const records = await TodoInstance.findOne({
        where: { id },
      });
      if (!records) {
        return res.json({ message: "cannot find existing records" });
      }
      const updatedData = await records.update({
        completed: !records.getDataValue("completed"),
      });
      res.json({ record: updatedData });
    } catch (e) {
      return res.json({
        message: "failed create",
        status: 500,
        route: "/update/:id",
      });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const records = await TodoInstance.findOne({
        where: { id },
      });
      if (!records) {
        return res.json({ message: "cannot find existing records" });
      }
      const deleteData = await records.destroy();
      res.json({ record: deleteData });
    } catch (e) {
      return res.json({
        message: "failed create",
        status: 500,
        route: "/delete/:id",
      });
    }
  }
}

export default new TodoController();
