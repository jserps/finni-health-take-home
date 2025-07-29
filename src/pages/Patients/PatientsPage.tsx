import { useState, useEffect } from "react";
import { LoadingSpinner } from "../../components/ui/loading-spinner";
import { usePatients } from "./PatientsContext";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import type { Patient } from "./PatientsContext";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const PatientsPage = () => {

    const [loading, setLoading] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [newPatient, setNewPatient] = useState<Patient>({
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        status: "",
        address: "",
        phone: "",
        email: "",
        createdAt: "",
    });
    const { patients, setPatients, getPatients, addPatient, deletePatient, updatePatient } = usePatients();
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deletePatientId, setDeletePatientId] = useState<string | null>(null);

    const columns: ColumnDef<Patient>[] = [
        {
            header: "First Name",
            accessorKey: "firstName",
        },
        {
            header: "Middle Name",
            accessorKey: "middleName",
        },
        {
            header: "Last Name",
            accessorKey: "lastName",
        },
        {
            header: "Date of Birth",
            accessorKey: "dateOfBirth",
        },
        {
            header: "Gender",
            accessorKey: "gender",  
        },
        {
            header: "Status",
            accessorKey: "status",
        },
        {
            header: "Address",
            accessorKey: "address",
        },
        {
            header: "Phone",
            accessorKey: "phone",
        }
    ];

    const table = useReactTable({
        data: patients,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleFetch = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("in handle fetch");
          await getPatients();
        } catch (e) {
            console.log(e);
          setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPatient = async () => {
        try {
            setDialogLoading(true);
            await addPatient(newPatient);
            setOpen(false);
            setDialogLoading(false);
        } catch (e) {
            console.log(e);
            setError((e as Error).message);
        }
    }

    const handleDeletePatient = async () => {
        try {
            const filteredPatients = patients.filter(patient => patient.id !== deletePatientId);
            setPatients(filteredPatients);
            setDeleteOpen(false);
            setDeletePatientId(null);
            await deletePatient(deletePatientId);
        } catch (e) {
            console.log(e);
            setError((e as Error).message);
        }
    }

    const handleUpdatePatient = async () => {
        try {
            await updatePatient(newPatient);
            setUpdateOpen(false);
            setOpen(false);
        } catch (e) {
            console.log(e);
            setError((e as Error).message);
        }
    }

    const handleUpdatePatientClick = (patient: Patient) => {
        setUpdateOpen(true);
        setOpen(true);
        setNewPatient(patient);
    }

    const handleClose = () => {

        setNewPatient({
            firstName: "",
            middleName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            status: "",
            address: "",
            phone: "",
            email: "",
            createdAt: "",
        });

        setOpen(false);
        setUpdateOpen(false);
    }

    useEffect(() => {
        handleFetch();
    }, []);

    const renderBadge = (cell: any) => {
        if(cell.column.id === "status") {
            if(cell.getValue() === "Inquiry") {
                return <Badge variant="outline">Inquiry</Badge>
            } else if(cell.getValue() === "Onboarding") {
                return <Badge variant="secondary">Onboarding</Badge>
            } else if(cell.getValue() === "Active") {
                return <Badge variant="default">Active</Badge>
            } else if(cell.getValue() === "Churned") {
                return <Badge variant="destructive">Churned</Badge>
            }
        }
        return (
            <Badge variant="default">{flexRender(cell.column.columnDef.cell, cell.getContext())}</Badge>
        )
    }

    if(loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner size="xl" centered={true} />
            </div>
        )
    }

    return (
        <>
        <div className="p-4 gap-4">
            <div className="flex gap-4">
                <div className="flex gap-2 w-full">
                    <h1 className="text-2xl font-bold">Patients</h1>
                    <Button className="cursor-pointer ml-auto" onClick={() => setOpen(true)}>
                        <PlusIcon className="w-4 h-4" />
                        Add Patient
                    </Button>
                </div>
            </div>
            <div className="mt-2 border border-gray-200 rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                ))}
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    cell.column.id === "status" ? (
                                            <TableCell className="text-left" key={cell.id}>
                                                {renderBadge(cell)}
                                            </TableCell>
                                        ) : (
                                            <TableCell className="text-left" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        )
                                ))}
                                <TableCell className="text-left">
                                    <Button variant="outline" className="cursor-pointer mr-2" onClick={() => handleUpdatePatientClick(row.original)}>
                                        <PencilIcon className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" className="cursor-pointer" onClick={() => {setDeleteOpen(true); setDeletePatientId(row.original.id)}}>
                                        <TrashIcon className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

        {/* Delete Patient Dialog */}
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Patient</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <p>Are you sure you want to delete this patient?</p>
                    <div className="flex gap-4">
                        <Button variant="outline" className="cursor-pointer mr-auto" onClick={() => setDeleteOpen(false)}>Close</Button>
                        <Button className="cursor-pointer ml-auto" onClick={() => handleDeletePatient(deletePatientId)}>Delete</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

        {/* Add or Update Patient Dialog */}
        <Dialog open={open || updateOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    {updateOpen ? <DialogTitle>Update Patient</DialogTitle> : <DialogTitle>Add Patient</DialogTitle>}
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="flex gap-4">
                        <div className="grid gap-2 flex-1">
                            <Label>First Name</Label>
                            <Input 
                                type="text" 
                                value={newPatient.firstName}
                                onChange={(e) => setNewPatient(prev => ({ ...prev, firstName: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2 flex-1">
                            <Label>Middle Name</Label>
                            <Input 
                                type="text" 
                                value={newPatient.middleName}
                                onChange={(e) => setNewPatient(prev => ({ ...prev, middleName: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2 flex-1">
                            <Label>Last Name</Label>    
                            <Input 
                                type="text" 
                                value={newPatient.lastName}
                                onChange={(e) => setNewPatient(prev => ({ ...prev, lastName: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="grid gap-2 flex-1">
                            <Label>Address</Label>
                            <Input 
                                type="text" 
                                value={newPatient.address}
                                onChange={(e) => setNewPatient(prev => ({ ...prev, address: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="grid gap-2 flex-1">
                            <Label>Date of Birth</Label>
                            <Input 
                                type="date" 
                                value={newPatient.dateOfBirth}
                                onChange={(e) => setNewPatient(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            />
                        </div>
                        <div className="grid gap-2 flex-1">
                            <Label>Phone</Label>
                            <Input 
                                type="text" 
                                value={newPatient.phone}
                                onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="grid gap-2 flex-1">
                            <Label>Status</Label>
                            <Select 
                                value={newPatient.status} 
                                onValueChange={(value) => setNewPatient(prev => ({ ...prev, status: value }))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Inquiry">Inquiry</SelectItem>
                                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Churned">Churned</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2 flex-1">
                            <Label>Gender</Label>
                            <Select 
                                value={newPatient.gender} 
                                onValueChange={(value) => setNewPatient(prev => ({ ...prev, gender: value }))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="cursor-pointer mr-auto" onClick={handleClose}>Close</Button>
                        {updateOpen ? <Button className="cursor-pointer ml-auto" onClick={handleUpdatePatient}>
                            <PencilIcon className="w-4 h-4" />
                            Update
                        </Button> : <Button className="cursor-pointer ml-auto" onClick={handleAddPatient}>
                            <PlusIcon className="w-4 h-4" />
                            Add
                        </Button>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default PatientsPage;