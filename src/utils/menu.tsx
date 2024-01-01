import DashboardIcon from "@mui/icons-material/Dashboard";

export const menu = [
  {
    id: 1,
    name: "Dashboard",
    route: "/dashboard",
  },
  {
    id: 2,
    name: "Raport",
    route: "/raport",
  },
];

export const getMenuIcon = (name: string) => {
  switch (name) {
    case "Dashboard":
      return <DashboardIcon />;
    default:
      return null;
  }
};
