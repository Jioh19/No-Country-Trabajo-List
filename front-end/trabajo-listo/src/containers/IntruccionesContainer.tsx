import register from "../assets/register.jpg";
import findService from "../assets/find-service.jpg";
import agreement from "../assets/agreement.jpg";
import InstruccionesCard from "@/components/InstruccionesCard";

const IntruccionesContainer = () => {
  const INSTRUCCIONES = [
    {
      imgUrl: register,
      id: 1,
      title: "Regístrate",
      text: "Tanto como cliente o como profesional. ¡Regístrate y comienza a formar parte de esta gran comunidad!",
    },
    {
      imgUrl: findService,
      id: 2,
      title: "Busca tu necesidad",
      text: "Nuestro buscador todo lo puede. ¡Encuentra cualquier tipo de servicio o profesional que necesites al alcance de un click!",
    },
    {
      imgUrl: agreement,
      id: 3,
      title: "Contrata",
      text: "¿Satisfecho con lo que buscabas? ¡Hora de conectar! El último paso es simple: contrata y resuelve tus necesidades",
    },
  ];

  return (
    <section className="flex flex-col bg-main-blue py-20 rounded-2xl w-[95%]">
      <h2 className="text-center mb-20 font-extrabold text-4xl text-main-red uppercase italic">
        ¿Cómo contratar en Trabajo Listo?
      </h2>
      {INSTRUCCIONES.map((instruccion) => (
        <InstruccionesCard
          key={instruccion.id}
          instruccion={instruccion}
        />
      ))}
    </section>
  );
};

export default IntruccionesContainer;
