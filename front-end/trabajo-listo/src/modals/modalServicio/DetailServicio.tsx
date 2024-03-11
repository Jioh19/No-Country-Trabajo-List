import { postConsulta } from "@/api/consulta.endpoint";
import { getUnServicio } from "@/api/service.endpoint";
import CategoriaCard from "@/components/CategoriaCard";
import {
  Consulta,
  ServicioProfesional,
  UserProfile,
  UserState,
} from "@/components/component";
import ModalCard from "@/components/ui/ModalCard";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/functions/textFunctions";
import { notificacionesActions } from "@/store/notificacionesSlice";
import { Receipt } from "lucide-react";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContactoProfesional from "./ContactoProfesional";

const DetailServicio = ({
  servicioProfesional,
  user,
  setConsultas,
  setShowconsultas,
  setSendConsulta,
  onClosemodal,
}: {
  user: UserProfile;
  servicioProfesional: ServicioProfesional;
  setConsultas: (value: Array<Consulta>) => void;
  setShowconsultas: (value: boolean) => void;
  setSendConsulta: (value: boolean) => void;
  onClosemodal: () => void;
}) => {
  const [consulta, setConsulta] = useState("");
  const [showContratar, setShowcontratar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: { user: UserState }) => state.user);

  //Contrata el servicio y notifica al usuario
  const contratarHandler = () => {
    setShowcontratar(true);
    //dispatch(notificacionesActions.SUCCES({ message: "Contratado con exito" }));
  };
  //Redirige al perfil del profesional
  const perfilHandler = () => {
    navigate(`/perfil/${servicioProfesional.idProfessional}`);
  };

  //Crea una nueva consulta en el post del servicio profesional
  const consultaHandler = async () => {
    const currentConsulta = {
      nameClient: currentUser.name,
      textClient: consulta,
    };
    try {
      if (consulta && consulta !== "") {
        await postConsulta(servicioProfesional._id, currentConsulta);
        const res = await getUnServicio(servicioProfesional._id);
        setConsultas(res.data.comments);
        setShowconsultas(true);
        setSendConsulta(true);
        setConsulta("");
      } else {
        dispatch(
          notificacionesActions.NORMAL({
            message: "Su consulta no tiene ningun contenido",
          })
        );
      }
    } catch (error) {
      dispatch(
        notificacionesActions.ERROR({
          message: "No se pudo completar su consulta, intente nuevamente",
        })
      );
      console.error("Error al obtener los datos: ", error);
      throw error;
    }
  };

  //Evento al pulsar enter y realizar la consulta
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      consultaHandler();
    }
  };
  return (
    <div className="flex flex-col justify-between gap-3 pr-4 w-1/2">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-3xl text-main-red ca">
          {capitalizeFirstLetter(servicioProfesional.title)}
        </h1>
        <div className="shadow-md rounded-sm overflow-hidden">
          <CategoriaCard
            onPerfil={() => perfilHandler()}
            user={user}
            servicioProfesional={{ ...servicioProfesional, title: "" }}
          ></CategoriaCard>
        </div>
        <p className="">
          {capitalizeFirstLetter(servicioProfesional.description)}
        </p>
      </div>
      <div className="flex flex-col gap-10">
        {currentUser?.token && (
          <div className="flex gap-2">
            <textarea
              onKeyDown={handleKeyDown}
              name="consulta"
              value={consulta}
              onChange={(event) => setConsulta(event.target.value)}
              className="bg-gray-100 shadow-sm p-2 w-full outline-none resize-none"
              placeholder="Haz tu consulta..."
            ></textarea>
            <button
              onClick={consultaHandler}
              className="flex justify-center items-center rounded-md w-[40px] h-full self-center"
            >
              <IoMdSend className="text-3xl text-main-hover hover:text-main-red" />
            </button>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="flex text-emerald-500">
            <Receipt className="mr-1" />
            {servicioProfesional?.services[0]?.price}
          </div>
          {currentUser?.token && (
            <Button
              onClick={contratarHandler}
              className="bg-main-red hover:bg-main-hover w-25 self-end"
            >
              Contactar profesional
            </Button>
          )}
        </div>
      </div>
      {showContratar && (
        <ModalCard width={"xs"} onClose={() => setShowcontratar(false)}>
          <ContactoProfesional
            onClose={() => {
              setShowcontratar(false);
              onClosemodal();
            }}
            servicioProfesional={servicioProfesional}
          />
        </ModalCard>
      )}
    </div>
  );
};

export default DetailServicio;
