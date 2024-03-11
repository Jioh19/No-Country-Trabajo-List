import { cn } from "@/lib/utils";
import { Instruccion } from "./component";
import { FormSignUpModal } from "@/modals/FormSignUpModal";

const InstruccionesCard = ({ instruccion }: { instruccion: Instruccion }) => {
  return (
    <article className={cn(
      "mb-4 flex items-center justify-center flex-col md:flex-row md:gap-4 font-libre-franklin mx-6",
      instruccion.id === 2 && "flex-auto md:flex-row-reverse "
    )}>
      <div className="flex shadow-xl mb-4 rounded-xl w-72 lx:w-[60%] sm:w-[45%] md:w-[48%] overflow-hidden">
        <img
          src={instruccion.imgUrl}
          alt={instruccion.title}
        />
      </div>
      <div className="gap-4 bg-white p-8 border-2 border-dashed border-gray-700 rounded-xl w-full sm:w-4/6">
        <h2 className="font-bold text-3xl uppercase">
          <span className="mr-2 font-bold text-3xl text-main-red">
            {instruccion.id}.
          </span>
          {instruccion.title}
        </h2>
        <p className="font-semibold text-gray-700 text-md tracking-wide italic">
          {instruccion.text}
        </p>
        <div className="flex justify-start mt-4">
          {instruccion.id === 1 && (
            <FormSignUpModal className="gap-y-9 bg-main-red hover:bg-main-hover rounded-md hover:text-white self-end" />
          )}
        </div>
      </div>
    </article>
  );
};

export default InstruccionesCard;