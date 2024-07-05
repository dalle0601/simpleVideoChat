import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ show, onClose, children }: ModalProps) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 relative">
                <button onClick={onClose} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                    취소
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
