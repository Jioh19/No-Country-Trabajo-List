import { OfrecemosCard } from "@/components/OfrecemosCard";
import { Star, Grip, UsersRound, Rocket } from "lucide-react";

export const OfrecemosContainer = () => {
  //Contenido de card que detalla lo que ofrece Trabajo listo
  const CARDS = [
    {
      id: 1,
      title: "Intuitivo",
      text: "Fácil de usar y accesible para todas las personas",
      icon: <Star className="w-10 h-10 text-main-red" />,
    },
    {
      id: 2,
      title: "Variedad",
      text: "Ofrecemos una gran diversidad de servicios, garantizando que encuentres exactamente lo que necesitas",
      icon: <Grip className="w-10 h-10 text-main-red" />,
    },
    {
      id: 3,
      title: "Confianza",
      text: "Garantizamos transparencia, seguridad y protección en cada transacción y experiencia que tengas con los servicios",
      icon: <UsersRound className="w-10 h-10 text-main-red" />,
    },
    {
      id: 4,
      title: "Eficiencia",
      text: "Encuentra o presta servicios de manera rápida y sin complicaciones",
      icon: <Rocket className="w-10 h-10 text-main-red" />,
    },
  ];

	return (
		<section className="z-10 flex flex-col items-center justify-center bg-main-red -mt-4 -mb-4 py-20 rounded-2xl w-[90%]">
			<h2 className=" text-center mb-20 font-extrabold font-libre-franklin text-4xl text-white uppercase italic">
				¿Por qué elegir trabajo listo?
			</h2>
			<div className="grid md:grid-cols-2 xl:grid-cols-4 justify-center gap-8 w-[105%] font-libre-franklin">
				{CARDS.map((card) => (
					<OfrecemosCard
						key={card.id}
						card={card}
					/>
				))}
			</div>
		</section>
	)
}