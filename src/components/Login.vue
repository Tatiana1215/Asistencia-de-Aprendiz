<template>
  <div id="login">


    <div class="InicioSecion">
      <!-- <div class="q-pa-md "> -->
      <q-card style="min-width: 350px;  ">
        <q-card-section>
          <div class="iconoAprendiz">
            <img src="https://cdn-icons-png.flaticon.com/512/73/73199.png" alt="">
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="email" placeholder="Email" autofocus color="green"
            @keyup.enter="inicioSecion = false" /> <br>
          <q-input dense v-model="password" placeholder="Password" autofocus color="green"
            @keyup.enter="inicioSecion = false" />
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <q-btn unelevated label="Iniciar Seción" color="green" @click="secionIniciada" />
          <div id="registro">
            <div class="q-pa-md">
              <q-btn class="registrar" v-for="filter in backdropFilterList" :key="filter.label" color="green"
                :label="filter.label" no-caps @click="filter.onClick" />

              <q-dialog v-model="dialog" :backdrop-filter="backdropFilter">
                <q-card class="dialogRegistrar">
                  <q-card-section>
                    <div class="iconoAprendiz">
                      <img src="https://cdn-icons-png.flaticon.com/512/72/72648.png" alt="">
                    </div>
                  </q-card-section>

                  <q-card-section>
                    <q-input dense v-model="nombre1" placeholder="Nombre" autofocus color="green"
                      @keyup.enter="inicioSecion = false" />
                    <br>
                    <q-input dense v-model="email1" placeholder="Email" autofocus color="green"
                      @keyup.enter="inicioSecion = false" /> <br>
                    <q-input dense v-model="password1" placeholder="Password" autofocus color="green"
                      @keyup.enter="inicioSecion = false" />
                    <br>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Registrar" color="green" @click="registrar" />
                    <q-btn flat label="Close" color="grey" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </div>

      <router-link to="/OlvidoContrasena"> <a href="/OlvidoContrasena" class="contraseñaRecuperar">Olvidé mi contraseña</a></router-link>
        </q-card-actions>
      </q-card>
    </div>
  </div>

  <!-- </div> -->
</template>


<script setup>
import { ref } from 'vue';
import { UseUsuarioStore } from '../Stores/usuario';
import { useRouter } from 'vue-router';

let inicioSecion = ref(false)
let respuesta = ref('')
let Usuario = ref(false)
let router = useRouter()

// Usuario
let email = ref('')
let password = ref('')
let inicio = ref(true)

// Rrgistro
let nombre1 = ref('')
let email1 = ref('')
let password1 = ref('')


const useUsuario = UseUsuarioStore()

const list = [
  'REGISTRAR'
]

const dialog = ref(false)
const backdropFilter = ref(null)

const backdropFilterList = list.map(filter => ({
  label: filter,
  onClick: () => {
    backdropFilter.value = filter
    dialog.value = true
  }
}))

//Registro de usuario
async function registrar() {
  let registroUsuario = await useUsuario.registrar(nombre1.value, email1.value, password1.value)
  if (registroUsuario) {
    nombre1.value = "",
      email1.value = ""
    password1.value = ""
  }
}


async function secionIniciada() {
  respuesta = await useUsuario.Login(email.value, password.value)
  if (respuesta) {
    Usuario.value = true
    inicio.value = false
    router.push('/Home');
  }
}

</script>


<style>
#login {
  justify-content: center;
  width: 100%;
  background-image: url('https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/04/03/660d5b9fc3744.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
}

.InicioSecion {
  display: grid;
  width: 100%;
  justify-content: center;
  /* Centra horizontalmente */
  align-items: center;
  /* Centra verticalmente */
}

.registrar {
  width: 100%;
}

.contraseñaRecuperar {
  color: #008000;
}
</style>