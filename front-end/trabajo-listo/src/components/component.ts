export interface Instruccion {
  imgUrl: string;
  id: number;
  title: string;
  text: string;
  nombre?: string;
}

export interface BotonCat {
  name: string;
  nick: string;
  svg: JSX.Element;
}

export interface ServicioProfesional {
  _id: string;
  category: string;
  comments: [];
  description: string;
  idProfessional: string;
  imagePost: string;
  nameProfessional: string;
  services: { name: string; price: number }[];
  title: string;
  views: number;
  __v: number;
}

export interface ServicioEditar {
  category: string;
  description: string;
  services: { name: string; price: number }[];
  title: string;
}

export interface OfrecemosCards {
  id: number;
  text: string;
  title: string;
  icon: React.ReactNode;
}

export interface EquipoCards {
  id: number;
  nombre: string;
  rol: string;
  link: string;
  img: string;
}

export interface UserState {
  name: string;
  email: string;
  imageProfile: string;
  id: string;
  token: string;
  isPro: boolean;
}

export interface tokenUser {
  email: string;
  exp: number;
  iat: number;
  id: string;
  message: string;
}

export interface Notificacion {
  hidden: boolean;
  message: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  imageProfile: string;
  isProfessional: boolean;
  category: string[];
  phone?: number;
  address?: string;
  __v: number;
}

export interface Consulta {
  id: number;
  textClient: string;
  nameClient: string;
  answer?: string;
}

export interface Respuesta {
  id: string;
  text: string;
}
