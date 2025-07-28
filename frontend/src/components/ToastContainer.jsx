import React from "react";
import { useToast } from "../context/ToastContext";

const Toast = ({ id, message, type, onDismiss }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);
  return <div className={`toast ${type}`}>{message}</div>;
};

const ToastContainer = () => {
  const { toasts, dismissToast } = useToast();
  if (!toasts) return null;
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
};
export default ToastContainer;
