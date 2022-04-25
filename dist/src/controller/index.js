"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const model_1 = require("../model");
class TodoController {
    async create(req, res) {
        const id = (0, uuid_1.v4)();
        try {
            const record = await model_1.TodoInstance.create({
                ...req.body,
                id,
            });
            return res.send({ record, message: "Success Create todo" });
        }
        catch (e) {
            return res.json({
                message: "failed create",
                status: 500,
                route: "/create",
            });
        }
    }
    async read(req, res) {
        try {
            const limit = req.query?.limit;
            const offset = req.query?.limit;
            const records = await model_1.TodoInstance.findAll({ where: {}, limit, offset });
            return res.json(records);
        }
        catch (e) {
            return res.json({
                message: "failed create",
                status: 500,
                route: "/read",
            });
        }
    }
    async readId(req, res) {
        try {
            const { id } = req.params;
            const records = await model_1.TodoInstance.findOne({
                where: { id },
            });
            return res.json(records);
        }
        catch (e) {
            return res.json({
                message: "failed create",
                status: 500,
                route: "/read/:id",
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const records = await model_1.TodoInstance.findOne({
                where: { id },
            });
            if (!records) {
                return res.json({ message: "cannot find existing records" });
            }
            const updatedData = await records.update({
                completed: !records.getDataValue("completed"),
            });
            res.json({ record: updatedData });
        }
        catch (e) {
            return res.json({
                message: "failed create",
                status: 500,
                route: "/update/:id",
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const records = await model_1.TodoInstance.findOne({
                where: { id },
            });
            if (!records) {
                return res.json({ message: "cannot find existing records" });
            }
            const deleteData = await records.destroy();
            res.json({ record: deleteData });
        }
        catch (e) {
            return res.json({
                message: "failed create",
                status: 500,
                route: "/delete/:id",
            });
        }
    }
}
exports.default = new TodoController();
