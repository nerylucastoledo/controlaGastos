import { IoCloseOutline } from "react-icons/io5";


import "./Toast.scss"

interface IProps {
  message: string;
  error: boolean
}

export const Toast = ({ message, error }: IProps) => {
  return (
    <div style={{ backgroundColor: error ? "#B22222" : "#006400"}} className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body">
          {message}
        </div>
        <button type="button" className="" data-bs-dismiss="toast" aria-label="Close">
          <IoCloseOutline size={24} color="#fff"/>
        </button>
      </div>
    </div>
  )
}

export default Toast