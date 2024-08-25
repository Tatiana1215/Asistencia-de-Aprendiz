import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"
import { useQuasar, Notify } from "quasar"

export const UseUsuarioStore = defineStore("Usuario", () => {

    let xtoken = ref('')
    let usuario = ref('')

    const Login = async (email, password) => {
        try {
            const r = await axios.post('http://localhost:4000/api/Usuario/login', {
                Email: email,
                Password: password
            });

            xtoken.value = r.data.token
            usuario.value = r.data
            console.log(r);
            console.log(xtoken.value);
            
            if (r) {
                Notify.create({
                    color: "positive",
                    message: "Inicio de sesión exitoso",
                    icon: "check_circle",
                    timeout: 2500,
                });
            }

            return r.data;
        } catch (error) {
            console.log(error);
            Notify.create({
                color: "negative",
                message: error.response.data.msg || error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500,
            });
        }
    }
    const registrar = async (nombre1, email1, password1) => {
        try {

            const usuarioRegistro = await axios.post('http://localhost:4000/api/Usuario/insertar', {
                Nombre: nombre1,
                Email: email1,
                Password: password1
            })

            Notify.create({
                color: "positive",
                message: "Registro Exitoso",
                icon: "check_circle",
                timeout: 2500,
            })


            console.log(usuarioRegistro)
            return usuarioRegistro

        } catch (error) {
            console.log(error)

            Notify.create({
                color: "negative",
                message: error.response.data.errors[0].msg,
                icon: "error",
                timeout: 2500,
            })

        }
    }

    return {
        Login, registrar, xtoken
    }
});
