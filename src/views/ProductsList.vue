<!-- eslint-disable eqeqeq -->
<template>
  <div class="product-list">
    <h1>Product List</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="!loading && !error" class="products">
      <div v-for="product in products" :key="product.id">
        <product-card v-bind:product="product" v-on:product-favorite-clicked="
          toggleProductFavorite(products, product.id)
          " />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";
import { getProductsListEndpoint } from "@/helpers/constants";

export default {
  name: "ProductsList",
  components: {
    ProductCard,
  },
  created() {
    this.fetchProducts();
  },
  // Se comenta código repetido
  // mounted() {
  //   this.fetchProducts();
  // },
  data() {
    return {
      products: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(getProductsListEndpoint);
        this.products = response.data.slice(0, 5);
      } catch (err) {
        this.error = "Failed to load products";
      } finally {
        this.loading = false;
      }
    },
    toggleProductFavorite(products, productSelectedId) {
      let updatedProducts = [];

      for (let i = 0; i < products.length; i++) {
        let productData = products[i];

        // Se usaba una función dentro de .push que era incorrecta dado que push solo agrega un item al final de un array
        // Esta lógica comprueba que el id seleccionado coincide con el id de uno de la lista
        if (productData.id == String(productSelectedId)) {
          // Se añade una validación para asignar el valor contrario en caso de que se quiera quitar el favorito
          productData.favorite = productData.favorite ? false : true;
        }

        updatedProducts.push(productData);
      }
      /**
       * No se rerenderizaba de nuevo el componente con el favorito marcado
       * por tanto como solución temporal se vacía el array y se usa nexTick para forzar el re-renderizado
       */
      this.products = [];
      this.$nextTick(() => {
        this.products = updatedProducts;

        // Se comenta código original que es obsoleto, dado que no se necesita return
        //return updatedProducts;
      });
    },
  },
};
</script>

<style scoped>
.product-list {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  font-size: 18px;
  color: gray;
}

.error {
  color: red;
  font-size: 18px;
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
</style>
