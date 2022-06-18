import axios from "axios";

async function getExercise(exerciseName) {
  const response = await axios.get(`https://widenode.io/testing/exercises/${exerciseName}.json`);
  console.log(response);
  return response;
}

export {getExercise};