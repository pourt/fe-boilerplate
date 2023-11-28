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
        v-slot="{ handleSubmit, validate, values }">
        <div>
          <div class="mt-2">
            <FormField
              label="Email"
              placeholder="Email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
              formControlClass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <div class="flex items-center justify-between">
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                    >Forgot password?</a
                  >
                </div>
              </div>
            </FormField>
          </div>
        </div>

        <div>
          <button
            @click="validate"
            ref="btnSignIn"
            type="submit"
            formControlClass="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
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
    async handleSignIn(values) {
      this.formData = values;

      console.log('values', values);
      console.log('formData', this.formData);

      await this.userStore
        .signIn(this.formData)
        .then(() => {
          this.$router.replace('/dashboard');
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
