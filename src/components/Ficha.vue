<template>
  <div class="container">
    <div class="titleFirst">
      <h3>Programas</h3>
    </div>

    <hr class="divider" />

    <div class="q-pa-md q-gutter-sm">
      <q-btn class="btnA" label="Crear" icon="add_circle" color="green" @click="AbrirModal = true" />

      <div class="table-container">
        <q-table :rows="rows" :columns="columns" row-key="name">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-btn icon="edit" round color="blue" @click="Abrir(props.row)" />
              <q-btn icon="close" round color="red" @click="Activar(props.row._id)" v-if="props.row.Estado == 1" />
              <q-btn icon="check" round color="green" @click="Desactivar(props.row._id)" v-else />
            </q-td>
          </template>
          <template v-slot:body-cell-Estado1="props">
            <q-td :props="props">
              <p style="color: green" v-if="props.row.Estado == 1">Activo</p>
              <p style="color: red" v-else>Inactivo</p>
            </q-td>
          </template>
          <template v-slot:body-cell-Numero="props">
            <q-td :props="props">
              {{ props.pageIndex + 1 }}
            </q-td>
          </template>
        </q-table>
      </div>

      <q-dialog v-model="AbrirModal" persistent>
        <q-card style="min-width: 350px; margin-top: 0">
          <q-card-section>
            <div class="iconoAprendiz">
              <img src="https://cdn-icons-png.flaticon.com/512/5825/5825337.png" alt="">
            </div>
            <div class="text">
              {{ p == true ? "Editar Ficha" : "Agregar Ficha" }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <!-- <label for="codigo">Nombre</label> -->
            <q-input dense v-model="nombre" placeholder=" Nombre" autofocus color="green" @keyup.enter="prompt = false"
              />
            <br />

            <!-- <label for="codigo">codigo</label> -->
            <q-input dense v-model="codigo" placeholder="Codigo" autofocus color="green" @keyup.enter="prompt = false"
              />
            <br />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" @click="p = false" color="grey" v-close-popup />
            <q-btn flat label="Enviar" @click="CrearFicha()" color="green" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>


<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import { UseFichaStore } from "../Stores/fichas";

let inf = ref("");
let AbrirModal = ref(false);
let codigo = ref("")
let nombre = ref("")
let p = ref(false)
let id = ref("");

const useFicha = UseFichaStore()

const rows = ref([])
// ficha
onBeforeMount(() => {
  traer();
});

async function traer() {
  let res = await useFicha.listarFicha();
  rows.value = res.data;
} 

function limpiarCampos(){
  nombre.value = ""
  codigo.value = ""
}

async function CrearFicha() {
  console.log(p.value);
  // if (p.value == false) {
  //   // console.log(estoy editando.. ${editId.value})
  //   let res = await useFicha.crearFicha(codigo.value, nombre.value);
  //   if(!res){
  //       AbrirModal.value = true;
  //   }else{
  //     AbrirModal.value = false;
  //     limpiarCampos()
  //   }
  // } else {   
  //    let res = await useFicha.EditarFicha(id.value, nombre.value, codigo.value);
  //   if(!res){
  //       AbrirModal.value = true;
  //   }else{
  //     AbrirModal.value = false;
  //     limpiarCampos()
  //   }
  // }

  let res;
  if (p.value == false) {
    // Creando una nueva Ficha
    res = await useFicha.crearFicha(codigo.value, nombre.value);
  } else {
    // Editando una Ficha existente
    res = await useFicha.EditarFicha(id.value, nombre.value, codigo.value);
  }
  
  if (res && res.success) {  // Suponiendo que `res.success` sea verdadero si la operación fue exitosa
    AbrirModal.value = false; // Cierra el modal
    limpiarCampos(); // Limpia los campos
    p.value = false;
  } else {
    AbrirModal.value = true; // Mantiene el modal abierto si hubo un error
  }
  
  await traer(); // Refresca los datos
  // await traer();
}

function Abrir(row) {
  AbrirModal.value = true;
  p.value = true;
  codigo.value = row.Codigo;
  nombre.value = row.Nombre;
  id.value = row._id;
}

async function Activar(id) {
  console.log(id);
  try {
    inf = await axios.put(`http://localhost:4000/api/Ficha/Desactivar/${id}`);
    traer();
  } catch (error) {
    console.log(error);
  }
}
async function Desactivar(id) {
  console.log(id);
  try {
    inf = await axios.put(`http://localhost:4000/api/Ficha/Activar/${id}`);
    //   traer()
    // Actualizar la fila modificada directamente
    traer();
  } catch (error) {
    console.log(error);
  }
}

const columns = ref([
  { name: "Numero", align: "center", label: "N°", field: "Numero" },

  {
    name: "Codigo1",
    align: "center",
    label: "Codigo",
    field: "Codigo",
    sortable: true,
  },
  {
    name: "Nombre1",
    required: true,
    label: "Nombre del Programa",
    align: "center",
    field: "Nombre",
    sortable: true,
  },
  {
    name: "Codigo1",
    align: "center",
    label: "Numero de ficha",
    field: "Codigo",
    sortable: true,
  },
  { name: "Estado1", label: "Estado", field: "Estado", sortable: true },
  { name: "opciones", label: "Opciones", align: "center" },
]);
</script>

<style>
* {
  margin: 0%;
}

.container {
  width: 90%;
  margin: 0 auto;
}

.titleFirst {
  margin: 15px 15px;
  display: flex;
  justify-content: center;
  font-family: "Kanit", sans-serif
}

.divider {
  width: 100%;
  border: 2px solid rgb(53, 164, 81);
}

.table-container {
  width: 100%;
  margin-top: 20px;
}

.q-table {
  width: 100%;
  /* Asegura que la tabla ocupe el 100% del contenedor */
}

.q-btn {
  margin: 0 5px;
}

.q-dialog__backdrop {
    backdrop-filter: blur(5px); /* Ajusta el nivel de desenfoque */
    background-color: rgba(0, 0, 0, 0.5); /* Opcional: Ajusta la opacidad del fondo */
  }
</style>