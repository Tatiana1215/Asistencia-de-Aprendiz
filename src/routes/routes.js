
import Home from "../components/Home.vue"
import Login from "../components/Login.vue"
import Bitacora from "../components/Bitacora.vue"
import Aprendiz from "../components/Apredice.vue"
import Ficha from "../components/Ficha.vue"
import Usuario from "../components/Usuario.vue"
import InicioH from "../components/InicioH.vue"
import OlvidoContrasena from "../components/OlvidoContraseña.vue"


import { createRouter, createWebHashHistory } from "vue-router"


const routes = [
    {
        path: "/Home", component: Home, children: [
            { path: "/InicioH", component: InicioH },
            { path: "/Bitacora", component: Bitacora },
            { path: "/Aprendiz", component: Aprendiz },
            { path: "/Ficha", component: Ficha },
            {path:"/Usuario", component: Usuario},   
                 
        ]
    },
    {path:"/Login", component:Login},
    {path:"/OlvidoContrasena", component: OlvidoContrasena},
    {path:"/", redirect: "/Login"}, 
 
   

]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})