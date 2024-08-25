<template>
    <div>
        <div class="q-pa-md">
            <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" >
        <template v-slot:body-cell-Opciones="props">
            <q-td :props="props">
            <q-btn icon="edit" round color="blue" @click="Abrir(props.row)" />
            <q-btn icon="close" round color="blue" @click="Activar(props.row._id)" />
            <q-btn icon="check" round color="blue" @click="Desactivar(props.row._id)" />
            <q-btn icon="delete" round color="blue" @click="Eliminar(props.row._id)" />
       </q-td>
        </template>

        <template v-slot:body-cell-Estado="props">
            <q-td :props="props">
                <p style="color: green;" v-if="props.row.Estado == 1 ">Activo</p>
                <p style="color: red;" v-if="props.row.Estado == 0">Inactivo</p>
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
</template>


<script setup>
import { ref, onBeforeMount} from 'vue';
import axios from 'axios';
import { UseUsuarioStore } from '../Stores/usuario';


let res = ref('')
let id = ref('')
const UseUsuario = UseUsuarioStore()

onBeforeMount(() => {
  traer();
});

async function  traer() {
  res = await UseUsuario.listarUsuarios()
 rows.value=res.data
}

async function Abrir() {

}

const rows = ref([])
const columns = ref([
{ name: 'Numero', align: 'center', label: 'N°', field: 'Numero', sortable: true },
  { name: 'Nombre', align: 'center', label: 'Usuario', field: 'Nombre', sortable: true },
  { name: 'Email', label: 'Email', field: 'Email', sortable: true },
  { name: 'Estado', label: 'Estado', field: 'Estado', sortable: true },
  { name: 'Opciones', label: 'Opciones' },
])

async function Activar(id) {
    console.log(id);
    try {
          let res = await axios.put(`http://localhost:4000/api/Usuario/Activar/${id}`, {
                headers: {
                    "x-token": UseUsuario.xtoken
                }
            })

    await traer()
    } catch (error) {
        console.log(error);
        
    }
  
}

async function Desactivar(id){
    console.log(id)
    try {
      let res = await axios.put(`http://localhost:4000/api/Usuario/Desactivar/${id}`,{
                headers:{
                    "x-token":UseUsuario.xtoken
                }
            })
    await traer()   
    } catch (error) {
        console.log(error.message);
        
        
    }
   
}

async function Eliminar(id) {
    try {
        let res = await axios.delete(`http://localhost:4000/api/Usuario/Eliminar/${id}`,{
            headers:{
                "x-token": UseUsuario.xtoken
            }
        })

        await traer()
    } catch (error) {
        console.log(error);
        
    }
}



</script>