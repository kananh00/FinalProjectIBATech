const SET_THEME = "SET_THEME";

export const MODULE_NAME = "theme";

export const getTheme = (state) => state[MODULE_NAME].theme;


const initialState = {  theme: "light" };

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_THEME:
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
}

export const setTheme = (payload) => ({
  type: SET_THEME,
  payload,
});

