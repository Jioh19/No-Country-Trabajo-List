import { useEffect, useState } from "react";
import { ServicioProfesional, UserProfile, UserState } from "./component";
import { getProfessional } from "@/api/user.endpoint";
import { useDispatch, useSelector } from "react-redux";
import { deleteServicio } from "@/api/service.endpoint";
import { notificacionesActions } from "@/store/notificacionesSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Receipt } from "lucide-react";
import CategoriaCard from "./CategoriaCard";
import ModalServicios from "../modals/modalServicio/ModalServicios";
import ModalCard from "./ui/ModalCard";
import { capitalizeFirstLetter } from "@/functions/textFunctions";
import ConfirmacionCard from "./ui/ConfirmacionCard";

type RecomendacionesCardProps = {
  servicioProfesional: ServicioProfesional | null;
  onActualizar?: () => void;
};

const RecomendacionesCard: React.FC<RecomendacionesCardProps> = ({
  servicioProfesional,
  onActualizar,
}) => {
  const user = useSelector((state: { user: UserState }) => state.user);
  const [servicio, setServicio] = useState<UserProfile | null>(null);
  const [showModal, setShowmodal] = useState(false);
  const [showConfirmacion, setShowconfirmacion] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const closeModalHandler = () => {
    setShowmodal(false);
  };

  //Eliminar servicio del profesional por id
  const handleDelete = async () => {
    if (servicioProfesional?._id) {
      const value = await deleteServicio(servicioProfesional?._id);

      if (value.status == 200) {
        dispatch(
          notificacionesActions.SUCCES({
            message: "Se eliminó el servicio correctamente",
          })
        );

        setShowconfirmacion(false);
        if (onActualizar) onActualizar();
      } else {
        dispatch(
          notificacionesActions.ERROR({
            message: "Hubo un error al borrar el servicio",
          })
        );
      }
    }
  };

  //Obtener profesional asosiado a un servicio ya posteado
  useEffect(() => {
    const fetchProfressional = async () => {
      if (servicioProfesional) {
        const res = await getProfessional(servicioProfesional.idProfessional);

        setServicio(res);
      }
    };

    fetchProfressional();
  }, [servicioProfesional, user.token]);

  if (!servicioProfesional || !servicio) return null;

  return (
    <div>
      <article className="flex flex-col items-center border-gray-700 bg-white shadow-xl rounded-2xl w-[350px] h-[455px] font-libre-franklin overflow-hidden">
        <div className="flex justify-center w-full h-[230px] hover:cursor-pointer hover:scale-[101%]">
          <img
            onClick={() => {
              setShowmodal(true);
            }}
            className="h-[230px] object-fill"
            src={servicioProfesional.imagePost}
          />
        </div>
        <div className="flex flex-col justify-between bg-white w-full h-full">
          {servicio && servicioProfesional && (
            <CategoriaCard
              user={servicio}
              servicioProfesional={servicioProfesional}
              onPerfil={() => {
                navigate(`/perfil/${servicioProfesional.idProfessional}`);
              }}
            ></CategoriaCard>
          )}
          <div className="flex flex-row sm:flex-col sm:justify-between items-center sm:items-start h-full">
            <div className="flex items-center h-full">
              <p
                onClick={() => {
                  setShowmodal(true);
                }}
                className="line-clamp-2 p-4 w-full h-[6ch] text-ellipsis hover:underline hover:cursor-pointer"
              >
                {capitalizeFirstLetter(servicioProfesional.description)}
              </p>
            </div>
            <div className="flex flex-row-reverse justify-between p-2 w-full">
              <div className="flex items-center">
                {servicioProfesional.idProfessional === user.id && id && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowconfirmacion(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <Link to={`/editar-servicio/${servicioProfesional._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
                {showConfirmacion && (
                  <ModalCard
                    width={"xs"}
                    onClose={() => setShowconfirmacion(false)}
                  >
                    <ConfirmacionCard
                      onAction={handleDelete}
                      text={"¿Estas seguro que deseas eliminar el servicio?"}
                      onClose={() => setShowconfirmacion(false)}
                    ></ConfirmacionCard>
                  </ModalCard>
                )}
              </div>
              <div className="flex text-emerald-500">
                <Receipt className="mr-1" />
                {servicioProfesional?.services[0]?.price}
              </div>
            </div>
          </div>
        </div>
      </article>
      {showModal && (
        <ModalCard width={"lg"} onClose={closeModalHandler}>
          <ModalServicios
            user={servicio}
            servicioProfesional={servicioProfesional}
            onClosemodal={closeModalHandler}
          />
        </ModalCard>
      )}
    </div>
  );
};

export default RecomendacionesCard;
