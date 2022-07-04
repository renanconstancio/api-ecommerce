import SideNavigation from "./components/SideNavigation";
// import Login from "./pages/Login";
import "./style/app.scss";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="messages" element={<DashboardMessages />} />
        <Route path="tasks" element={<DashboardTasks />} />
      </Route>
    </Routes>
  );

  // return <SideNavigation />;
  // // return (
  // //   <div className="app">
  // //     <nav></nav>
  // //     <aside>s</aside>
  // //   </div>
  // // );
}
