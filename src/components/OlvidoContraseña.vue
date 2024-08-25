<template>
    <div>
        <q-layout view="hHh lpR fFf">
            <q-header elevated class="bg-darkgreen text-white" style="background-color: green;" height-hint="98">
                <q-toolbar>
                    <q-toolbar-title>
                        REPFORA
                    </q-toolbar-title>
                    <q-btn to="/Login" icon="exit_to_app" label="Salir" @click="salir" />
                </q-toolbar>

            </q-header>

            <q-page-container>
                <div class="VerificacionEmail">
                <div class="q-pa-md q-gutter-sm">
                        <q-card style="min-width: 450px; margin-top:5%;">
                            <q-card-section>
                                <div class="iconContraseñaOlvido">
                                    <img src="https://cdn-icons-png.flaticon.com/512/6357/6357126.png" alt="">
                                </div>
                                <div class="text"><p>Por favor digite el correo electrónico con el que se ha registrado anteriormente,
                                    allí le enviaremos todos los pasos para recuperar su contraseña.</p></div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                <q-input dense v-model="address" autofocus color="green" @keyup.enter="prompt = false" />
                            </q-card-section>

                            <q-card-actions align="right" class="text-primary">
                                <q-btn unelevated label="Enviar" @click="EnviarCorreo()" color="green" />
                            </q-card-actions>
                        </q-card>
                </div>
            </div>
            </q-page-container>

        </q-layout>
    </div>


</template>


<script setup>

import { ref } from 'vue'
const alert = ref(false)
const confirm = ref(false)
const prompt = ref(false)

const address = ref('')

</script>

<style>
.VerificacionEmail{
  display: flex;
  justify-content: center;
}

.text p{
    font-size: 20px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.iconContraseñaOlvido img{
    width: 40%;
    display: flex;
    margin: 0 auto;
    padding: 4%;

}
.iconContraseñaOlvido{

}

</style>
