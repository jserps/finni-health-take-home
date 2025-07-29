import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { PatientsLayout } from "./Patients/PatientsLayout";
import DashboardPage from "./Dashboard/DashboardPage";
import { useApp } from "@/AppContext";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const AppPage = () => {

    const { user, getUser } = useApp();

    useEffect(() => {
        getUser();
    }, []);

    if(!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner size="xl" centered={true} />
            </div>
        )
    }

    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="patients" element={<PatientsLayout />} />
            </Route>
          </Routes>
        </BrowserRouter>
    )
}

export default AppPage;