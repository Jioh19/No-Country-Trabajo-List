const BarModalservicios = ({
  setShowconsultas,
  showConsultas,
}: {
  setShowconsultas: (value: boolean) => void;
  showConsultas: boolean;
}) => {
  return (
    <div className="items-start gap-3 mb-3">
      <button
        onClick={() => {
          setShowconsultas(false);
        }}
        className={
          showConsultas
            ? "p-2 rounded-lg w-fit font-medium text-lg text-main-red hover:text-main-hover outline-none"
            : "p-2 rounded-lg w-fit font-medium text-lg bg-main-red text-main-blue outline-none"
        }
      >
        Imagen
      </button>

      <button
        onClick={() => {
          setShowconsultas(true);
        }}
        className={
          !showConsultas
            ? "p-2 rounded-lg w-fit font-medium text-lg text-main-red hover:text-main-hover outline-none"
            : "p-2 rounded-lg w-fit font-medium text-lg bg-main-red text-main-blue outline-none"
        }
      >
        Consultas
      </button>
    </div>
  );
};

export default BarModalservicios;
