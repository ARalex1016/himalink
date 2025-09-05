import { RouterProvider } from "react-router-dom";

// Route
import router from "./Routes/routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
