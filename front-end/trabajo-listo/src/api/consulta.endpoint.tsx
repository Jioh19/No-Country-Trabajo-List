import apiClient from "@/server";

//Guardar consulta o respuesta segun los valores de "consulta" en la base de datos
export const postConsulta = async (idPost: string, consulta: object) => {
  try {
    const res = await apiClient.post(`post/comment/${idPost}`, consulta);

    if (!res) throw new Error("Bad request");
    return res;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};
