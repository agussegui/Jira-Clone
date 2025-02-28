"use client"

import { UserButton } from "@/features/auth/components/user-button"
import { MobileSidebar } from "./mobile-sidebar"
import { usePathname } from "next/navigation"

const pathnameMap = {
    "tasks": {
        title: "Mis Tareas",
        description: "Ver todas tus tareas aquí"
    },
    "project": {
        title: "Mis Proyectos",
        description: "Ver tus tareas de tus proyectos aquí"
    }
}

const defaultMap = {
    title: 'Inicio',
    description: 'Monitorea tus proyectos y tareas aqui',
};

export const Navbar = () => {
    const pathname = usePathname();
    const pathnameParts = pathname.split('/');
    const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;
    const { title, description } = pathnameMap[pathnameKey] || defaultMap;
    return (
        <nav className="pt-4 px-6 flex items-center justify-between">
            <div className="flex-col hidden lg:flex">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <MobileSidebar/> 
            <UserButton />
        </nav>
    )
}