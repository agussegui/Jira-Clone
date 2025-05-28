"use client";

import {FaGithub} from "react-icons/fa";
import {z} from "zod"
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import { DottedSeparator } from "@/components/dotted-sepator"
import { Button } from "@/components/ui/button"
import { Card, CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";


export const SignUpCard = () => {
    const {mutate, isPending} = useRegister()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name:"",
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        mutate({json: values})
    }


    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Registrarse!
                </CardTitle>
                <CardDescription>
                    Al Registrarse, usted acepta nuestros terminos{""} 
                    <Link
                        href="/privacy"
                    >
                        <span className="text-blue-700"> política de privacidad </span>
                    </Link>{""}
                    y {""}
                    <Link
                        href="/terms"
                    >
                        <span className="text-blue-700">Condiciones del servicio</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div className="px-7 mb-2">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField 
                            name="name"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Ingrese el Nombre"
                                            
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name="email"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Ingrese el Email"
                                            
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name="password"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Ingrese su Password"
                                            
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} size="lg" className="w-full">
                            Registrarse
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 flex gap-y-4 flex-col">
                <Button
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FaGithub className="mr-2 size-5"/>
                    Iniciar con Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 justify-center flex items-center">
                <p>¿Ya tienes Una Cuenta?</p>
                <Link href="/sign-in">
                    <span className="text-blue-700">&nbsp;Iniciar Sesion</span>            
                </Link>                
            </CardContent>
            
        </Card>
    )
}