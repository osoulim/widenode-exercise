import {Router} from "express";
import {getSortedUsers, getUniqueUsers, sendError, sendResponse, userExtractor, validators} from "./utilities.js";
import {getExercise} from "./dataaccess.js";

const router = Router();

router.get('/data/:exerciseName', async (req, res) => {
  try {
    const {exerciseName} = req.params;
    validators.validateAlphaNumeric(exerciseName);
    const exercise = await getExercise(exerciseName);
    sendResponse(res, exercise);
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
    const exercise = await getExercise(exerciseName);
    const users = userExtractor(exercise);
    sendResponse(res, {users: getUniqueUsers(getSortedUsers(users, sort))});
  } catch (error) {
    sendError(res, error);
  }
});

export default router;
