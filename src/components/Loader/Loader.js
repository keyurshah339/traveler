import Loader from "react-loader-spinner";
import "./Loader.css";
export function SetLoader() {
  return (
    <div className="loader">
      <div>
        <Loader type="Puff" color="#6C63FF" height={50} width={50} />
      </div>
    </div>
  );
}
