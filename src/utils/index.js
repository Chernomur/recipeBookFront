import constants from "./constants";

export const storage = {
  token: {
    get: () => {
      try {
        const tasks = JSON.parse(localStorage.getItem(constants.TOKEN_STORAGE_NAME));
        return tasks || [];
      } catch (error) {
        return [];
      }
    },
    set: (tasks) => {
      localStorage.setItem(constants.TOKEN_STORAGE_NAME, JSON.stringify(tasks));
    }
  }
};
