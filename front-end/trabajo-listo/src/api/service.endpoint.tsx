import { ServicioEditar, ServicioProfesional } from "@/components/component";
import apiClient from "@/server";

//Obtener lista de servicios
export const serviciosRecomendados = async () => {
  try {
    const res = await apiClient.get("post");
    if (!res) throw new Error("Bad request");
    return res;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};

//Obtener servicio profesional
export const getProfesionalService = async (id: string) => {
  try {
    const res = await apiClient.get(`post/professional/${id}`);

    if (!res) throw new Error("Bad request");

    return res;
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) {
      return null;
    }
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};

//Subir servicio profesional
export const subirServicio = async (data: ServicioProfesional) => {
  try {
    const res = await apiClient.post(`post`, data);
    if (!res) throw new Error("Bad request");

    return res;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};

//Eliminar servicio profesional
export const deleteServicio = async (id: string) => {
  try {
    const res = await apiClient.delete(`post/${id}`);
    if (!res) throw new Error("Bad request");

    return res;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};

//Editar servicio
export const editarServicio = async (id: string, data: ServicioEditar) => {
  try {
    const res = await apiClient.put(`post/${id}`, data);
    if (!res) throw new Error("Bad request");

    return res;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};

//Obtener un servicio profesional por id
export const getUnServicio = async (id: string) => {
  try {
    const res = await apiClient.get(`post/${id}`);
    if (!res) throw new Error("Bad request");

    return res;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};

//Subir imagen al servicio profesional
export const imageServicio = async (
  id: string,
  token: string,
  image: File | null
): Promise<object> => {
  try {
    const res = await apiClient.post(
      `post/image/${id}`,
      { image: image },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!res) throw new Error("Fallo al cargar la imagen");

    return res.data;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    return { error: "error" };
  }
};

//Funcion para convertir texto
function convertirTexto(texto: string) {
  return texto.toUpperCase().replace(/ /g, "_").split("DE").join("").replace(/_+/g, "_");
}

//Obtener servicio por categoria
export const serviciosCategory = async (categoria: string) => {
  try {
    const textoConvertido = convertirTexto(categoria);
    console.log(textoConvertido);
    
    const res = await apiClient.get(
      `post/category/${textoConvertido}?page=1&limit2`
    );

    if (!res) throw new Error("Bad request");
    return res;
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) {
      return null;
    }
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};
