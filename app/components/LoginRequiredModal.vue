<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="login-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        @click.self="close"
      >
        <div class="login-modal-panel">
          <h2 id="login-modal-title" class="login-modal-title">
            Connecte-toi ou crée un compte
          </h2>
          <p class="login-modal-text">
            Pour explorer les profils et faire des rencontres lors de tes voyages, connecte-toi ou inscris-toi !
          </p>
          <div class="login-modal-actions">
            <button type="button" class="login-modal-btn login-modal-btn-primary" @click="goToLogin">
              Se connecter
            </button>
            <button type="button" class="login-modal-btn login-modal-btn-secondary" @click="goToSignup">
              Créer un compte
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const router = useRouter()

function close() {
  emit('update:modelValue', false)
}

function goToLogin() {
  close()
  router.push('/login')
}

function goToSignup() {
  close()
  router.push('/signup')
}
</script>

<style scoped>
.login-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(70, 94, 138, 0.5);
  backdrop-filter: blur(4px);
}

.login-modal-panel {
  background: #fff;
  border-radius: 1.5rem;
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(70, 94, 138, 0.2);
}

.login-modal-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #465E8A;
  text-align: center;
  margin: 0 0 1rem;
}

.login-modal-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: #465E8A;
  text-align: center;
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.login-modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.login-modal-btn {
  padding: 0.75rem 1.5rem;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.login-modal-btn-primary {
  background: #465E8A;
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(70, 94, 138, 0.3);
}

.login-modal-btn-primary:hover {
  background: #3a4666;
}

.login-modal-btn-secondary {
  background: #fff;
  color: #465E8A;
  border: 2px solid #465E8A;
}

.login-modal-btn-secondary:hover {
  background: #f5f3ee;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .login-modal-panel,
.modal-leave-active .login-modal-panel {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .login-modal-panel,
.modal-leave-to .login-modal-panel {
  transform: scale(0.95);
}
</style>
