<template>
  <v-layout row wrap>
    <!-- eslint-disable-next-line -->
    <v-flex xs4 v-for="videojuego in videojuegos" :key="videojuego._id">
      <v-card>
      <v-card-title primary-title>
        <div>
          <div class="headline"> <!-- Doble llave para imprimir-->
          <v-btn text v-bind:to="`/videojuego/${videojuego._id}`">
            {{videojuego.nombre}}
          </v-btn>
          </div>
          <span> {{videojuego.desarrolladora}} &middot;  {{videojuego.genero}}</span>
        </div>
        </v-card-title>
        <v-card-text>
          {{videojuego.descripcion}}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      videojuegos: [],
    };
  },
  mounted() {
    this.obtenerVideojuegos();
  },
  methods: {
    async obtenerVideojuegos() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: '/videojuego',
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((respuesta) => {
          this.videojuegos = respuesta.data.videojuegos;
          this.usuario_actual = respuesta.data.usuario_actual;
        })
        .catch(() => {
        });
    },
  },
};
</script>
