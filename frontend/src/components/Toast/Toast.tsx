import { IoCloseOutline } from "react-icons/io5";

import "./Toast.scss"

interface IProps {
  message: string;
  error: boolean
  hideToast: () => void
}

export const Toast = ({ message, error, hideToast }: IProps) => {
  return (
    <div style={{ backgroundColor: error ? "#B22222" : "#006400"}} className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body">
          {message}
        </div>
        
        <button type="button" aria-label="Close" onClick={hideToast}>
          <IoCloseOutline size={24} color="#fff"/>
        </button>
      </div>
    </div>
  )
}