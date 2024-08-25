<template>
  <div class="container">
    <div class="titleFirst">
      <h3>Aprendices</h3>
    </div>

    <hr class="divider" />

    <div class="q-pa-md q-gutter-sm">
      <q-btn class="btnA" label="Crear" icon="add_circle" color="green" @click="AbrirModal = true" />
    </div>



    <div class="q-pa-md q-gutter-sm">
      <div class="table">
        <q-table title="Asistencia" :rows="rows" :columns="columns" row-key="name">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-btn icon="edit" round color="blue" @click="Abrir(props.row)" />
              <q-btn icon="close" round color="red" @click="Activar(props.row._id)" v-if="props.row.Estado == 1" />
              <q-btn icon="check" round color="green" @click="Desactivar(props.row._id)" v-else />
            </q-td>
          </template>
          <template v-slot:body-cell-Estado1="props">
            <q-td :props="props">
              <p style="color:green" v-if="props.row.Estado == 1">Activo</p>
              <p style="color:red" v-else>Inactivo</p>
            </q-td>
          </template>
          <template v-slot:body-cell-Numero="props">
            <q-td :props="props">
              {{ props.pageIndex + 1 }}
            </q-td>
          </template>
        </q-table>
      </div>
    </div>



    <q-dialog v-model="AbrirModal" persistent>
      <q-card style="min-width: 350px; margin: 0;">
        <q-card-section>
          <div class="iconoAprendiz">
            <img src="https://cdn-icons-png.flaticon.com/256/72/72648.png" alt="">
          </div>
           <div class="text" >
            {{ p == true ? "Editar Aprendiz" : "Agregar Aprendiz" }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="nombre" placeholder="Nombre" autofocus color="green" @keyup.enter="prompt = false" />
          <br>
          <q-input dense v-model="telefono" placeholder="Telefono" autofocus color="green" @keyup.enter="prompt = false" />
          <br>
          <q-input dense v-model="documento" placeholder="Documento" autofous color="green" @keyup.enter="prompt = false" /> <br>
          <q-input dense v-model="email" placeholder="Email" autofocus color="green" @keyup.enter="prompt = false" />
          <br>
          <!-- <q-input dense v-model="ficha" placeholder="Id_Ficha" autofocus @keyup.enter="prompt = false" />
          <br> -->

          <q-select dense v-model="ficha" :options="filterOptions" label="Id_Ficha" color="green" emit-value map-options
            option-label="_id" option-value="id" use-input @filter="filterFunction" class="custom-select" use-chips />
        </q-card-section>


        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" @click="p = false" color="grey" v-close-popup />
          <q-btn flat label="Guardar" @click="agregarAprendiz(), (p = false)" color="green"  />
          <!-- <q-btn :loading="aprendiz" color="secondary" @click="agregarAprendiz(),(p=false)" label="Button"   /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import { UseAprendizStore } from '../Stores/aprendices';

let nombre = ref('')
let telefono = ref('')
let documento = ref('')
let email = ref('')
let ficha = ref('')
let inf = ref('')
let AbrirModal = ref(false)
let p = ref(false)
let id = ref('')


const useAprendiz = UseAprendizStore()


const rows = ref([
]);
const options = ref(null);

onBeforeMount(() => {
  traer();
});

async function traer() {
  let res = await useAprendiz.listarAprediz()
  rows.value = res.data
}


function limpiarCampos() {
  nombre.value = '';
  telefono.value = '';
  documento.value = '';
  email.value = '';
  ficha.value = '';
}

async function agregarAprendiz() {
  if (p.value == false) {
 let res = await useAprendiz.registrarAprendiz(nombre.value, telefono.value, documento.value, email.value, ficha.value)
 if(!res){
  AbrirModal.value = true;
 }else{
   AbrirModal.value = false; 
  limpiarCampos()
 }
 
  } else {
    let res = await useAprendiz.editarAprendiz(id.value, nombre.value, telefono.value, documento.value, email.value, ficha.value)
    if(!res){
  AbrirModal.value = true;
 }else{
   AbrirModal.value = false; 
  limpiarCampos()
 }
  }
  await traer()
}


async function fetchData() {
  const response = await fetch('http://localhost:4000/api/Ficha/ListarTodo')
  options.value = await response.json()
}

fetchData()

const filterOptions = ref([])

async function filterFunction(val, update) {
  if (val === '') {
    console.log(val);

    update(() => {
      filterOptions.value = options.value;

    });
  }

  update(() => {
    const needle = val.toLowerCase()
    filterOptions.value = options.value.filter(option => {
      return option._id.toLowerCase().includes(needle)
    })
  })
}



function Abrir(row) {
  AbrirModal.value = true;
  p.value = true;
  nombre.value = row.Nombre;
  telefono.value = row.Telefono;
  documento.value = row.Documento;
  email.value = row.Email;
  ficha.value = row.Id_Ficha;
  id.value = row._id;
}




async function Activar(id) {
  console.log(id);
  try {
    inf = await axios.put(`http://localhost:4000/api/Aprendiz/Desactivar/${id}`)
    traer();
  } catch (error) {
    console.log(error);
  }
}
async function Desactivar(id) {
  console.log(id);
  try {
    inf = await axios.put(`http://localhost:4000/api/Aprendiz/Activar/${id}`)
    traer();
  } catch (error) {
    console.log(error);
  }
}

const columns = ref([
  { name: 'Numero', align: 'center', label: 'N°', field: 'Numero', sortable: true },
  { name: 'Nombre', required: true, label: 'Aprendiz', align: 'left', field: "Nombre", sortable: true },
  { name: 'Documento1', align: 'center', label: 'Documento', field: 'Documento', sortable: true },
  { name: 'Telefono', align: 'center', label: 'Teléfono', field: 'Telefono', sortable: true },
  { name: 'Email', align: 'center', label: 'Email', field: 'Email', sortable: true },
  { name: 'Estado1', label: 'Estado', field: 'Estado1', sortable: true },
  { name: 'opciones', label: 'Opciones' },
]);
</script>



<style>

.iconoAprendiz {
  width: 40%;
  margin: 0 auto;
  margin-bottom: 5px;
  /* border:4px solid green ; */
  /* border-radius: 100%; */
  /* padding: 5%; */
  /* background-color: white; */
}

.iconoAprendiz img {
  width: 100%;
}
.tituloAprendiz, .text {
  font-weight: 900;
  font-size:24px;
  color: darkgreen;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
text-align: center;
}
</style>