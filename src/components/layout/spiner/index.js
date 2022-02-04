import "./style.css";

export const Spiner = ({ full = true, label = "Carregando..." }) => (
  <div className={full ? "spiner-full" : ""}>
    <div className="a-loader-container"></div>
    <h1>{label}</h1>
  </div>
);
