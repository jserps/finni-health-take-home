import { createContext, useCallback, useContext, useState } from "react";
import { EXPRESS_API_URL, USER_ID } from "./env/environment";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
}

export type Patient = {
    id?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    status: string;
    address: string;
    phone: string;
    email: string;
    createdAt: string;
}

export const AppContext = createContext({
    user: null as User | null,
    setUser: (user: User) => { void user; },
    getUser: async () => {},
    patients: [] as Patient[],
    setPatients: (patients: Patient[]) => { void patients; },
    getPatients: async () => {},
    addPatient: async (patient: Patient) => { void patient; },
    updatePatient: async (patient: Patient) => { void patient; },
    deletePatient: async (id: string) => { void id; }
});

export const useApp = () => {
    return useContext(AppContext);
}

export const AppProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [patients, setPatients] = useState<Patient[]>([]);

    const getUser = useCallback(async () => {
        console.log("in get user");
        const response = await fetch(`${EXPRESS_API_URL}/users/${USER_ID}`);
        if(!response.ok) {
            throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        console.log(data);
        setUser(data.user);
    }, []);

    const getPatients = useCallback(async () => {
        const patients = await fetch(`${EXPRESS_API_URL}/patients/getPatients`);
        if(!patients.ok) {
            throw new Error("Failed to fetch patients");
        }
        const data = await patients.json();
        console.log(data);
        setPatients(data.patients);

        return data.patients;
    }, []);

    const addPatient = useCallback(async (patient: Patient) => {
        const request = {
            patient: {
                firstName: patient.firstName,
                middleName: patient.middleName,
                lastName: patient.lastName,
                dateOfBirth: patient.dateOfBirth,
                gender: patient.gender,
                status: patient.status,
                address: patient.address,
                phone: patient.phone,
                email: patient.email
            }
        }
        const response = await fetch(`${EXPRESS_API_URL}/patients/createPatient`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });
        if(!response.ok) {
            throw new Error("Failed to add patient");
        }
        const data = await response.json();
        console.log(data);
        await getPatients();

    }, [getPatients]);

    const updatePatient = useCallback(async (patient: Patient) => {
        const request = {
            patient: {
                firstName: patient.firstName,
                middleName: patient.middleName,
                lastName: patient.lastName,
                dateOfBirth: patient.dateOfBirth,
                gender: patient.gender,
                status: patient.status,
                address: patient.address,
                phone: patient.phone,
                email: patient.email
            }
        }
        const response = await fetch(`${EXPRESS_API_URL}/patients/updatePatient/${patient.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });
        if(!response.ok) {
            throw new Error("Failed to update patient");
        }
        const data = await response.json();
        console.log(data);
        await getPatients();
    }, [getPatients]);

    const deletePatient = useCallback(async (id: string) => {
        await fetch(`${EXPRESS_API_URL}/patients/deletePatient/${id}`, {
            method: "DELETE",
        });
    }, []);

    return (
        <AppContext.Provider value={{
            user, 
            setUser, 
            getUser,
            patients,
            setPatients,
            getPatients,
            addPatient,
            updatePatient,
            deletePatient
        }}>
            {children}
        </AppContext.Provider>
    )
}