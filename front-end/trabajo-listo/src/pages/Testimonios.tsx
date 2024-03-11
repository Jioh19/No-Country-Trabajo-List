import image1 from "../assets/imageServicio1.png";
import image2 from "../assets/imageServicio2.png";

export const Testimonios = () => {
  return (
    <div className="bg-white w-full min-h-screen ">
      <section className="">
        <div className="flex flex-col gap-10 mx-6">
          <h1 className="mt-[60px] mb-4 font-bold text-4xl text-center text-main-red italic">
            Testimonios
          </h1>
          <div className="flex flex-wrap -m-4 ">
            <div className="p-4 w-full md:w-1/2 ">
              <div
                className="bg-gray-200 p-8 rounded h-full"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 975.036 975.036"
                  className="block mb-4 w-5 h-5 text-gray-400 "
                >
                  <path
                    d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"
                    className=" "
                  ></path>
                </svg>
                <p className="mb-6 leading-relaxed ">
                  Estoy sumamente impresionado con la calidad y atención al
                  detalle que recibí al contratar los servicios de carpintería
                  de esta empresa. Desde el primer contacto hasta la entrega del
                  proyecto, todo el equipo demostró profesionalismo y pasión por
                  su trabajo. Estoy emocionado de recomendar este servicio de
                  carpintería a todos aquellos que busquen resultados
                  excepcionales y un trato amable. ¡Gracias por hacer de mi
                  proyecto una experiencia tan positiva y satisfactoria!
                </p>
                <a className="inline-flex items-center ">
                  <img
                    alt="testimonio"
                    src={image1}
                    className="flex-shrink-0 rounded-full w-12 h-12 object-center object-cover"
                  ></img>
                  <span className="flex flex-col flex-grow pl-4 ">
                    <span className="font-medium text-gray-900 title-font">
                      @Marco_Sebastian
                    </span>
                    <span className="text-gray-500 text-sm ">Mecánico</span>
                  </span>
                </a>
              </div>
            </div>
            <div className="p-4 w-full md:w-1/2 ">
              <div
                className="bg-gray-200 p-8 rounded h-full"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 975.036 975.036"
                  className="block mb-4 w-5 h-5 text-gray-400 "
                >
                  <path
                    d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"
                    className=" "
                  ></path>
                </svg>
                <p className="mb-6 leading-relaxed ">
                  La puntualidad y eficiencia con la que el plomero abordó la
                  situación me dejaron impresionado. Su conocimiento y habilidad
                  para identificar y solucionar rápidamente el problema me
                  dieron mucha confianza en su trabajo. Además, me tranquilizó
                  saber que utilizaban equipos de alta calidad para garantizar
                  resultados duraderos.
                </p>
                <a className="inline-flex items-center ">
                  <img
                    alt="testimonio"
                    src={image2}
                    className="flex-shrink-0 rounded-full w-12 h-12 object-center object-cover"
                  ></img>{" "}
                  <span className="flex flex-col flex-grow pl-4 ">
                    <span className="font-medium text-gray-900 title-font">
                      @Rodriguez_Mateo
                    </span>
                    <span className="text-gray-500 text-sm ">Plomero</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
