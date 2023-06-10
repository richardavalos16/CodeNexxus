<template>
    <v-layout row wrap> <!--VISUALIZACION DE VIDEOJUEGOS, LO ASIGNA AL SIG RENGLON-->
        <v-flex xs4>
            <v-card>
                <v-card-title primary title>
                    <div>
                        <div class="headline"> {{videojuego.nombre}}</div>
                        <span class="grey--text"> {{videojuego.desarrolladora}} &middot; {{
                            videojuego.genero}} </span>
                    </div>
                </v-card-title>
                  <v-btn class="card-title"  @click="calificar">
                  Calificar Videojuego {{videojuego.nombre}}</v-btn>
                <v-card-text>
                    {{videojuego.descripcion}}
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import StarRating from 'vue-star-rating';

const wrapper = document.createElement('div');
const estado = {
  nota: 0,
};

const ComponenteEstrella = Vue.extend({
  data() {
    return { calif: 0 };
  },
  watch: {
    calif(nuevoValor) { estado.nota = nuevoValor; },
  },
  template: `
    <div class="rating">
        ¡Hola! ¿Qué te ha parecido este Videojuego?
        <star-rating v-model="calif" :show-rating="false"></star-rating>
    </div>`,
  components: { 'star-rating': StarRating },
});

const componente = new ComponenteEstrella().$mount(wrapper);

export default {
  name: 'Videojuego',
  data() {
    return {
      videojuego: [],
    };
  },
  mounted() {
    this.obtenerVideojuego();
  },
  methods: {
    async calificar() {
      this.$swal({
        content: componente.$el,
        buttons: {
          confirm: {
            value: 0,
          },
        },
      })
        .then(() => {
          const videojuegoId = this.$route.params.id;
          return axios({
            method: 'post',
            data: {
              calif: estado.nota,
            },
            url: `/videojuego/calificar/${videojuegoId}`,
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(() => {
              this.$swal(`¡Muchas Gracias por Darnos tu Opinión! ${estado.nota}`, 'success');
            })
            .catch((error) => {
              const mensaje = error.response.data.message;
              this.$swal('¡Error!', `${mensaje}`, 'error');
            });
        });
    },
    async obtenerVideojuego() {
      return axios({
        method: 'get',
        url: `/videojuego/${this.$route.params.id}`,
      })
        .then((respuesta) => {
          this.videojuego = respuesta.data;
        })
        .catch(() => {
        });
    },
  },
};
</script>
