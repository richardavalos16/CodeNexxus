<template>
    <v-form v-model="valido" ref="formulario" lazy-validation>
        <v-text-field
         label="Nombre:"
         v-model="nombre"
         required
        ></v-text-field>
        <v-text-field
         label="Email:"
         v-model="email"
         :rules="reglasEmail"
         required
        ></v-text-field>
        <v-text-field
         label="Contraseña:"
         v-model="contrasenha"
         required
         type="password"
        ></v-text-field>
        <v-text-field
         label="Confirmar Contraseña:"
         v-model="confirmar_contrasenha"
         type="password"
        ></v-text-field>
        <v-btn
        @click="registrar"
        :disabled="!valido"
        >Registrar</v-btn>
        <v-btn @click="limpiar">Limpiar</v-btn>
    </v-form>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valido: true,
    nombre: '',
    email: '',
    contrasenha: '',
    confirmar_contrasenha: '',
    reglasEmail: [
      v => !!v || 'Requerimos un Email',
      v => /\S+@\S+\.\S+/.test(v) || 'El email no es Válido',
    ],
  }),
  methods: {
    async registrar() {
      if (this.$refs.formulario.validate()) {
        return axios({
          method: 'post',
          data: {
            nombre: this.nombre,
            email: this.email,
            contrasenha: this.contrasenha,
          },
          url: '/usuarios/registro',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Enhorabuena ',
              '¡Hemos Terminado!, Ya Puedes Utilizar tu Cuenta',
              'success',
            );
            this.$router.push({ name: 'Login' });
          })
          .catch((error) => {
            const mensaje = error.response.data.mensaje;
            this.$swal('¡Error!', `${mensaje}`, 'error');
          });
      }
      return true;
    },
    limpiar() {
      this.$refs.formulario.reset();
    },
  },
};
</script>
