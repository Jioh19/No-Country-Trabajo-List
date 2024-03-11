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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { capitalizeFirstLetter } from "@/functions/textFunctions";

export const FormRegistroProfeisonal = ({
  className,
}: {
  className?: string;
}) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowmodal] = useState(true);

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
    phone: z.string().min(10, {
      message: "Número inválido",
    }),
    category: z.string(),
    address: z.string().min(3, {
      message: "Mínimo 3 caracteres",
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await registerUser({
      ...values,
      phone: parseInt(values.phone),
      category: [values.category],
      isProfessional: true,
    });

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

  const handleClose = () => {
    form.reset();
    setIsChecked(false);
  };

  const opciones = [
    "carpintero",
    "electricista",
    "lavadero",
    "mecanico",
    "reparaciones",
    "plomeria",
    "peluqueria",
    "personal trainer",
    "jardinero",
    "gasista",
    "DJ",
    "programador",
    "salud",
    "chofer",
    "paseador de mascotas",
    "profesor particular",
    "limpieza",
    "otros",
  ];

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
          ¡Quiero ser profesional!
        </Button>
      </SheetTrigger>
      {showModal && (
        <SheetContent className="font-libre-franklin overflow-scroll">
          <SheetHeader className="mb-4">
            <SheetTitle>
              Registrarse en <i>Trabajo Listo</i>
            </SheetTitle>
            <SheetDescription>
              ¡Regístrate y dislumbra al mundo con tus servicios!
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría del servicio</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {opciones.map((opcion) => (
                          <SelectItem
                            key={opcion}
                            className="font-medium"
                            value={opcion}
                          >
                            {capitalizeFirstLetter(opcion)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Calle falsa 123"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder=""
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
              <div className="flex items-center space-x-2 mt-4">
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
