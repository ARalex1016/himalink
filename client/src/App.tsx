import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

// Auth Store
import { initAuthListener } from "./Store/useAuthStore";

// Route
import router from "./Routes/routes";

import { GoogleMapsProvider } from "./Components/Map";

function App() {
  useEffect(() => {
    initAuthListener();
  }, []);

  return (
    <>
      <GoogleMapsProvider>
        <RouterProvider router={router} />
      </GoogleMapsProvider>
    </>
  );
}

export default App;
