import { useSelector } from 'react-redux';
import WrongRoute from './WrongRoute';

const ProtectedRoute = ({ children }) => {
  const isVerified = useSelector((state) => state.user.userInfo?.verified);
  if (!isVerified) {
    return (
      <div>
        <WrongRoute />
      </div>
    );
  }

  return children;
};
export default ProtectedRoute;
