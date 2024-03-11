import { getProfesionalService } from "@/api/service.endpoint";
import RecomendacionesCard from "@/components/RecomendacionesCard";
import { ServicioProfesional } from "@/components/component";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const MisServicios = ({
  id,
  usuarioId,
}: {
  id: string;
  usuarioId: string;
}) => {
  const [servicios, setServicios] = useState<null | Array<ServicioProfesional>>(
    null
  );

  const [actualizarServicio, setActualizarServicio] = useState(false);

  //Toggle para actualizar servicios
  const refreshHandler = () => {
    setActualizarServicio(!actualizarServicio);
  };

  //Cada vez que se actualiza la pagina o se edita un servicio, se vuelve a obtener la lista de los servicios por id
  useEffect(() => {
    const llamada = async () => {
      if (usuarioId) {
        const value = await getProfesionalService(usuarioId);

        if (value && value?.data) {
          setServicios(value.data);
        } else {
          setServicios(null);
        }
      }
    };

    llamada();
  }, [id, actualizarServicio]);

  return (
    <div className="mb-[70px] h-auto">
      {servicios === null ? (
        <div className="flex flex-col items-center justify-center gap-5 bg-white mt-[70px] border border-slate-300 rounded-sm w-[700px] h-[270px]">
          <h2 className="font-semibold text-xl text-zinc-600">
            Todavia no tienes ningún servicio, ¿Deseas agregar alguno?
          </h2>
          <Link to="/nuevo-servicio">
            <button
              className="bg-main-red hover:bg-main-hover px-5 py-3 rounded-sm font-semibold text-white"
              typeof="button"
            >
              Agregar Servicio
            </button>
          </Link>
        </div>
      ) : (
        <div className="mt-[25px] max-w-[1082px] h-auto">
          <h2 className="mb-3 font-bold text-2xl text-main-red italic">
            {id === usuarioId ? "MIS SERVICIOS" : "SUS SERVICIOS"}
          </h2>
          <div className="flex flex-wrap gap-4 w-full h-auto">
            {servicios.map((el) => (
              <RecomendacionesCard
                key={el._id}
                servicioProfesional={el}
                onActualizar={refreshHandler}
              />
            ))}
            {id === usuarioId && (
              <Link to="/nuevo-servicio">
                <div className="flex flex-col items-center justify-center bg-white hover:bg-main-hover shadow-3xl border rounded-2xl w-[350px] h-[455px] text-main-red hover:text-white transition-all duration-200 overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <p className="font-semibold text-xl">
                    Agregar un nuevo servicio
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
