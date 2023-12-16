import DashboardIcon from "@mui/icons-material/Dashboard";

export const menu = [
  {
    id: 1,
    name: "Dashboard",
    route: "/dashboard",
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
