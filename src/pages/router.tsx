import { ReactNode } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { STORAGE_CURRENT_USER } from '../services/constants';
import { Episode } from './Episode';

import { Login } from './Login';
import { Register } from './Register';
import { Season } from './Season';
import { Series } from './Series';

interface IProtectRoute {
  children?: ReactNode;
  redirectPath?: string;
}

const ProtectedRoute = ({
  redirectPath = '/',
  children,
}: IProtectRoute): JSX.Element => {
  const getLoggedInfo = localStorage.getItem(STORAGE_CURRENT_USER)!;

  if (getLoggedInfo === null || !JSON.parse(getLoggedInfo).isLogged) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/series" element={<Series />} />
        <Route path="/series/:season" element={<Season />} />
        <Route path="/episode/:id" element={<Episode />} />
      </Route>
    </Routes>
  );
};
