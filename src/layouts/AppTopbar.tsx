import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const AppTopbar = () => {
    return (
        <div className="w-full flex p-2 gap-2 border-b border-gray-200">
            <div className="h-10 flex items-center ml-auto mr-4">
                <Avatar >
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="flex flex-col ml-2 text-left">
                    <h2 className="text-sm font-medium">John Smith</h2>
                    <p className="text-xs text-gray-500">john.smith@example.com</p>
                </div>
            </div>
        </div>
    )
}

export default AppTopbar;