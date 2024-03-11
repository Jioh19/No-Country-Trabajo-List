import {
  capitalizeFirstLetter,
  capitalizeFirstLetterperSentence,
} from "@/functions/textFunctions";
import { ServicioProfesional, UserProfile } from "./component";
import { Rating, Tooltip } from "@mui/material";

//Card reutilizable del usuario
const CategoriaCard: React.FC<{
  user: UserProfile;
  servicioProfesional: ServicioProfesional;
  onPerfil: () => void;
}> = ({ user, servicioProfesional, onPerfil }) => {
  return (
    <picture onClick={onPerfil} className="flex sm:flex-row flex-col items-center gap-4 bg-main-blue p-2">
      <Tooltip title={user?.name}>
          <img
            className="rounded-full w-12 h-12 hover:cursor-pointer object-fill"
            src={user?.imageProfile}
          />
      </Tooltip>
      <div className="flex flex-col pr-3 w-fit max-w-[269px]">
        <Tooltip title={capitalizeFirstLetter(servicioProfesional.title)}>
          <h3 className="font-semibold text-black text-ellipsis text-nowrap overflow-hidden">
            {capitalizeFirstLetter(servicioProfesional.title)}
          </h3>
        </Tooltip>
        <div className="flex flex-col justify-between w-fit">
          <span className="font-semibold text-gray-700 text-sm italic">
            {capitalizeFirstLetter(servicioProfesional?.services[0]?.name)}
          </span>
          <div className="flex items-center gap-1">
            <h3 className="text-xs">{`De ${capitalizeFirstLetterperSentence(user?.name)}`}</h3>
            <Rating
              name="read-only"
              readOnly
              value={3.5}
              precision={0.5}
              size="small"
            />
          </div>
        </div>
      </div>
    </picture>
  );
};

export default CategoriaCard;
