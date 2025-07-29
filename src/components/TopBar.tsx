import { Button } from "./ui/button"

export const TopBar = ({currentPage}: {currentPage: string}) => {

    return (
        <div className="h-20 p-4 flex" style={{borderBottom: "1px solid #e0e0e0"}}>
            <div className="flex h-full">
                <h1 className="text-2xl font-bold mt-auto mb-auto">{currentPage}</h1>
            </div>
            <div className="flex ml-auto h-full">
                <Button className="mt-auto mb-auto">
                    Add Patient
                </Button>
            </div>
            
        </div>
    )
}