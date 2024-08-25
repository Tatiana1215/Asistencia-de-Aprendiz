import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"
import { Notify } from "quasar"
import { UseUsuarioStore } from "./usuario"

export const UseFichaStore = defineStore("ficha", () => {

    const UseUsuario = UseUsuarioStore()

    const listarFicha = async () => {
        try {
            let inf = await axios.get("http://localhost:4000/api/Ficha/ListarTodo",{
                headers:{
                "x-token": UseUsuario.xtoken,
                }
            })
            console.log(inf)
            return inf
        } catch (error) {
            console.log(error);
            return error
        }
    }
    const crearFicha = async (codigo, nombre) => {
        try {
            let inf = await axios.post("http://localhost:4000/api/Ficha/crear", {
                Codigo: codigo,
                Nombre: nombre
            },{
                headers:{
                    "xtoken": UseUsuario.xtoken
                }
            })
            Notify.create({
                color: "positive",
                message: "Registro exitoso",
                icon: "check_circle",
                timeout: 2500,
            });
            console.log(inf)
            return inf
        } catch (error) {
            console.log(error);
            Notify.create({
                color: "negative",
                message: error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500,
            });

            return error
        }
    }
    const EditarFicha = async (id,nombre,codigo) => {
        try {
            let inf = await axios.put(`http://localhost:4000/api/Ficha/Actualizar/${id}`,{
                Nombre:nombre,
                Codigo:codigo,
            },{
                headers:{
                    "xtoken": UseUsuario.xtoken
                }
            })
            Notify.create({
                color: "positive",
                message: "Actualizacón Exitosa",
                icon: "check_circle",
                timeout: 2500,
            });
            return inf
        } catch (error) {
            console.log(error)
            Notify.create({
                color:"negative",
                message: error.response.data.errors[0].msg,
                icon:"error",
                timeout: 2500
            })
        }

    }

    return {
    listarFicha, crearFicha, EditarFicha
    }
})
