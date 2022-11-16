import Index from "views/Index.js";
import Profile from "views/admin/Profile.js";
// import Maps from "views/admin/Maps.js";
import Register from "views/admin/Register.js";
import Login from "views/auth/Login.js";
import Tables from "views/admin/Tables.js";
import Icons from "views/admin/Icons.js";
import Paciente from "views/admin/Paciente";
import Medico from "views/admin/Medico";
import Proveedores from "views/admin/Proveedores";
import LaboratoriosReferencia from "views/admin/LaboratoriosReferencia";
import Empleado from "views/admin/Empleado";
import Puesto from "views/admin/Puesto";
import Planilla from "views/admin/Planilla";
import ControlCalidad from "views/lab/ControlCalidad";
import Examenes from "views/lab/Examenes";
import Prueba from "views/lab/Prueba";
import Insumos from "views/bod/Insumos";
import Inventario from "views/bod/Inventario";
import Movimientos from "views/caja/Movimientos";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/paciente",
    name: "Paciente",
    icon: "ni ni-circle-08 text-red",
    component: Paciente,
    layout: "/admin"
  },
  {
    path: "/medico",
    name: "Medico",
    icon: "fa fa-id-card text-red",
    component: Medico,
    layout: "/admin"
  },
  {
    path: "/proveedores",
    name: "Proveedores",
    icon: "fa fa-suitcase text-red",
    component: Proveedores,
    layout: "/admin"
  },
  {
    path: "/laboratoriosReferencia",
    name: "Laboratorios Referencia",
    icon: "ni ni-single-02 text-red",
    component: LaboratoriosReferencia,
    layout: "/admin"
  },
  {
    path: "/empleado",
    name: "Empleado",
    icon: "fa fa-users text-info",
    component: Empleado,
    layout: "/admin"
  },
  {
    path: "/puesto",
    name: "Puesto",
    icon: "fa fa-child text-info",
    component: Puesto,
    layout: "/admin"
  },
  {
    path: "/planilla",
    name: "Planilla",
    icon: "fa fa-cubes text-info",
    component: Planilla,
    layout: "/admin"
  },
  // {
  //   path: "/controlCalidad",
  //   name: "ControlCalidad",
  //   icon: "fa fa-shopping-basket text-info",
  //   component: Productos,
  //   layout: "/admin"
  // },
  {
    path: "/examenes",
    name: "Examenes",
    icon: "fa fa-shopping-cart text-success",
    component: Examenes,
    layout: "/admin"
  },
  {
    path: "/prueba",
    name: "Prueba",
    icon: "fa fa-shopping-bag text-success",
    component: Prueba,
    layout: "/admin"
  },
  {
    path: "/insumos",
    name: "Insumos",
    icon: "fa fa-shopping-bag text-success",
    component: Insumos,
    layout: "/admin"
  },

  {
    path: "/inventario",
    name: "Inventario",
    icon: "fa fa-shopping-bag text-success",
    component: Inventario,
    layout: "/admin"
  },

  {
    path: "/movimientos",
    name: "Movimientos",
    icon: "fa fa-shopping-bag text-success",
    component: Movimientos,
    layout: "/admin"
  },



  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  }
];
export default routes;
