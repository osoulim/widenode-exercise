import {Router} from "express";
import {sendError, sendResponse, validators} from "./utilities.js";
import {getExercise} from "./dataaccess.js";

const router = Router();

router.get('/data/:exName', async (req, res) => {
  try {
    const {exName: exerciseName} = req.params;
    validators.validateAlphaNumeric(exerciseName);
    const result = await getExercise(exerciseName);
    sendResponse(res, result.data);
  } catch (error) {
    sendError(res, error);
  }
});

router.get('/solved/:exName', (req, res) => {
  try {

  } catch (error) {
    sendError(res, error);
  }
});

export default router;
