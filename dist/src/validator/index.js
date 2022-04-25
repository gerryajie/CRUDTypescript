"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class TodoValidator {
    checkCreateTodo() {
        return [
            (0, express_validator_1.body)("id").optional().isUUID(4).withMessage("The value should be UUID"),
            (0, express_validator_1.body)("title").notEmpty().withMessage("Title should not be empty"),
            (0, express_validator_1.body)("completed")
                .optional()
                .isBoolean()
                .withMessage("the value Should be boolean")
                .isIn([0, false])
                .withMessage("The value Should be 0 or False"),
        ];
    }
    checkReadTodo() {
        return [
            (0, express_validator_1.query)("limit")
                .notEmpty()
                .withMessage("the query limit should not be empty")
                .isInt({ min: 1, max: 10 })
                .withMessage("the limit value should be number between 1-10"),
            (0, express_validator_1.query)("offset")
                .optional()
                .isNumeric()
                .withMessage("value shoul be number"),
        ];
    }
    checkIdParam() {
        return [
            (0, express_validator_1.param)("id")
                .notEmpty()
                .withMessage("should be not empty")
                .isUUID(4)
                .withMessage("The value Should UUID V4"),
        ];
    }
}
exports.default = new TodoValidator();
