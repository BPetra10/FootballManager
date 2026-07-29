import { useEffect } from "react";

import { FaXmark } from "react-icons/fa6";

import "./Modal.css";

function Modal({
    open,
    onClose,
    children
}) {

    useEffect(() => {

        function handleEscape(event) {

            if (event.key === "Escape") {

                onClose();

            }

        }

        if (open) {

            document.addEventListener(
                "keydown",
                handleEscape
            );

            document.body.style.overflow = "hidden";

        }

        return () => {

            document.removeEventListener(
                "keydown",
                handleEscape
            );

            document.body.style.overflow = "";

        };

    }, [open, onClose]);

    if (!open) {

        return null;

    }

    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal-content"
                onClick={(event) => event.stopPropagation()}
            >

                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close"
                >

                    <FaXmark />

                </button>

                {children}

            </div>

        </div>

    );

}

export default Modal;