import "./Preloader.css";

interface PreloaderProps {
  isActive: boolean;
}

function Preloader({ isActive }: PreloaderProps) {
  return (
    <div
      className={`preloader-wrapper ${
        isActive ? "" : "preloader-wrapper_hidden"
      }`}
    >
      <div className="preloader">
        <div className="preloader__pg-shadow"></div>
        <div className="preloader__pg"></div>
        <div className="preloader__pg preloader__pg--2"></div>
        <div className="preloader__pg preloader__pg--3"></div>
        <div className="preloader__pg preloader__pg--4"></div>
        <div className="preloader__pg preloader__pg--5"></div>
      </div>
    </div>
  );
}

export default Preloader;
