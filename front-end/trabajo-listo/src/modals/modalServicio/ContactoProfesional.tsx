import { ServicioProfesional, UserProfile } from "@/components/component";

import { useEffect, useState } from "react";
import { getProfessional } from "@/api/user.endpoint";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { notificacionesActions } from "@/store/notificacionesSlice";
import { Separator } from "@/components/ui/separator";

const ContactoProfesional = ({
  servicioProfesional,
  onClose,
}: {
  servicioProfesional: ServicioProfesional;
  onClose: () => void;
}) => {
  const [currentProfesional, setCurrentProfesional] = useState<UserProfile>({
    _id: "",
    name: "",
    email: "",
    imageProfile: "",
    isProfessional: true,
    category: [],
    phone: 0,
    __v: 0,
    address: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const getProf = async () => {
      try {
        const res: UserProfile = await getProfessional(
          servicioProfesional.idProfessional
        );
        if (!res) throw new Error("Bad request");
        setCurrentProfesional(res);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    getProf();
  }, [servicioProfesional.idProfessional]);

  const contratarHandler = () => {
    dispatch(notificacionesActions.SUCCES({ message: "Contratado con exito" }));
    onClose();
  };

  if (!currentProfesional) return;

  return (
    <div className="flex flex-col justify-center gap-6">
      <h1 className="font-bold text-2xl text-main-red self-start">
        Datos de contacto
      </h1>
      <div className="flex flex-col justify-center gap-2 m-2">
        <div className="flex justify-between">
          <p className="font-semibold text-main-red">Nombre</p>
          <p>{currentProfesional.name}</p>
        </div>
        <Separator></Separator>
        <div className="flex justify-between">
          <p className="font-semibold text-main-red">Email</p>
          <p>{currentProfesional.email}</p>
        </div>
        <Separator></Separator>
        <div className="flex justify-between">
          <p className="font-semibold text-main-red">Celular</p>
          <p>{currentProfesional.phone}</p>
        </div>
        <Separator></Separator>
        <div className="flex justify-between">
          <p className="font-semibold text-main-red">Dirección</p>
          <p>{currentProfesional.address}</p>
        </div>
        <Separator></Separator>
      </div>

      <Button
        onClick={contratarHandler}
        className="bg-main-red hover:bg-main-hover w-25 text-lg self-end"
      >
        Contratar
      </Button>
    </div>
  );
};

export default ContactoProfesional;
