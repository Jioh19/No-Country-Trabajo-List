import { EquipoCard } from "@/components/EquipoCard";
import juanTL from "../assets/teamImg/juanTL.jpg";
import nicoTL from "../assets/teamImg/nicoTL.jpg";
import pieroTL from "../assets/teamImg/pieroTL.png";
import valenTL from "../assets/teamImg/valenTL.png";
import franTL from "../assets/teamImg/franTL.jpeg";
import ferTL from "../assets/teamImg/ferTL.jpeg";
import harryTL from "../assets/teamImg/harryTL.jpg";

export const Equipo = () => {
  const EQUIPO = [
    {
      id: 1,
      nombre: "Franco Tevez",
      rol: "Front-End",
      link: "https://www.linkedin.com/in/franco-tevez-1a985b219/",
      img: franTL,
    },
    {
      id: 3,
      nombre: "Valentin Di Geronimo",
      rol: "Front-End",
      link: "https://www.linkedin.com/in/digeronimovalentin/",
      img: valenTL,
    },
    {
      id: 2,
      nombre: "Fernando Acosta",
      rol: "Front-End",
      link: "https://www.linkedin.com/in/fernando-acosta-172557239/",
      img: ferTL,
    },

    {
      id: 5,
      nombre: "Nicolas Ramos",
      rol: "Back-End",
      link: "https://www.linkedin.com/in/dario-nicolas-ramos",
      img: nicoTL,
    },
    {
      id: 6,
      nombre: "Juan Oh",
      rol: "Back-End",
      link: "https://www.linkedin.com/in/jioh19/",
      img: juanTL,
    },
    {
      id: 7,
      nombre: "Piero Sanchez",
      rol: "UX/UI Designer",
      link: "",
      img: pieroTL,
    },
    {
      id: 8,
      nombre: "Harry Yanarico",
      rol: "Full-Stack",
      link: "https://www.linkedin.com/in/harry-yanarico-20802a12b/",
      img: harryTL,
    },
  ];

  return (
    <main className="flex flex-col items-center gap-14 min-h-[100vh] font-libre-franklin">
      <h1 className="mt-[60px] font-bold text-4xl text-main-red italic">
        CONOCE AL EQUIPO
      </h1>
      <div className="flex flex-wrap justify-center gap-5 mb-[80px] max-w-[800px]">
        {EQUIPO.map((item) => (
          <EquipoCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
};
