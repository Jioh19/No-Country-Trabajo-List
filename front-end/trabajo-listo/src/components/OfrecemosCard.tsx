import { OfrecemosCards } from "./component";

export const OfrecemosCard = ({ card }: { card: OfrecemosCards }) => {
  return (
    <article className="flex flex-col items-center gap-3 bg-main-blue shadow-xl p-4 border-2 border-gray-700 rounded-xl">
      {card.icon}
      <h3 className="font-bold text-3xl">{card.title}</h3>
      <p className="justify-center w-auto font-medium text-center text-gray-700 text-lg italic">
        {card.text}
      </p>
    </article>
  );
};