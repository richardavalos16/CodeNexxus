<template>
  <div>
    <div class="login">
      <v-btn large fab color="black">
        <a href="/login/facebook"><v-icon dark large>{{ svgPath }}</v-icon></a>
      </v-btn>
      <v-btn large fab color="red">
        <a href="/login/google"><v-icon color="white" large>{{ svgGoogle }}</v-icon></a>
      </v-btn>
      <v-btn large fab color="black">
        <a href="/login/linkedin"><v-icon color="white" large>{{ svgLinkedIn }}</v-icon></a>
      </v-btn>
    </div>
    <v-form v-model="valido" ref="formulario" lazy-validation>
      <v-text-field
        label="Email:"
        v-model="email"
        :rules="reglasEmail"
        required
      ></v-text-field>
      <v-text-field
        label="Contraseña:"
        v-model="contrasenha"
        type="password"
        required
      ></v-text-field>
      <v-btn @click="acceder" :enabled="!valido">Acceder</v-btn>
      <v-btn @click="limpiar">Limpiar</v-btn>
    </v-form>
  </div>
</template>
<script>
import axios from 'axios';
import bus from './../bus';

export default {
  data: () => ({
    valido: true,
    email: '',
    contrasenha: '',
    reglasEmail: [
      v => !!v || 'Requerimos un Email',
      v => /\S+@\S+\.\S+/.test(v) || 'El email no es Válido',
    ],
  }),
  methods: {
    async acceder() {
      return axios({
        method: 'post',
        data: {
          email: this.email,
          contrasenha: this.contrasenha,
        },
        url: '/usuarios/login',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((respuesta) => {
          window.localStorage.setItem('auth', respuesta.data.token);
          this.$swal('Enhorabuena ', 'Es Hora de que Veas que Videojuego Te Fascinara', 'success');
          bus.$emit('actualizarUsuario');
          this.$router.push({ name: 'Inicio' });
        })
        .catch((error) => {
          const mensaje = error.response.data.mensaje;
          this.$swal('¡Error!', `${mensaje}`, 'error');
          this.$router.push({ name: 'Login' });
        });
    },
    limpiar() {
      this.$refs.formulario.reset();
    },
  },
};

</script>
<!-- Script Iconos -->
<script>
  import { mdiFacebook } from '@mdi/js'
  import { mdiGoogle } from '@mdi/js'
  import { mdiLinkedin } from '@mdi/js';
  import { mdiLoginVariant } from '@mdi/js';

  export default {
    data: () => ({
      svgPath: mdiFacebook,
      svgGoogle: mdiGoogle,
      svgLinkedIn: mdiLinkedin,
      svgLogin: mdiLoginVariant,
    }),
  }
</script>
