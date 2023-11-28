<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company" />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form
        ref="loginForm"
        class="space-y-6"
        :initial-values="formData"
        :validation-schema="formSchema"
        @submit="handleSignIn">
        <div>
          <div class="mt-2">
            <FormField
              label="Email"
              placeholder="Email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required />
          </div>
        </div>

        <div>
          <div class="mt-2">
            <FormField
              type="password"
              label="Password"
              placeholder="Password"
              id="password"
              name="password"
              autocomplete="current-password"
              required
              labelClass="block text-sm font-medium leading-6 text-gray-900">
            </FormField>
          </div>
        </div>

        <div>
          <button
            ref="btnSignIn"
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </div>
        <div class="flex items-center justify-end">
          <div class="text-sm">
            <a
              href="#"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Forgot password?</a
            >
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../stores/user';
import type { Auth } from '~/models/authModel';
import { AuthSchema } from '@/schemas/auth.schemas';
import { Form } from 'vee-validate';
import FormField from '@/components/forms/FormField.vue';

const initialValues = {} as unknown as Auth;

export default defineComponent({
  name: 'login-page',
  components: {
    Form,
    FormField,
  },
  data: () => ({
    form: {} as typeof Form,
    formData: initialValues,
  }),
  computed: {
    formSchema() {
      return AuthSchema;
    },
  },
  mounted() {
    // setup the form reference
    this.form = this.$refs.loginForm as typeof Form;

    this.submitButton = this.$refs.submitButton as HTMLElement;
  },

  methods: {
    async handleSignIn(values: any) {
      console.log('values', values);
      this.formData = values;

      await this.userStore
        .signIn(this.formData)
        .then((res) => {
          console.log('res', res);
        })
        .catch((error) => {
          console.log('handleSignIn', error);
        });
    },
  },
  setup() {
    const userStore = useUserStore();

    return { userStore };
  },
});
</script>

<style></style>
