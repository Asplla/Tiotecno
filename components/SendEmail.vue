<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 grid gap-y-6">
      <input 
        type="text"
        class="w-full p-3 md:p-4 rounded-lg text-primary border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all"
        :placeholder="t('contact.form.name')"
        v-model="formData.name"
      >
      <input 
        type="email"
        class="w-full p-3 md:p-4 rounded-lg text-primary border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all"
        :placeholder="t('contact.form.email')"
        v-model="formData.email"
      >
      <textarea 
        rows="3"
        class="w-full p-3 md:p-4 rounded-lg text-primary border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all resize-none"
        :placeholder="t('contact.form.message')"
        v-model="formData.message"
      ></textarea>
      <button 
        class="w-full p-3 md:p-4 rounded-md transition-all cursor-pointer btn-default flex items-center justify-center gap-2"
        @click="handleSubmit"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting" class="animate-spin">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        {{ isSubmitting ? t('contact.form.sending') : t('contact.form.send') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { useI18n } from 'vue-i18n'
import { $fetch } from 'ofetch'

const { $toast: toast } = useNuxtApp()
const { t } = useI18n()
const isSubmitting = ref(false)

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = async () => {
  // // 检查姓名
  // if (!formData.value.name.trim()) {
  //   toast.error(t('contact.form.validation.nameRequired'))
  //   return
  // }

  // // 检查邮箱
  // if (!formData.value.email.trim()) {
  //   toast.error(t('contact.form.validation.emailRequired'))
  //   return
  // }

  // // 简单的邮箱格式验证
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // if (!emailRegex.test(formData.value.email)) {
  //   toast.error(t('contact.form.validation.emailInvalid'))
  //   return
  // }

  // // 检查消息内容
  // if (!formData.value.message.trim()) {
  //   toast.error(t('contact.form.validation.messageRequired'))
  //   return
  // }

  try {
    isSubmitting.value = true
    const data = await $fetch('https://myphp-theta-three.vercel.app/api/index.php?mod=sendemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: new URLSearchParams({
        name: formData.value.name,
        email: formData.value.email,
        content: formData.value.message
      }).toString()
    })

    if (data?.code === '200' || data?.code === 200) {
      toast.success(t('contact.form.success'))
      // 清空表单
      formData.value = {
        name: '',
        email: '',
        message: ''
      }
    } else {
      toast.error(data?.msg || t('contact.form.error.default'))
    }
  } catch (error) {
    console.error('Failed to send email:', error)
    toast.error(t('contact.form.error.retry'))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> 