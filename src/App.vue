<script setup lang="ts">
import { ref } from "vue";
import PromoCodeModal from "./components/UI/PromoCodeModal/PromoCodeModal.vue";

const showModal = ref(false);
</script>

<template>
   <div id="app">
      <button @click="showModal = true">Открыть модальное окно</button>
      <PromoCodeModal v-model="showModal" />
   </div>
</template>

<style scoped>
#app {
   padding: 20px;
}

button {
   padding: 10px 20px;
   background: #007bff;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
}

button:hover {
   background: #0056b3;
}
</style>
