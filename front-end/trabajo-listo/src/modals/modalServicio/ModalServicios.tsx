import {
  Consulta,
  ServicioProfesional,
  UserProfile,
} from "../../components/component";
import { useState } from "react";
import ConsultasContainer from "@/modals/modalServicio/ConsultasContainer";
import BarModalservicios from "./BarModalservicios";
import DetailServicio from "./DetailServicio";

const ModalServicios: React.FC<{
  user: UserProfile;
  servicioProfesional: ServicioProfesional;
  onClosemodal: () => void;
}> = ({ user, servicioProfesional, onClosemodal }) => {
  const [showConsultas, setShowconsultas] = useState(false);
  const [sendConsulta, setSendConsulta] = useState(false);
  const [consultas, setConsultas] = useState<Array<Consulta>>(
    servicioProfesional.comments
  );

  return (
    <div className="flex w-full min-h-[20rem] max-h-[35rem]">
      <DetailServicio
        user={user}
        servicioProfesional={servicioProfesional}
        setConsultas={setConsultas}
        setShowconsultas={setShowconsultas}
        setSendConsulta={setSendConsulta}
        onClosemodal={onClosemodal}
      />
      <div className="flex flex-col w-1/2">
        <BarModalservicios
          setShowconsultas={setShowconsultas}
          showConsultas={showConsultas}
        />
        {!showConsultas ? (
          <div className="flex justify-center mx-auto">
            <div className="flex gap-3">
              <img
                className="shadow-xl rounded-lg w-[30rem] "
                src={servicioProfesional.imagePost}
              ></img>
            </div>
          </div>
        ) : (
          <ConsultasContainer
            servicioProfesional={servicioProfesional}
            consulta={consultas}
            updateConsultas={(value) => setConsultas(value)}
            scrollLast={sendConsulta}
            scrollhandler={setSendConsulta}
          />
        )}
      </div>
    </div>
  );
};

export default ModalServicios;
