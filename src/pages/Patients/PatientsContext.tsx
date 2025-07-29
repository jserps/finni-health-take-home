import React, {createContext, useContext} from "react";
import { useApp, type Patient } from "../../AppContext";

export type { Patient };

export const PatientsContext = createContext({
    patients: [] as Patient[],
    setPatients: (patients: Patient[]) => { void patients; },
    getPatients: async () => {},
    addPatient: async (patient: Patient) => { void patient; },
    updatePatient: async (patient: Patient) => { void patient; },
    deletePatient: async (id: string) => { void id; }
});

export const usePatients = () => {
    return useContext(PatientsContext);
}

export const PatientsProvider = ({children}: {children: React.ReactNode}) => { 
    const { patients, setPatients, getPatients, addPatient, updatePatient, deletePatient } = useApp();

    return (
        <PatientsContext.Provider value={{patients, setPatients, getPatients, addPatient, updatePatient, deletePatient}}>
            {children}
        </PatientsContext.Provider>
    )
}