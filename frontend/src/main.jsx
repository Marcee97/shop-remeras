import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import { MyProvider } from "./context/MyProvider.jsx";
import "../src/main.css"
ReactDOM.createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
    <MyProvider>
      <App />
    </MyProvider>
    </BrowserRouter>
  
);
