<template>
  <div :class="colClass">
    <!--begin::Label-->
    <label :class="labelClass" v-if="showLabel">{{ fieldLabel }}</label>
    <!--end::Label-->
    <div class="mt-2">
      <VField
        :name="name"
        :placeholder="fieldPlaceholder"
        :type="type"
        :class="formControlClass" />
      <!--end::Input-->
    </div>

    <!--begin::Error Message-->
    <div class="fv-plugins-message-container">
      <div class="fv-help-block text-danger">
        <VErrorMessage :name="name" />
      </div>
    </div>
    <!--end::Error Message-->

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    showLabel: {
      type: Boolean,
      default: true,
    },
    labelClass: {
      type: String,
      default: 'block text-sm font-medium leading-6 text-gray-900',
    },
    containerClass: {
      type: String,
    },
    formControlClass: {
      type: String,
      default:
        'block w-full rounded-md border-0 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  computed: {
    fieldLabel() {
      if (this.label && this.label?.trim().length > 0) return this.label;

      return this.name
        ?.split(/_/g)
        .map((word) => word)
        .join(' ');
    },
    fieldPlaceholder() {
      return this.placeholder || this.fieldLabel;
    },
    colClass() {
      return `mb-10 ${this.containerClass}`;
    },
  },
});
</script>
