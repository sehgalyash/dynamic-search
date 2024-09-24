import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProjectsPage from "./pages/projects-page";

type RouteType = {
  route: string; // eg, route: projects
  component: React.ReactNode; // eg, component: <ProjectsPage />
};

const ROUTES: RouteType[] = [
  { route: "projects", component: <ProjectsPage /> },
];

const App = () => {
  return (
    <Router>
      <Routes>
        {ROUTES.map(({ route, component }, index) => {
          return <Route key={index} path={`/${route}`} element={component} />;
        })}
      </Routes>
    </Router>
  );
};

export default App;
