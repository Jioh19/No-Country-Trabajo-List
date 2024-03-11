import { Link } from "react-router-dom"
import trabajoListo from "../assets/logo-blue.png"

const footerLinks = [
  { to: "/equipo", text: "Conoce al Equipo" },
  { to: "/testimonios", text: "Testimonios" },
  { text: "Términos y Condiciones" },
  { text: "Formas de Pago" },
  { text: "Preguntas Frecuentes" },
  { text: "soportetrabajolisto@gmail.com" },
];

export const Footer = () => {
  return (
    <footer className="items-center justify-center gap-5 bg-main-blue py-10 border-t-black border-2 w-full font-libre-franklin">
      <section className="flex flex-col md:flex-row items-center justify-center">
        <div className="flex justify-center">
        <Link to="/">
          <img
            className="size-32"
            src={trabajoListo}
            alt="Logo Trabajo Listo"
          />
        </Link>
        </div>
        <ul className="ml-4 gap-2 grid grid-cols sm:grid-cols-2 sm:ml-10">
          {footerLinks.map((link, index) => (
            <li
              key={index}
              className="p-2 font-medium text-sm sm:text-lg hover:text-main-red cursor-pointer list-disc"
            >
              {link.to ? (
                <Link to={link.to}>{link.text}</Link>
              ) : (
                <span>{link.text}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
      <div className="text-center text-sm sm:text-lg text-gray-700 italic p-4">
        Copyright © 2024 "Trabajo Listo". Todos los derechos reservados.
      </div>
    </footer >
  )
}