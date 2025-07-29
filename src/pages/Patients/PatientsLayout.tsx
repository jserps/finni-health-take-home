import { PatientsProvider } from "./PatientsContext";
import { PatientsPage } from "./PatientsPage";


export const PatientsLayout = () => {
    return (
        <PatientsProvider>
            <PatientsPage />
        </PatientsProvider>
    )
}
