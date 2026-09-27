import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlanProvider } from "./context/PlanContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WorkoutDetail from "./pages/WorkoutDetail";
import MyPlan from "./pages/MyPlan";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <PlanProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-gray-950">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workout/:id" element={<WorkoutDetail />} />
              <Route path="/my-plan" element={<MyPlan />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: "#111827",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            color: "#f9fafb",
            fontSize: "14px",
          }}
        />
      </BrowserRouter>
    </PlanProvider>
  );
}
