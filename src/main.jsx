import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StepProvider from "./context/Step.jsx";
import DataFormPublisherProvider from "./context/FormPublisher.jsx";
import DataFormPIC_AffiliationProvider from "./context/FormPIC_Affiliation.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataFormPublisherProvider>
      <DataFormPIC_AffiliationProvider>
        <StepProvider>
          <App />
        </StepProvider>
      </DataFormPIC_AffiliationProvider>
    </DataFormPublisherProvider>
  </StrictMode>
);
