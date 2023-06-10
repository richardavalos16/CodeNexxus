import Vue from 'vue';
import Router from 'vue-router';
import Inicio from '@/components/Inicio';
import Contacto from '@/components/Contacto';
import AgregarVideojuego from '@/components/AgregarVideojuego';
import Videojuego from '@/components/Videojuego';
import Registro from '@/components/Registro';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  mode: 'history', // Para quitar el # de los links
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio,
    },
    {
      path: '/contacto',
      name: 'Contáctanos',
      component: Contacto,
    },
    {
      path: '/videojuego/agregar',
      name: 'AgregarVideojuego',
      component: AgregarVideojuego,
    },
    {
      path: '/videojuego/:id',
      name: 'Videojuego',
      component: Videojuego,
    },
    {
      path: '/usuarios/registro',
      name: 'Registro',
      component: Registro,
    },
    {
      path: '/usuarios/login',
      name: 'Login',
      component: Login,
    },
  ],
});
