import { Button } from "./button";

const ConfirmacionCard = ({
  onAction,
  text,
  onClose,
}: {
  onAction: () => void;
  text: string;
  onClose: () => void;
}) => {
  return (
    <div className="flex flex-col justify-between w-full h-[8rem]">
      <p className="pt-5 font-semibold text-center text-lg">{text}</p>
      <div className="flex gap-4 self-end">
        <Button
          className="bg-white text-main-red hover:text-white"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button className="" onClick={onAction}>
          Aceptar
        </Button>
      </div>
    </div>
  );
};

export default ConfirmacionCard;
