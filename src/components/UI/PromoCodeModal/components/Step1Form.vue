<script setup lang="ts">
import "@/components/UI/PromoCodeModal/PromoCodeModal.scss";
import type { FieldMeta } from "vee-validate";
import { Field } from "vee-validate";

interface Props {
   promoCode: string;
   promoCodeAttrs: FieldMeta<string>;
   title: string;
   titleAttrs: FieldMeta<string>;
   description: string;
   descriptionAttrs: FieldMeta<string>;
   points: number;
   pointsAttrs: FieldMeta<number>;
   errors: Record<string, string>;
   charCount: number;
}

withDefaults(defineProps<Props>(), {
   promoCode: "",
   title: "",
   description: "",
   points: 0,
   errors: () => ({}),
   charCount: 0,
});

const emit = defineEmits<{
   (e: "update:promoCode", value: string): void;
   (e: "update:title", value: string): void;
   (e: "update:description", value: string): void;
   (e: "update:points", value: number): void;
   (e: "submit"): void;
   (e: "cancel"): void;
}>();
</script>

<template>
   <form @submit.prevent="$emit('submit')" class="PromoCodeModal__form">
      <div class="PromoCodeModal__form-group">
         <div class="PromoCodeModal__form-item">
            <div class="PromoCodeModal__form-item-title">
               Название промокода<span>*</span>
            </div>
            <Field
               v-bind="promoCodeAttrs"
               name="promoCode"
               type="text"
               :value="promoCode"
               @update:modelValue="(val) => emit('update:promoCode', val)"
               placeholder="Введи название"
               class="PromoCodeModal__form-input"
               :class="{ error: errors.promoCode }"
               maxlength="30"
            />
            <span v-if="errors.promoCode" class="PromoCodeModal__error-message">
               {{ errors.promoCode }}
            </span>
         </div>

         <div class="PromoCodeModal__form-item">
            <div class="PromoCodeModal__form-item-title">
               Заголовок<span>*</span>
            </div>
            <Field
               v-bind="titleAttrs"
               name="title"
               type="text"
               :value="title"
               @update:modelValue="(val) => emit('update:title', val)"
               placeholder="Введи заголовок"
               class="PromoCodeModal__form-input"
               :class="{ error: errors.title }"
               maxlength="120"
            />
            <span v-if="errors.title" class="PromoCodeModal__error-message">
               {{ errors.title }}
            </span>
         </div>

         <div class="PromoCodeModal__form-item">
            <div class="PromoCodeModal__form-item-title">
               Сопроводительный текст
            </div>
            <div class="PromoCodeModal__textarea-wrapper">
               <Field
                  v-bind="descriptionAttrs"
                  name="description"
                  as="textarea"
                  :value="description"
                  @update:modelValue="(val) => emit('update:description', val)"
                  placeholder="Например: «Ты попал в число счастливчиков! Дарим 300 баллов»"
                  class="PromoCodeModal__form-input PromoCodeModal__form-input-textarea"
                  maxlength="250"
                  :class="{ error: errors.description }"
               />
               <div class="PromoCodeModal__char-counter">
                  {{ charCount }}/250
               </div>
            </div>
            <span
               v-if="errors.description"
               class="PromoCodeModal__error-message"
            >
               {{ errors.description }}
            </span>
         </div>

         <div class="PromoCodeModal__form-item">
            <div class="PromoCodeModal__form-item-title">
               Укажи количество баллов<span>*</span>
            </div>
            <div class="PromoCodeModal__form-input-num">
               <Field
                  v-bind="pointsAttrs"
                  name="points"
                  type="number"
                  :value="points"
                  @update:modelValue="(val) => emit('update:points', val)"
                  min="1"
                  placeholder="100"
                  class="PromoCodeModal__form-input PromoCodeModal__form-input--pl"
                  :class="{ error: errors.points }"
               />
            </div>
            <span v-if="errors.points" class="PromoCodeModal__error-message">
               {{ errors.points }}
            </span>
         </div>
      </div>
      <div class="PromoCodeModal__form-actions">
         <button
            type="button"
            class="PromoCodeModal__submit-button PromoCodeModal__submit-button--back"
            @click="$emit('cancel')"
         >
            Отмена
         </button>
         <button type="submit" class="PromoCodeModal__submit-button">
            Далее
         </button>
      </div>
   </form>
</template>
