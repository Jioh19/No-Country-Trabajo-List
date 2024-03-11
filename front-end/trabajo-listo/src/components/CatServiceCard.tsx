import { serviciosCategory } from "@/api/service.endpoint";
import { useEffect, useState } from "react";
import { BotonCat, ServicioProfesional } from "./component";
import { cn } from "@/lib/utils";
import { notificacionesActions } from "@/store/notificacionesSlice";
import { useDispatch } from "react-redux";

export const CatServiceCard = ({
  el,
  estado,
  getTodos,
  todos,
  setServicios,
  eliminar,
}: {
  el: BotonCat;
  estado: string;
  getTodos: () => void;
  todos: boolean;
  setServicios: (data: Array<ServicioProfesional>) => void;
  eliminar: (value: string) => void;
}) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

    //Activa | Desactiva el componente al cambiar el state "estado"
    useEffect(() => {
        if(el.name === "todos"){
          if(!todos){
            setIsActive(false)
          }else{
            setIsActive(true)
          }
        }else{
          if(el.name === estado && el.name !== "todos"){
            setIsActive(true)
          }else{
            setIsActive(false)
          }
        }
    }, [estado, el.name])
    
    //Añade la categoria del componente seleccionado al estado de los servicios si el componente esta activo, sino la elimina
    const handleAddCategory = async (cat: string) => {
        
        if(isActive){
            if(el.name === "todos" && estado === el.name){
              setIsActive(true)
            }else{
              eliminar(el.name)  
              setIsActive(false)
            }
        }else{
            if(el.name !== "todos"){
              const categoria = await serviciosCategory(cat)
              if(categoria){
                  const data = categoria.data
                  setServicios(data)
                  setIsActive(true)
              }else{
                  dispatch(
                      notificacionesActions.NORMAL({
                        message: `Todavía no hay servicios en la categoría ${cat}`,
                      })
                  );
                  setIsActive(false)
              }
            }else{
              getTodos()
              setIsActive(false)
            } 
        }
      }

  return (
    <div>
      <button
        onClick={() => handleAddCategory(el.name)}
        type="button"
        className={cn(
          "flex flex-col justify-center items-center gap-3 border-[#0E7490] border rounded-3xl w-[190px] h-[150px] text-[#0E7490]",
          isActive ? "bg-[#0E7490] text-white" : "bg-transparent"
        )}
      >
        {el.svg}
        <h3 className="text-center">{el.nick}</h3>
      </button>
    </div>
  );
};
