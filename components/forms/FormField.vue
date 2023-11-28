<template>
  <div :class="colClass">
    <!--begin::Label-->
    <label :class="labelClass" v-if="showLabel">{{ fieldLabel }}</label>
    <!--end::Label-->

    <Field
      :name="name"
      :placeholder="fieldPlaceholder"
      :type="type"
      :class="formControlClass" />
    <!--end::Input-->

    <!--begin::Error Message-->
    <div class="fv-plugins-message-container">
      <div class="fv-help-block">
        <ErrorMessage :name="name" />
      </div>
    </div>
    <!--end::Error Message-->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';

const props = defineProps<{
  labelClass: string;
  showLabel: string;
  containerClass: string;
  formControlClass: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
}>();

const fieldLabel = computed(() => {
  if (props.label && props.label?.trim().length > 0) return props.label;
  return props.name
    ?.split(/_/g)
    .map((word) => word)
    .join(' ');
});

const fieldPlaceholder = computed(() => {
  return props.placeholder || fieldLabel;
});

const colClass = computed(() => {
  return `mb-10 ${props.containerClass}`;
});
</script>
