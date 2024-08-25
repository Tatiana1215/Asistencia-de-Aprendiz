import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { UseUsuarioStore } from "./usuario.js";


export const UseAprendizStore = defineStore("aprendiz", () => {
    let aprendiz = ref(false)
    const UseUsuario= UseUsuarioStore()

    const listarAprediz = async () => {
        try {
            let res = await axios.get('http://localhost:4000/api/Aprendiz/ListarTodo', {
                headers:{
                    "x-token": UseUsuario.xtoken
                }
        })
            console.log(res);
            return res
        } catch (error) {
            console.log(error);
            return error
        }

    }

    const registrarAprendiz = async (nombre, telefono, documento, email, ficha) => {
        try {
            let inf = await axios.post('http://localhost:4000/api/Aprendiz/Insertar', {
                Nombre: nombre,
                Telefono: telefono,
                Documento: documento,
                Email: email,
                Id_Ficha: ficha
            },{
                headers:{
                   "x-token": UseUsuario.xtoken
                }
            })
            // console.log('Datos enviados:', { nombre, telefono, documento, email, ficha });
            Notify.create({
                color: "positive",
                message: "Registro Exitoso",
                icon: "check_circle",
                timeout: 2500,
            })
            console.log('Registro exitoso', inf)
            return inf

        } catch (error) {
            console.log('No se realizo el registro', error)
            Notify.create({
                color: "negative",
                message: error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500,
            });

        } finally {
            aprendiz.value = false
        }
    }

    const editarAprendiz = async (id, nombre, telefono, documento, email, ficha) => {
        try {
            let inf = await axios.put(`http://localhost:4000/api/Aprendiz/Actualizar/${id}`, {
                Nombre: nombre,
                Telefono: telefono,
                Documento: documento,
                Email: email,
                Id_Ficha: ficha
            },{
                headers:{
             "xtoken": UseUsuario.xtoken
                }
            })

            Notify.create({
                color: "positive",
                message: "Datos Actualizados",
                icon: "check_circle",
                timeout: 2500,
            })
            console.log(inf);
            return inf
        } catch (error) {

            // return error
            Notify.create({
                color: "negative",
                message: error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500,
            })
            return error
        }
    }


    return {
        registrarAprendiz, listarAprediz, editarAprendiz,
    }
})