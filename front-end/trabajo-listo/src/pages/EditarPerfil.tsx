import { updateImage, updateProfile } from "@/api/user.endpoint";
import { UserState } from "@/components/component";
import { notificacionesActions } from "@/store/notificacionesSlice";
import { userActions } from "@/store/userSlice";
import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const EditarPerfil = () => {
  const user = useSelector((state: { user: UserState }) => state.user);
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [imagen, setImagen] = useState<null | object>(null);
  const navigate = useNavigate();

  //Se encarga de actualizar los cambios de la input file
  const handleImagenChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const image = event.target.files?.[0];

    if (image) {
      setImagen(image);
    } else {
      setImagen(null);
    }
  };

  //Se encarga de tomar los datos del form, crear un objeto y subirlo a la base de datos. Tambien valida y notifica los sucesos
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { name: nombre, email: email };
    if (data.name.length > 3 && data.email.length > 3) {
      const newValues = await updateProfile(user.id, data);
      //if (newValues==="Error 500")
      dispatch(userActions.EDIT_USER(newValues));

      dispatch(
        notificacionesActions.SUCCES({ message: "Datos editados con exito" })
      );
      if (imagen != null) {
        const urlImage = await updateImage(user.id, user.token, imagen);
        dispatch(userActions.EDIT_USER({ imageProfile: urlImage }));
      }

      if (imagen == null) {
        dispatch(
          notificacionesActions.NORMAL({
            message: "No se realizo cambios en la imagen",
          })
        );
      }
    }
  };

  return (
    <main className="flex flex-col items-center bg-[#f7f7f7] min-h-[100vh] font-libre-franklin">
      <button
        onClick={() => navigate(-1)}
        className="top-[6rem] left-[10rem] absolute flex items-center gap-1 bg-main-red p-2 rounded-full text-main-blue"
      >
        <MdArrowBack className="text-xl "></MdArrowBack>
        <p>Volver</p>
      </button>
      <h1 className="mt-[70px] font-bold text-3xl text-main-red italic">
        EDITAR PERFIL
      </h1>
      <form
        className="relative flex flex-col border-slate-300 bg-white mt-5 p-5 border rounded-sm"
        onSubmit={handleSubmit}
      >
        <label className="font-semibold text-zinc-500">Nombre Completo:</label>
        <input
          className="mt-2 focus:outline-0 focus:border-2 py-2 pr-4 pl-2 border rounded-md"
          placeholder={user.name}
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label className="mt-4 font-semibold text-zinc-500">Email:</label>
        <input
          className="mt-2 focus:outline-0 focus:border-2 py-2 pr-4 pl-2 border rounded-md"
          type="email"
          placeholder={user.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col mt-4">
          <label className="mr-5 font-semibold text-zinc-500">
            Imagen de perfil:
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImagenChange}
          />
          <div className="flex justify-between items-end mt-2">
            <img
              className="mt-3 rounded-full w-[85px] h-[85px]"
              src={user.imageProfile}
              alt={`Foto de perfil del usuario ${user.name}`}
            />
            <Link
              to={`/perfil/${user.id}`}
              className="bg-main-red p-2 rounded-sm h-fit font-semibold text-white"
              type="submit"
            >
              Descartar
            </Link>
            <button
              className="bg-main-red p-2 rounded-sm h-fit font-semibold text-white"
              type="submit"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};
