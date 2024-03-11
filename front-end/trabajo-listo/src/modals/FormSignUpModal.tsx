"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { registerUser } from "@/api/user.endpoint";

import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { notificacionesActions } from "@/store/notificacionesSlice";
import { cn } from "@/lib/utils";

export const FormSignUpModal = ({ className }: { className?: string }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowmodal] = useState(true);

  //Validaciones del form
  const formSchema = z.object({
    name: z.string().min(3, {
      message: "Mínimo 3 caracteres",
    }),
    email: z.string().min(5, {
      message: "Ingrese un email válido",
    }),
    password: z.string().min(8, {
      message: "Mínimo 8 caracteres",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //Funcion que registra a un usuario y notifica los sucesos
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    const response = await registerUser(values);
    if (response) {
      if (response == "error 500") {
        dispatch(
          notificacionesActions.ERROR({
            hidden: false,
            message: "Tu nombre de usuario o email ya existe",
          })
        );
      } else {
        dispatch(
          notificacionesActions.SUCCES({
            hidden: false,
            message: "Tu cuenta se ha creado correctamente",
          })
        );

        handleClose();
        setShowmodal(false);
      }
    }
  };

  //Cierra modal de registro
  const handleClose = () => {
    form.reset();
    setIsChecked(false);
  };

  return (
    <Sheet onOpenChange={handleClose}>
      <SheetTrigger asChild>
        <Button
          onClick={() => setShowmodal(true)}
          variant="default"
          className={cn(
            "bg-transparent hover:bg-white rounded-full text-base text-white hover:text-black",
            className
          )}
        >
          Registrarse
        </Button>
      </SheetTrigger>
      {showModal && (
        <SheetContent>
          <SheetHeader className="mb-4">
            <SheetTitle>
              Registrarse en <i>Trabajo Listo</i>
            </SheetTitle>
            <SheetDescription>
              ¡Regístrate y comienza a contratar a tus profesionales favoritos!"
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre y apellido</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Jesus"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jesus@gmail.com"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder=""
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center mt-4 space-x-2">
                <Checkbox id="terms" onClick={() => setIsChecked(!isChecked)} />
                <label
                  htmlFor="terms"
                  className="peer-disabled:opacity-70 font-medium text-sm leading-none peer-disabled:cursor-not-allowed"
                >
                  Aceptar términos y condiciones
                </label>
              </div>
              <Button
                className="bg-main-red hover:bg-main-hover rounded-full"
                type="submit"
                disabled={!isChecked}
              >
                Crear cuenta
              </Button>
            </form>
          </Form>
        </SheetContent>
      )}
    </Sheet>
  );
};
