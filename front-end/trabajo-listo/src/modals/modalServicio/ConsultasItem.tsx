import { capitalizeFirstLetter } from "@/functions/textFunctions";
import {
  Consulta,
  ServicioProfesional,
  UserState,
} from "../../components/component";
import { useDispatch, useSelector } from "react-redux";
import { FaReplyAll } from "react-icons/fa6";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { postConsulta } from "@/api/consulta.endpoint";
import { getUnServicio } from "@/api/service.endpoint";
import { notificacionesActions } from "@/store/notificacionesSlice";

const ConsultasItem = ({
  consulta,
  servicioProfesional,
  updateConsultas,
}: {
  consulta: Consulta;
  servicioProfesional: ServicioProfesional;
  updateConsultas: (value: Array<Consulta>) => void;
}) => {
  const [answer, setAnswer] = useState("");
  const [showText, setShowtext] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: { user: UserState }) => state.user);

  //Toggle para mostra o acultar la respuesta
  const responseHandler = () => {
    setShowtext(!showText);
  };

  //Agregar una respuesta a una consulta del servicio profesional, y obtiene la actualizacion para renderizar los cambios.
  const answerHandler = async () => {
    const currentConsulta = {
      id: consulta.id,
      answer: answer,
    };
    try {
      await postConsulta(servicioProfesional._id, currentConsulta);
      const res = await getUnServicio(servicioProfesional._id);

      //Si hay comentarios, se actualizan los datos, se notifica al usuario y se resetean los datos
      if (res.data.comments) {
        updateConsultas(res.data.comments);
        setShowtext(false);
        setAnswer("");
        dispatch(notificacionesActions.NORMAL("Respuesta exitosa"));
      }
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
      throw error;
    }
  };

  //Evento al pulsar enter para enviar la respuesta
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      answerHandler();
      setAnswer("");
    }
  };

  return (
    <div className="shadow-md mt-1 p-1 rounded-md w-[98%] ">
      <div className="relative flex flex-col ">
        <h1 className="font-semibold text-main-hover">
          {consulta.nameClient && capitalizeFirstLetter(consulta.nameClient)}
        </h1>
        <h1 className="pr-2 pl-1 font-normal">
          {consulta.textClient && capitalizeFirstLetter(consulta.textClient)}
        </h1>

        {currentUser.id === servicioProfesional.idProfessional &&
          !consulta.answer && (
            <button className="right-0 absolute" onClick={responseHandler}>
              <FaReplyAll className="text-main-hover text-xl hover:text-main-red" />
            </button>
          )}
      </div>
      {showText && (
        <div className="relative flex mt-2 mb-2">
          <textarea
            onKeyDown={handleKeyDown}
            name="consulta"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            className="bg-gray-100 shadow-sm p-2 pr-10 w-full outline-none resize-none"
            placeholder="Tu respuesta..."
          ></textarea>

          <button
            onClick={answerHandler}
            className="right-0 absolute flex justify-center items-center rounded-md w-[40px] h-full self-center"
          >
            <IoMdSend className="text-main-hover text-xl hover:text-main-red" />
          </button>
        </div>
      )}
      {consulta?.answer && (
        <p className="ml-5 p-1 rounded-sm text-gray-600 ">
          {consulta?.answer && `-  ${capitalizeFirstLetter(consulta?.answer)}`}
        </p>
      )}
    </div>
  );
};

export default ConsultasItem;
