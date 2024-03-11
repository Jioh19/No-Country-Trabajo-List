import { getUser } from "@/api/user.endpoint";
import { UserState } from "@/components/component";
import { MisServicios } from "@/containers/MisServicios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export const Perfil = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: { user: UserState }) => state.user);
  const [usuario, setUsuario] = useState<UserState>({
    name: "",
    email: "",
    imageProfile: "",
    id: "",
    token: "",
    isPro: false,
  });

  // Scroll al principio de la pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Obtiene el usuario por id
  useEffect(() => {
    const llamada = async () => {
      const value: UserState = id
        ? await getUser(id, user.token)
        : {
          name: "",
          email: "",
          imageProfile: "",
          id: "",
          token: "",
          isPro: false,
        };

      if (value) setUsuario(value);
    };

    llamada();
  }, [id, user.token]);

  return (
    <main className="flex justify-center gap-[70px] bg-[#f7f7f7] min-h-[100vh] font-libre-franklin">
      <section className="justify-center items-center">
        <div className="flex flex-col md:flex-row items-center sm:items-start justify-center gap-5">
          <div className="relative flex flex-col items-center justify-center bg-white mt-[70px] border border-slate-300 rounded-sm w-72 sm:w-[400px] h-22 sm:h-[270px]">
            <img
              className="mt-6 rounded-full w-[150px] h-[150px]"
              src={usuario.imageProfile}
              alt={`Imagen del usuario ${usuario.name}`}
            />
            <h1 className="mt-3 font-bold text-2xl text-zinc-800">
              {usuario.name}
            </h1>
            <span className="text-center italic">{usuario.email}</span>
            <p className="top-2 left-3 absolute font-semibold text-zinc-500">
              {usuario.isPro ? "Profesional" : "Cliente"}
            </p>
            {user.id == usuario.id && (
              <div className="top-2 right-3 absolute text-zinc-500 cursor-pointer">
                <Link to="/editar-perfil">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
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
          </div>

          <div className="flex items-center justify-center">
            {!usuario.isPro && user.id == usuario.id && (
              <div className="flex flex-col items-center justify-center gap-5 bg-white mt-[10px] md:mt-[70px] border border-slate-300 rounded-sm w-[300px] h-[200px] sm:w-[400px] rp860: rp960:w-[500px] md:w-[380px] md:h-[270px]">
                <h2 className="text-center font-semibold text-xl text-zinc-600">
                  ¿Quieres publicar tus propios servicios?
                </h2>
                <button
                  className="bg-main-red px-5 py-3 rounded-sm font-semibold text-white"
                  typeof="button"
                >
                  ¡Conviértete en un profesional!
                </button>
              </div>
            )}
            {usuario.isPro && <MisServicios id={user.id} usuarioId={usuario.id} />}
          </div>
        </div>
      </section>
    </main>
  );
};
