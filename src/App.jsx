import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { pageList } from "./permissions/PageList";

import Login from "./modules/auth/views/Login";
import DefaultLayout from "./components/layout/DefaultLayout";
import { getToken } from "./service/AuthMethods";

function App() {
  const token = getToken();

  const NotFound = () => {
    return (<div className="text-center"><b>ERROR</b> page not found:- 404</div>)
  }

  const PrivateRoute = ({ Component }) => {
    return token ? <Component /> : <Navigate to="/login" />;
  };

  const route = React.useMemo(() => {
    return pageList.map((item, index) => {
      const Component = React.lazy(() => import(/* @vite-ignore */`./modules/${item.moduleName}/views/${item.viewName}`));
      return <Route key={index} path={item.path} element={
        <React.Suspense fallback={<>...Loading</>}>
          <PrivateRoute Component={Component} />
        </React.Suspense>
      } />
    })
  }, [window.location?.pathname]);


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<DefaultLayout />}>
            {route}
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App;
