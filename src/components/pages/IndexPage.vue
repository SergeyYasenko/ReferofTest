<script setup>
import { ref } from "vue";
import PromoCodeModal from "../UI/PromoCodeModal/PromoCodeModal.vue";

const showModal = ref(false);

const toggleModal = () => {
   showModal.value = !showModal.value;
};
</script>

<template>
   <div class="IndexPage__wrapper">
      <button
         type="button"
         class="IndexPage__button"
         @click="toggleModal"
         :class="{ active: showModal }"
      >
         Open Promo
      </button>
      <PromoCodeModal v-model="showModal" />
   </div>
</template>

<style lang="scss" scoped>
.IndexPage__wrapper {
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
}

.IndexPage__button {
   cursor: pointer;
   padding: 15px 30px;
   font-size: 23px;
   background-color: var(--color-background-soft);
   color: var(--vt-c-text-dark-1);
   border: none;
   border-radius: 19px;
   transition: all 0.3s ease;

   &:hover {
      background-color: var(--color-background);
   }

   &.active {
      opacity: 0;
   }
}
</style>
