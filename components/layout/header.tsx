import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function Header() {
    return (
        <header className="flex h-14 items-center justify-between border-b bg-white px-6">
            <div className="font-medium">ยินดีต้อนรับ, Admin</div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell size={20} />
                </Button>
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Grids Dev</span>
                </div>
            </div>
        </header>
    );
}
