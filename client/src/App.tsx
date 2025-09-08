import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

// Auth Store
import { initAuthListener } from "./Store/useAuthStore";

// Route
import router from "./Routes/routes";

function App() {
  useEffect(() => {
    initAuthListener();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
