import Axios from "axios";
export const getGenericWords = async () => {
  const genericWords = await Axios.get("/words/list");
  return genericWords.data;
};
