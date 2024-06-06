import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const cookieString = document.cookie;
  const expirationCookie = new Date(cookieString.split('; ')[1]);

  // Verifica se o cookie esta valido
  if (expirationCookie && expirationCookie > new Date()) {
    return children;
  }

  return <Navigate to="/login" replace />
}

export default ProtectedRoute