<template>
  <div class="callback-page">
    <span class="callback-spinner" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const route = useRoute()
const { setToken } = useAuth()

onMounted(() => {
  const token = route.query.token as string | undefined
  const isNew = route.query.new === '1'
  if (token) {
    setToken(token)
    navigateTo(isNew ? '/onboarding' : '/')
  } else {
    navigateTo('/login?error=google')
  }
})
</script>

<style scoped>
.callback-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E4DBCB;
}
.callback-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(70, 94, 138, 0.2);
  border-top-color: #465E8A;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
