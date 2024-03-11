import Hero from "@/components/Hero";
import InstruccionesContainer from "@/containers/IntruccionesContainer";
import { OfrecemosContainer } from "@/containers/OfrecemosContainer";
import RecomendacionesContainer from "@/containers/RecomendacionesContainer";

export const Home = () => {
  return (
    <main className="flex flex-col items-center ">
      <Hero />
      <OfrecemosContainer />
      <InstruccionesContainer />
      <RecomendacionesContainer />
    </main>
  );
};
