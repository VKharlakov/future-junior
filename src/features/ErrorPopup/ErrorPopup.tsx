import "./ErrorPopup.css";

import { useRef, useEffect } from "react";

interface ErrorPopupProps {
  isActive: boolean;
  errorMessage: string | null;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ErrorPopup({ isActive, setIsActive, errorMessage }: ErrorPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  //   Функция закрытия попапа
  function handleClose() {
    setIsActive(false);
  }

  //   Слушатели для нажатия Esc или клике снаружи попапа
  useEffect(() => {
    // Закрытие попапа при нажатии "Esc"
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    // Закрытие попапа при клике на фон
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current
          .querySelector(".error-popup__content")
          ?.contains(event.target as Node)
      ) {
        handleClose();
      }
    }
    if (isActive) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  return (
    <div
      className={`error-popup ${isActive ? "error-popup_active" : ""}`}
      ref={popupRef}
    >
      <div className="error-popup__content">
        <button
          className="error-popup__close-button"
          onClick={() => {
            handleClose();
          }}
        >
          Закрыть
        </button>
        <p className="error-popup__text">
          {" "}
          {errorMessage ? errorMessage : "Возникла непредвиденная ошибка"}
        </p>
        <button
          className="error-popup__accept-button"
          onClick={() => {
            handleClose();
          }}
        >
          Ок
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
