<script setup lang="ts">
import { usePromoCodeForm } from "@/components/types/usePromoCodeForm.ts";
import Step1Form from "./components/Step1Form.vue";
import Step2Form from "./components/Step2Form.vue";

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
                  :promoCode="promoCode"
                  :title="title"
                  :description="description"
                  :points="points"
                  :promoCodeAttrs="formAttrs.promoCode"
                  :titleAttrs="formAttrs.title"
                  :descriptionAttrs="formAttrs.description"
                  :pointsAttrs="formAttrs.points"
                  :errors="errors"
                  :charCount="charCount"
                  @update:promoCode="(val) => (promoCode = val)"
                  @update:title="(val) => (title = val)"
                  @update:description="(val) => (description = val)"
                  @update:points="(val) => (points = val)"
                  @submit="goToStep(2)"
                  @cancel="closeModal"
               >
                  <template #actions> </template>
               </Step1Form>
            </template>
            <template v-else>
               <Step2Form
                  :startDate="startDate"
                  :endDate="endDate"
                  :activationLimit="activationLimit"
                  :receiveMethod="receiveMethod"
                  :noEndDate="noEndDate"
                  :startDateAttrs="formAttrs.startDate"
                  :endDateAttrs="formAttrs.endDate"
                  :activationLimitAttrs="formAttrs.activationLimit"
                  :receiveMethodAttrs="formAttrs.receiveMethod"
                  :errors="errors"
                  @update:startDate="(val) => (startDate = val)"
                  @update:endDate="(val) => (endDate = val)"
                  @update:activationLimit="(val) => (activationLimit = val)"
                  @update:receiveMethod="(val) => (receiveMethod = val)"
                  @update:noEndDate="(val) => (noEndDate = val)"
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
