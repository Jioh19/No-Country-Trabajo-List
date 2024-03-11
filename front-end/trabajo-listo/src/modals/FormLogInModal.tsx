"use client";
import { authUser, getProfile } from "@/api/user.endpoint";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { userActions } from "@/store/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

import "react-toastify/dist/ReactToastify.css";
import { notificacionesActions } from "@/store/notificacionesSlice";
import { cn } from "@/lib/utils";

export const FormLogInModal = ({ className }: { className?: string }) => {
  const dispatch = useDispatch();

  //Validaciones del form
  const formSchema = z.object({
    email: z.string().min(5, {
      message: "Ingrese un email válido",
    }),
    password: z.string().min(8, {
      message: "Contraseña inválida",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Funcion que toma los datos de las inputs y loguea al usuario, valida y notifica los diferentes sucesos
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = await authUser(values);

    if (token) {
      if (token == "error 401") {
        dispatch(
          notificacionesActions.ERROR({
            hidden: false,
            message: "Tu contraseña es incorrecta",
          })
        );
      } else if (token == "error 404") {
        dispatch(
          notificacionesActions.ERROR({
            hidden: false,
            message: "El email que ingresaste es incorrecto",
          })
        );
      } else {
        dispatch(userActions.SET_TOKEN({ token: token }));
        const userData = await getProfile(token);

        dispatch(userActions.USER_LOGIN(userData));
        const { name } = userData;
        dispatch(
          notificacionesActions.SUCCES({
            hidden: false,
            message: `Bienvenido ${name}`,
          })
        );
      }
    }
  };

  //Cierre de modal del form
  const handleClose = () => {
    form.reset();
  };

  return (
    <Sheet onOpenChange={handleClose}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "bg-transparent hover:bg-white rounded-full text-base text-white hover:text-black",
            className
          )}
        >
          Acceder
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle>Iniciar sesión</SheetTitle>
          <SheetDescription>
            ¡Accede y contrata a profesionales de tu preferencia!"
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button
              className="bg-main-red hover:bg-main-hover rounded-full"
              type="submit"
            >
              Ingresar
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
