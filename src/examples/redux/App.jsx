import { Provider } from "react-redux";
import { ATM } from "./ATM";
import { getStore } from "./store";

const state = {
  atm: {
    value: 0,
  },
};

const store = getStore(state);

const App = () => {
  return (
    <Provider store={store}>
      <ATM />
    </Provider>
  );
};

export default App;
