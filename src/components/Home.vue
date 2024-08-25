<template>
    <div id="home">
        <q-layout view="hHh lpR fFf">
            <q-header elevated class="bg-darkgreen text-white" style="background-color: green;" height-hint="98">
                <q-toolbar>
                    <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                    <q-toolbar-title>
                        REPFORA
                    </q-toolbar-title>
                    <q-btn to="/Login" icon="exit_to_app" label="Salir" @click="salir" />
                </q-toolbar>

            </q-header>

            <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>

                <div class="cuadroDespliegue">
                    <div class="logoSena">
                        <img src="https://senasofiaplus.xyz/wp-content/uploads/2023/10/logo-del-sena-01.png" alt="">
                        <h6>{{ nombreAdministrador }}</h6>
                        <P>senapruebas123@gmail.com</P>
                    </div>
                    <div class="Botones">
                    <q-btn id="boton" to="/InicioH" rounded color="green" label="Inicio" /> <br>
                    <q-btn id="boton" to="/Bitacora" rounded color="green" label="Bitacora" /> <br>
                    <q-btn id="boton" to="/Ficha" rounded color="green" label="Ficha" /> <br>
                    <q-btn id="boton" to="/Aprendiz" rounded color="green" label="Aprendiz" /> <br>
                    <q-btn id="boton" to="/Usuario" rounded color="green" label="Usuario" /> <br>
               </div>
                </div>
            </q-drawer>

            <q-page-container>
                <router-view />
            </q-page-container>

        </q-layout>


    </div>
</template>

<script setup>
import { ref } from 'vue';
import { UseUsuarioStore } from '../Stores/usuario';

const leftDrawerOpen = ref(false)
const nombreAdministrador = ref("")



function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}


</script>


<style>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.InicioSecion {
    display: flex;
    justify-content: center;
    width: 100%;
}
.cuadroDespliegue{
    display: grid;
    justify-items: center;
}

.Botones{
    display: grid;
    justify-items: center;
    width: 100%;
}

#boton {
    width: 80%;
}
.q-card {
    width: 350px;
    margin-top: 250px;
}

.dialogRegistrar {
    margin-top: 0;
}
.logoSena{
    display: grid;
    justify-items: center;
}
.logoSena img{
width: 50%;
margin-bottom: 10px;/* height: 2}00px; */
margin-top: 30px;
}
.logoSena h6{
font-weight: 900;
}

</style>