import { combineReducers } from "redux";

function atmReducer(state = null, action) {
  switch (action.type) {
    case "atm/deposit":
    case "atm/withdraw":
      return {
        ...state,
        value: state.value + action.payload,
      };

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  atm: atmReducer,
});
