import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@renderer/components/ui/avatar"

  import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
  } from "@renderer/components/ui/sidebar"

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@renderer/components/ui/alert-dialog"
  

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@renderer/components/ui/dropdown-menu"

  import avatar from "../../assets/self.jpg"
import { BellIcon, ChevronsUpDown, LogOutIcon, Settings } from 'lucide-react'

const UserCard = () => {
  return (
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div>
                        <SidebarMenuButton
                            size='lg'
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar>
                                <AvatarImage src={avatar} alt='User' />
                                <AvatarFallback>NG</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">Noel George</span>
                                <span className="truncate text-xs text-zinc-300">noel@cet.ac.in</span>
                            </div>
                            <ChevronsUpDown />
                        </SidebarMenuButton>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-full min-w-56 rounded-lg"
                    side="top"
                    align="center"
                    sideOffset={4}
                >
                    <DropdownMenuLabel>
                        <div className='flex gap-3'>
                            <Avatar>
                                <AvatarImage src={avatar} alt='User' />
                                <AvatarFallback>NG</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">Noel George</span>
                                <span className="truncate text-xs text-zinc-300">noelg-cj</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Settings />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <BellIcon />
                            Notifications
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            className="text-red-600 hover:!text-red-600"
                            onSelect={(e) => {
                            e.preventDefault(); // Prevents dropdown from closing immediately
                            setTimeout(() => {
                                document.getElementById("alert-dialog-trigger")?.click(); // Opens dialog after dropdown closes
                            }, 0);
                            }}
                        >
                            <LogOutIcon color="var(--color-red-600)" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button id="alert-dialog-trigger" hidden />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Do you really want to Logout?</AlertDialogTitle>
                <AlertDialogDescription>
                    Hey Developer Noel here! I haven't really made the logout functionality. Stay tuned for that :p
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Pleeease</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </SidebarMenu>
  )
}

export default UserCard