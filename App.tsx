import * as React from 'react';
import { Provider as ReduxProvider } from "react-redux";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/utils/AuthContext.tsx";
import { store } from "./src/redux/store";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </ReduxProvider>
  );
};

export default App;