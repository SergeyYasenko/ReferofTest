<script setup lang="ts">
import { usePromoCodeForm } from "@/components/types/usePromoCodeForm.ts";
import Step1Form from "./components/Step1Form.vue";
import Step2Form from "./components/Step2Form.vue";
import { reactive } from "vue";

const props = defineProps({
   modelValue: {
      type: Boolean,
      required: true,
   },
});

const emit = defineEmits(["update:modelValue"]);

const {
   currentStep,
   noEndDate,
   promoCode,
   title,
   description,
   points,
   startDate,
   endDate,
   activationLimit,
   receiveMethod,
   formAttrs,
   charCount,
   errors,
   goToStep,
   onSubmit,
   closeModal,
} = usePromoCodeForm(emit);
</script>

<template>
   <Transition name="slide-down">
      <div
         v-if="modelValue"
         class="PromoCodeModal__overlay"
         @click.self="closeModal"
      >
         <div class="PromoCodeModal">
            <button class="PromoCodeModal__close" @click="closeModal">×</button>
            <h2 class="PromoCodeModal__title">Создание промокода</h2>

            <div class="PromoCodeModal__steps">
               <button
                  class="PromoCodeModal__step"
                  :class="{ active: currentStep === 1 }"
                  @click="goToStep(1)"
               >
                  Шаг 1: Основное
               </button>
               <button
                  class="PromoCodeModal__step"
                  :class="{ active: currentStep === 2 }"
                  @click="goToStep(2)"
               >
                  Шаг 2: Настройки промокода
               </button>
            </div>

            <template v-if="currentStep === 1">
               <Step1Form
                  v-model:promoCode="promoCode"
                  v-model:title="title"
                  v-model:description="description"
                  v-model:points="points"
                  :promoCodeAttrs="formAttrs.promoCode"
                  :titleAttrs="formAttrs.title"
                  :descriptionAttrs="formAttrs.description"
                  :pointsAttrs="formAttrs.points"
                  :errors="errors"
                  :charCount="charCount"
                  @submit="goToStep(2)"
                  @cancel="closeModal"
               >
                  <template #actions> </template>
               </Step1Form>
            </template>
            <template v-else>
               <Step2Form
                  v-model:startDate="startDate"
                  v-model:endDate="endDate"
                  v-model:activationLimit="activationLimit"
                  v-model:receiveMethod="receiveMethod"
                  v-model:noEndDate="noEndDate"
                  :startDateAttrs="formAttrs.startDate"
                  :endDateAttrs="formAttrs.endDate"
                  :activationLimitAttrs="formAttrs.activationLimit"
                  :receiveMethodAttrs="formAttrs.receiveMethod"
                  :errors="errors"
                  @submit="onSubmit"
                  @back="goToStep(1)"
               >
                  <template #actions> </template>
               </Step2Form>
            </template>
         </div>
      </div>
   </Transition>
</template>
