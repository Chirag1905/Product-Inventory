import { Toaster } from "react-hot-toast";
import Products from "./pages/Products.tsx";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Products />
    </>
  );
}
