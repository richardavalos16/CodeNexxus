<template>
    <v-form v-model="validado" ref="form" lazy-validation>
    <v-text-field
        label="Nombre: "
        v-model="nombre"
        :rules="reglasNombre"
        required
    ></v-text-field>
    <v-text-field
        label="Descripción:"
        v-model="descripcion"
        multi-line
        required
        :rules="reglasDescripcion"
    ></v-text-field>
    <v-text-field
        label="Desarrolladora:"
        v-model="desarrolladora"
        :items="desarrolladora"
        required
        :rules="reglasDesarrolladora"
    ></v-text-field>
    <v-text-field
        label="Género:"
        v-model="genero"
        required
        :rules="reglasGenero"
    ></v-text-field>
    <v-btn @click="enviar" :disabled="!validado">
        Enviar
    </v-btn>
    <v-btn @click="limpiar">
        Limpiar
    </v-btn>
    </v-form>
</template>

<script>
import axios from 'axios';

export default{
  data: () => ({
    validado: true,
    nombre: '',
    reglasNombre: [
      v => !!v || 'Se Requiere el Nombre del Videojuego.',
    ],
    descripcion: '',
    reglasDescripcion: [
      v => !!v || 'Se Requiere la Descripción del Videojuego.',
    ],
    genero: '',
    reglasGenero: [
      v => !!v || 'Se Requiere el Genero del Videojuego.',
      // v => (v && v.lenght <= 80) || 'El género debe ser menor o igual a 80',
    ],
    desarrolladora: '',
    reglasDesarrolladora: [
      v => !!v || 'Se Requiere la Desarrolladora del Videojuego.',
    ],
  }),
  methods: {
    enviar() {
      if (this.$refs.form.validate()) {
      // REALIZAR ACCIONES
        return axios({
          method: 'post',
          data: {
            nombre: this.nombre,
            descripcion: this.descripcion,
            genero: this.genero,
            desarrolladora: this.desarrolladora,
          },
          url: '/videojuego',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            // SWAL PARA MOSTRAR MENSAJES
            this.$swal(
              'Magnífico',
              'El Videojuego Ha Sido Agregado de Forma Exitosa',
              'success',
            );
            this.$router.push({ name: 'Inicio' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Error',
              'El Videojuego No Ha Sido Agregado, Verifique con los Administradores.',
            );
          });
      }
      return true;
    },
    limpiar() {
      this.$refs.form.reset();
    },
  },
};
</script>
