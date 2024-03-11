import { UserState } from "@/components/component";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { userActions } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Star, Pencil, Bell, LogOut, MenuSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { notificacionesActions } from "@/store/notificacionesSlice";

export const VerPerfilModal = ({ className }: { className?: string }) => {
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Desloguea usuario y lo notifica
  const logoutHandler = () => {
    setTimeout(() => {
      window.location.reload();
    }, 700);

    dispatch(userActions.USER_LOGOUT());
    dispatch(
      notificacionesActions.SUCCES({
        message: "Sesión cerrada",
      })
    );
  };

  interface opciones {
    icon: JSX.Element;
    title: string;
    to: string;
  }

  const handleButton = (opcion: opciones) => {
    navigate(opcion.to);
  };

  //Iconos por cada item
  const opcionesPerfil = [
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Notificaciones",
      to: "/",
    },
    {
      icon: <MenuSquare className="w-5 h-5" />,
      title: "Ver perfil",
      to: `perfil/${user.id}`,
    },
    {
      icon: <Pencil className="w-5 h-5" />,
      title: "Editar perfil",
      to: "editar-perfil",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Favoritos",
      to: "/",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "bg-transparent hover:bg-gray-100 rounded-full text-base text-white hover:text-black",
            className
          )}
        >
          Mi Perfil
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-72 font-libre-franklin">
        <SheetHeader className="mx-auto">
          <SheetTitle className="text-gray-700">Mi Perfil</SheetTitle>
        </SheetHeader>
        <img
          className="mx-auto rounded-full w-20 h-20"
          src={user.imageProfile}
          alt="Foto de perfil"
        />
        <span className="font-medium text-center">{user.name}</span>
        <Separator className="" />
        <ul className="flex flex-col gap-2">
          {opcionesPerfil.map((opcion) => (
            <SheetClose
              key={opcion.title}
              className="flex items-center gap-2 data-[state=open]:bg-secondary hover:bg-gray-50 py-2 font-medium hover:text-main-red"
              onClick={() => handleButton(opcion)}
            >
              {opcion.icon}
              {opcion.title}
              <span className="sr-only">Close</span>
            </SheetClose>
          ))}
          <li
            className="flex items-center gap-2 hover:bg-gray-100 py-2 font-medium hover:text-main-red hover:cursor-pointer"
            onClick={() => {
              logoutHandler();
            }}
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};
