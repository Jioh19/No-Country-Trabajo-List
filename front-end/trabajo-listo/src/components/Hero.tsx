import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSelector } from "react-redux";
import { UserState } from "./component";
import { FormSignUpModal } from "@/modals/FormSignUpModal";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state: { user: UserState }) => state.user);

  //Funcion que obtiene el dato de la input y se redirige a otra ruta manteniendo el valor
  const handleSearch = () => {
    navigate("/search", { state: { buscar: searchValue } });
  };

  return (
    <section className="flex items-center justify-start gap-16 bg-hero-banner bg-cover bg-no-repeat border-black rounded-b-2xl w-full max-w-full h-[601px] overflow-hidden b-2">
      <div className="flex flex-col gap-16 mx-3 sm:ml-8 w-full sm:w-3/5">
        <section className="flex flex-col items-center gap-2">
          <h1 className="font-extrabold font-galada text-7xl text-main-red tracking-wide pr-2">
            ¡Tus Servicios a un Click!
          </h1>
          <h3 className="font-bold font-libre-franklin text-gray-700 text-xl italic">
            Velocidad y accesibilidad en búsquedas de servicios
          </h3>
        </section>
        {user.id ? (
          <search className="flex bg-white border-2 border-main-red rounded-md">
            <Input
              className="px-2 md:px-4 border-0 font-medium text-gray-700 text-xl outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              type="text"
              value={searchValue}
              placeholder="Busca tu servicio aquí"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              className="bg-main-red hover:bg-main-hover px-4 md:px-10 rounded-none h-full text-lg text-white outline-none"
            >
              Buscar
            </Button>
          </search>
        ) : (
          <div className="flex justify-center">
            <FormSignUpModal className="bg-main-red hover:bg-main-hover px-10 rounded-md w-fit h-full text-lg text-white hover:text-white outline-none" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
