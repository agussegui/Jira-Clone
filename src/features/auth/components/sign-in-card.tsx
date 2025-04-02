"use client"
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {z} from "zod"
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { signUpWithGithub } from "@/lib/oauth";
import { DottedSeparator } from "@/components/dotted-sepator"
import { Button } from "@/components/ui/button"
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form,FormControl,FormField,FormItem,FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";


export const SignInCard = () => {

    const {mutate, isPending} = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({ json: values });
    }

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Bienvenido de Vuelta!
                </CardTitle>
            </CardHeader>
            <div className="px-7 mb-2">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                            placeholder="Ingrese el password"
                                            
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        
                        
                        <Button disabled={isPending} size="lg" className="w-full">
                            Iniciar Sesion
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
                    <FcGoogle className="mr-2 size-5"/>
                    Iniciar con Google
                </Button>
                <Button
                    onClick={() => signUpWithGithub()}
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
                <p>¿No tienes Una Cuenta?</p>
                <Link href="/sign-up">
                    <span className="text-blue-700">&nbsp;Registrarse</span>            
                </Link>                
            </CardContent>
        </Card>
    )
}