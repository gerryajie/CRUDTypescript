import { body, param, query } from "express-validator";

class TodoValidator {
  checkCreateTodo() {
    return [
      body("id").optional().isUUID(4).withMessage("The value should be UUID"),
      body("title").notEmpty().withMessage("Title should not be empty"),
      body("completed")
        .optional()
        .isBoolean()
        .withMessage("the value Should be boolean")
        .isIn([0, false])
        .withMessage("The value Should be 0 or False"),
    ];
  }
  checkReadTodo() {
    return [
      query("limit")
        .notEmpty()
        .withMessage("the query limit should not be empty")
        .isInt({ min: 1, max: 10 })
        .withMessage("the limit value should be number between 1-10"),

      query("offset")
        .optional()
        .isNumeric()
        .withMessage("value shoul be number"),
    ];
  }
  checkIdParam() {
    return [
      param("id")
        .notEmpty()
        .withMessage("should be not empty")
        .isUUID(4)
        .withMessage("The value Should UUID V4"),
    ];
  }
}

export default new TodoValidator();
