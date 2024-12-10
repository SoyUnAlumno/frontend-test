<template>
  <div class="product-item">
    <!-- se añade clase condicional (favorito en rojo) con v-bind abreviado y una expresión ternaria que usa la prop product (objeto en el cual se agrega el campo favorite si se hace click)-->
    <span :class="[product.favorite ? 'icono selected favorite' : 'icono favorite']" @click="onFavoriteClicked"></span>
    <img :src="product.image" :alt="product.title" class="product-image" />
    <h3 class="product-title">{{ product.title }}</h3>
    <p class="product-description">{{ product.description }}</p>
    <p><strong>Price:</strong> ${{ product.price }}</p>
  </div>
</template>

<script>
export default {
  // Clases condicionales, doc de vue: https://v2.vuejs.org/v2/guide/class-and-style
  name: 'ProductCard',
  props: ['product'],
  data() {
    return {

    }
  },
  methods: {
    // <span :class="[product.favorite ? 'favorite-icon' : 'icono favorite']" @click="onFavoriteClicked"></span>
    // <span class="icono favorite" @click="onFavoriteClicked"></span>
    // Faltaba un evento @click en el icono del corazón para disparar esta función.
    // Esta función emite un evento para que el padre que oye dispare a su vez el método que necesite
    onFavoriteClicked() {
      // No funcionaba porque estaba en camelCase. Los nombres de eventos siempre debe ir en kebab-case
      // Fuente, la doc de vue: https://v2.vuejs.org/v2/guide/components-custom-events
      this.$emit('product-favorite-clicked', this.product.id)
    }
  }
}
</script>

<style scoped>
.product-item {
  position: relative;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}

.product-image {
  width: 150px;
  height: 150px;
  object-fit: scale-down;
  margin-bottom: 10px;
}

.product-title {
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  height: 2em;
  line-height: 1.8em;
}

.product-description {
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  height: 3.6em;
  line-height: 1.8em;
}

.favorite {
  position: absolute;
  right: 20px;
  width: 30px;
  height: 30px;
}

span.icono.favorite.selected::before {
  background-image: url("../assets/favorite-filled-red.svg");
}

span.icono.favorite::before {
  background-image: url("../assets/favorite-filled-muted.svg");
}

.favorite:hover {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
}

.favorite-icon {
  background-image: url('../assets/favorite-filled-muted.svg');
}

.favorite-icon.selected {
  background-image: url('../assets/favorite-filled-red.svg');
}

span.icono {
  display: inline-block;
}

span.icono::before {
  content: "";
  width: 2.4rem;
  height: 2.4rem;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  vertical-align: text-bottom;
}
</style>
