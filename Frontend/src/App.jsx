import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PublicLeadForm from "./pages/PublicLeadForm";
import LeadDetails from "./pages/LeadDetails";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ADminRoutes";
import AdminRoute from "./components/ProctedRoutes";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<PublicLeadForm />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route

        path="/dashboard"

        element={

          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>

        }

      />

      <Route

        path="/lead/:id"

        element={

          <ProtectedRoute>

            <LeadDetails />

          </ProtectedRoute>

        }

      />

      <Route

        path="/admin"

        element={

          <AdminRoute>

            <Dashboard />

          </AdminRoute>

        }

      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );

}

export default App;