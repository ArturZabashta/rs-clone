import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setCurrentPage } from '../../store/uiSlice';

interface PrivateRouteProps {
  children: JSX.Element;
  route: string;
}

// eslint-disable-next-line react/prop-types
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, route }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (isLogin) {
      dispatch(setCurrentPage(route));
    }
  }, [isLogin, route]);

  return <>{isLogin ? <>{children}</> : <Navigate to="/" />}</>;
};

export default PrivateRoute;
