<template>
  <div>
    <div>
      <input type="datetime-local" v-model="fechaInicial" name="fechaInicial" id="fechaInicial">
      <input type="datetime-local" v-model="fechaFinal" name="fechaFinal" id="fechaFinal">
      <q-btn push color="primary" @click="Buscar" label="Buscar" />
    </div>
    <div class="q-pa-md q-gutter-sm">
      <div class="table">
        <q-table title="Asistencia" :rows="rows" :columns="columns" row-key="name">
        </q-table>
      </div>
    </div>

    <div>
      <input type="text" v-model="Aprendiz" name="" id="">
      <input type="datetime-local" v-model="FechaHora" name="" id="">
      <button @click="guardar">Registrar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount} from 'vue';
import { UseBitacoraStore } from '../Stores/bitacoras';

let fechaInicial = ref('');
let fechaFinal = ref('');

// Registrar la hora de llegada
let Aprendiz = ref()
let FechaHora = ref()

const UseBitacora = UseBitacoraStore();
onBeforeMount(() => {
    Buscar()
})

const rows = ref([]);

async function Buscar() {
  try {
    let res = await UseBitacora.listarBitacora(fechaInicial.value, fechaFinal.value);
    console.log(res);
    rows.value = res.data.map((item, index) => ({
        ...item,
        numero: index + 1
    }))
  } catch (error) {
    console.error('Error al listar bitácoras:', error);
    // rows.value = []; // Asegúrate de que rows siempre sea un array
  }
}

async function guardar() {
  let res = await UseBitacora.registrarAprendiz(Aprendiz.value, FechaHora.value)
  await Buscar()
}
const columns = ref([
{name: 'Numero',required: true, label: 'N°', align: 'left', field: 'numero',sortable: true },  
  {name: 'nombreAprendiz',required: true, label: 'Aprendiz', align: 'left', field: 'nombreAprendiz',sortable: true },
  {name: 'telefonoAprendiz',required: true, label: 'Numero de Telefono', align: 'left', field: 'telefonoAprendiz',sortable: true },
  {name: 'emailAprendiz',required: true, label: 'Email', align: 'left', field: 'emailAprendiz',sortable: true },
  { name: 'nombreFicha', align: 'center', label: 'Programa de formación', field: 'nombreFicha', sortable: true },
  { name: 'FechaHora', align: 'center', label: 'Fecha y Hora', field: 'FechaHora', sortable: true }
]);
</script>

<style>
/* Estilos opcionales */
</style>