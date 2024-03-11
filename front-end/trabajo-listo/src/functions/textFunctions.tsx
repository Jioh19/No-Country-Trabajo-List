//Funcion para hacer mayuscula el primer caracter de una palabra
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
//Funcion para hacer mayuscula el primer caracter de todas las palabras
export const capitalizeFirstLetterperSentence = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
