import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { useQuasar, Notify } from "quasar";
import { UseUsuarioStore } from "./usuario";


export const UseBitacoraStore = defineStore("bitacora", () => {

    const UseUsuario = UseUsuarioStore()

    
    
    const listarBitacora = async (fechaInicial, fechaFinal) => {
        try {
            console.log(UseUsuario);
            console.log(UseUsuario.value);
            let res = await axios.get('http://localhost:4000/api/Bitacora/ListarBitacoras', {
                params: {
                    FechaInicial: fechaInicial,
                    FechaFinal: fechaFinal
                },
            headers: {
                "xtoken": UseUsuario.xtoken
            }
        });
            Notify.create({
                color: "positive",
                message: "Datos entre estas fechas",
                icon: "check_circle",
                timeout: 2500,
            });
            console.log(res)
            return res
        } catch (error) {
            console.log('No hay biatacoras', error)
            return error
        }
    }

    const registrarAprendiz = async (Aprendiz, fechaHora) => {
        try {
            let res = await axios.post('http://localhost:4000/api/Bitacora/Insertar', {
                Id_Aprendiz: Aprendiz,
                FechaHora: fechaHora
            }, {
                headers: {
                    "xtoken": UseUsuario.xtoken
                }
            }
            )
            console.log(res)
            return res
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


    return {
        listarBitacora, registrarAprendiz
    }
})


