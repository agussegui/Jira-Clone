"use client"

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
    return (  
        <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
            <AlertTriangle className="text-red-500 size-10" />
            <p className="text-md">
                Algo salio Mal
            </p>
            <Button variant="secondary" size="sm">
                <Link href="/">
                    Volver al Inicio
                </Link>
            </Button>
        </div>
    );
}
 
export default ErrorPage;