import logo from "@/assets/logo-blue.png";
import { Link, useNavigate } from "react-router-dom";
import { FormSignUpModal } from "@/modals/FormSignUpModal";
import { FormLogInModal } from "@/modals/FormLogInModal";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useSelector } from "react-redux";
import { UserState } from "@/components/component";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { VerPerfilModal } from "@/modals/VerPerfilModal";
import { FormRegistroProfeisonal } from "@/modals/FormRegistroProfesional";
import { capitalizeFirstLetter } from "@/functions/textFunctions";

export const Navbar = () => {
  //Emun lista de categoria de servicios
  const listOfServices = [
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

  const navigate = useNavigate();

  //Funcion redirige la ruta de navegacion a "/search" guardando el id de servicio
  const searchService = (service: string) => {
    navigate("/search", { state: { id: service } });
  };
  const user = useSelector((state: { user: UserState }) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [windowDimension, setWindowDimension] = useState({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });

  //Ajusta el tamaño del navbar
  useEffect(() => {
    const detectSize = () => {
      setWindowDimension({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
      });

      if (isMenuOpen && window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", detectSize);
    return () => window.removeEventListener("resize", detectSize);
  }, [isMenuOpen]);

  const Content = (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent data-[state=open]:bg-white rounded-full text-base text-white data-[state=open]:text-black">
              Servicios
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="gap-1 grid grid-cols-1 p-4 w-[230px] h-[300px] overflow-y-scroll">
                {listOfServices.map((service, i) => (
                  <li
                    className="hover:bg-gray-50 p-1 rounded-md w-full font-semibold text-black hover:text-main-red cursor-pointer"
                    key={i}
                    onClick={() => searchService(service)}
                  >
                    <NavigationMenuLink>
                      {capitalizeFirstLetter(service)}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {!user.isPro && <FormRegistroProfeisonal />}
      {user?.name ? (
        <VerPerfilModal />
      ) : (
        <>
          <FormLogInModal />
          <FormSignUpModal />
        </>
      )}
    </>
  );

  return (
    <header className="relative font-libre-franklin">
      <Link to="/">
        <img
          src={logo}
          alt="logo Trabajo Listo"
          className={
            !isMenuOpen && windowDimension.innerWidth > 435
              ? "top-2 left-2 absolute w-28 z-50"
              : "top-2 left-2 absolute w-20 z-50"
          }
        />
      </Link>
      <nav
        className={
          !isMenuOpen
            ? "flex items-center justify-end gap-5 bg-main-red px-10 h-16 flex-row mx-auto"
            : "flex items-center justify-around gap-5 py-4 bg-main-red px-10  flex-col"
        }
      >
        {windowDimension.innerWidth >= 768 ? (
          <>{Content}</>
        ) : (
          isMenuOpen && <>{Content}</>
        )}
        {!isMenuOpen && windowDimension.innerWidth < 768 ? (
          <AiOutlineMenu
            cursor={"pointer"}
            size={24}
            color="#F2F2F2"
            onClick={() => setIsMenuOpen(true)}
          />
        ) : (
          windowDimension.innerWidth < 768 && (
            <AiOutlineClose
              cursor={"pointer"}
              size={24}
              color="#F2F2F2"
              onClick={() => setIsMenuOpen(false)}
            />
          )
        )}
      </nav>
    </header>
  );
};
