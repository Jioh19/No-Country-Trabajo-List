import { useEffect, useRef } from "react";
import ConsultasItem from "@/modals/modalServicio/ConsultasItem";
import { Consulta, ServicioProfesional } from "@/components/component";

const ConsultasContainer = ({
  consulta,
  servicioProfesional,
  updateConsultas,
  scrollLast,
  scrollhandler,
}: {
  consulta: Array<Consulta>;
  servicioProfesional: ServicioProfesional;
  updateConsultas: (value: Array<Consulta>) => void;
  scrollLast: boolean;
  scrollhandler: (value: boolean) => void;
}) => {
  //referencia para scrollear
  const refContainer = useRef<HTMLUListElement>(null);

  //Scroll hasta el final de las consultas
  useEffect(() => {
    if (scrollLast && refContainer.current) {
      refContainer.current.scrollTop = refContainer.current.scrollHeight;
      scrollhandler(false);
    }
  }, [consulta, scrollLast, scrollhandler]);

  return (
    <div className="flex flex-col gap-7 ml-3">
      {consulta && consulta?.length === 0 ? (
        <div className="flex justify-center items-center min-h-[15rem]">
          <h1 className="font-semibold text-xl text-zinc-600">
            No se realizaron consultas para este servicio
          </h1>
        </div>
      ) : (
        <ul
          ref={refContainer}
          className="flex flex-col gap-3 bg-main-blue pl-4 max-h-[25rem] overflow-y-scroll scroll-smooth"
        >
          {consulta.map((consulta, index) => (
            <ConsultasItem
              key={consulta.id + index}
              consulta={consulta}
              servicioProfesional={servicioProfesional}
              updateConsultas={updateConsultas}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConsultasContainer;
