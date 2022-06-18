import {Router} from "express";
import {sendError, sendResponse, userExtractor, validators} from "./utilities.js";
import {getExercise} from "./dataaccess.js";

const router = Router();

router.get('/data/:exerciseName', async (req, res) => {
  try {
    const {exerciseName} = req.params;
    validators.validateAlphaNumeric(exerciseName);
    const result = await getExercise(exerciseName);
    sendResponse(res, result.data);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/solved/:exerciseName', async (req, res) => {
  try {
    const {exerciseName} = req.params;
    const {sort} = req.query;
    validators.validateAlphaNumeric(exerciseName);
    validators.validateFromValues(sort, ["id", "name"]);
    const result = await getExercise(exerciseName);
    const users = userExtractor(result.data).sort((a, b) => a[sort] < b[sort] ? -1: 1);
    sendResponse(res, {users});
  } catch (error) {
    sendError(res, error);
  }
});

export default router;
