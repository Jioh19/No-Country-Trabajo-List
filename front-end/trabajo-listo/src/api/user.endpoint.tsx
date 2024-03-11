import { UserProfile, UserState, tokenUser } from "@/components/component";
import apiClient, { setClientToken } from "../server";
import { jwtDecode } from "jwt-decode";

//Registar usuario
export const registerUser = async (user: object) => {
  try {
    const res = await apiClient.post("user", user);
    if (!res) throw new Error("Bad Request");
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes("500")) {
      return "error 500";
    }
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};

//Loguear usuario
export const authUser = async (user: object) => {
  try {
    const res = await apiClient.post("auth/login", user);
    if (!res) throw new Error("Bad Request");
    setClientToken(res.data);
    return res.data;
  } catch (error) {
    if (error instanceof Error && error.message.includes("401")) {
      return "error 401";
    }
    if (error instanceof Error && error.message.includes("404")) {
      return "error 404";
    }
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};

//Obtener usuario
export const getUser = async (
  id: string,
  token: string
): Promise<UserState> => {
  try {
    const res = await apiClient.get(`user/${id}`);

    if (!res) throw new Error("Bad Request");

    const newObject: UserState = {
      name: res.data.name,
      token: token,
      id: res.data._id,
      imageProfile: res.data.imageProfile,
      isPro: res.data.isProfessional,
      email: res.data.email,
    };

    return newObject;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};

//Obtener perfil de usuario por id
export const getProfile = async (value: string): Promise<UserProfile> => {
  try {
    //Decodificar token y guardar el valor
    const decodedToken: tokenUser = jwtDecode(value);
    const res = await apiClient.get(`user/${decodedToken.id}`);

    if (!res) throw new Error("Bad Request");

    return res.data;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};

//Actualizar perfil de usuario
export const updateProfile = async (
  id: string,
  data: object
): Promise<object> => {
  try {
    const res = await apiClient.put(`user/${id}`, data);

    if (!res) throw new Error("Fallo al actualizar");

    return res.data;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    if (error instanceof Error && error.message.includes("500")) {
      return { error: "error 500" };
    }
    throw error;
  }
};

//Actualizar imagen de usuario por id
export const updateImage = async (
  id: string,
  token: string,
  image: object
): Promise<object> => {
  try {
    const res = await apiClient.post(
      `user/image/${id}`,
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
    throw error;
  }
};

//Obtener todos los usuarios
export const getAll = async (token: string): Promise<object> => {
  try {
    const res = await apiClient.get(`user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (!res) throw new Error("Fallo al cargar la imagen");

    return res.data;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};

//Obtener usuario profesional
export const getProfessional = async (id: string): Promise<UserProfile> => {
  try {
    const res = await apiClient.get(`user/${id}`, {
      headers: {
        Authorization: "",
      },
    });

    if (!res) throw new Error("Bad Request");
    return res.data;
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
    throw error;
  }
};
