<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 space-y-6">
      <input 
        type="text"
        class="w-full p-3 md:p-4 rounded-lg text-primary border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all"
        placeholder="您的姓名"
        v-model="formData.name"
      >
      <input 
        type="email"
        class="w-full p-3 md:p-4 rounded-lg text-primary border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all"
        placeholder="您的邮箱"
        v-model="formData.email"
      >
      <textarea 
        rows="3"
        class="w-full p-3 md:p-4 rounded-lg text-primary border border-[var(--border-primary)] hover:border-[var(--border-hover)] focus:border-[var(--border-hover)] focus:outline-none focus:ring-1 focus:ring-[var(--border-hover)] transition-all"
        placeholder="您的消息"
        v-model="formData.message"
      ></textarea>
      <button 
        class="w-full p-3 md:p-4 rounded-md transition-all cursor-pointer btn-primary"
        @click="handleSubmit"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? '发送中...' : '发送' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { $fetch } from 'ofetch'

const { $toast: toast } = useNuxtApp()
const isSubmitting = ref(false)

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = async () => {
  // 检查姓名
  if (!formData.value.name.trim()) {
    toast.error('请输入您的姓名')
    return
  }

  // 检查邮箱
  if (!formData.value.email.trim()) {
    toast.error('请输入您的邮箱')
    return
  }

  // 简单的邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    toast.error('请输入正确的邮箱格式')
    return
  }

  // 检查消息内容
  if (!formData.value.message.trim()) {
    toast.error('请输入您的消息内容')
    return
  }

  try {
    isSubmitting.value = true
    const data = await $fetch('/api/index.php?mod=sendemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        name: formData.value.name,
        email: formData.value.email,
        content: formData.value.message
      }).toString()
    })

    if (data?.code === 200) {
      toast.success('发送成功')
      // 清空表单
      formData.value = {
        name: '',
        email: '',
        message: ''
      }
    } else {
      toast.error(data?.msg || '发送失败')
    }
  } catch (error) {
    console.error('Failed to send email:', error)
    toast.error('发送失败，请稍后重试')
  } finally {
    isSubmitting.value = false
  }
}
</script> 