<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <NuxtLink to="/" class="navbar-logo">
        <img src="/img/Nomu_logo.svg" alt="Nomu" class="navbar-logo-img" />
      </NuxtLink>

      <div class="navbar-links">
        <NuxtLink to="/explore" class="navbar-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="navbar-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.777.514-3.434 1.401-4.831" />
          </svg>
          <span>Explorer</span>
        </NuxtLink>

        <NuxtLink to="/faq" class="navbar-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="navbar-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          <span>FAQ</span>
        </NuxtLink>

        <template v-if="isLoggedIn">
          <NuxtLink to="/messages" class="navbar-link">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="navbar-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            <span>Messages</span>
          </NuxtLink>
          <NuxtLink to="/reservations" class="navbar-link">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="navbar-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
            <span>Réservations</span>
          </NuxtLink>
          <NuxtLink to="/account" class="navbar-btn">Mon compte</NuxtLink>
        </template>

        <template v-else>
          <NuxtLink to="/login" class="navbar-link">Connexion</NuxtLink>
          <NuxtLink to="/signup" class="navbar-btn">S'inscrire</NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isLoggedIn } = useAuth()
</script>

<style scoped>
.navbar {
  width: 100%;
  background: #E4DBCB;
  box-shadow: 0 1px 3px rgba(70, 94, 138, 0.06);
  position: sticky;
  top: 0;
  z-index: 20;
}
.navbar-inner {
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
}
.navbar-logo {
  display: flex;
  align-items: center;
}
.navbar-logo-img {
  width: 6rem;
  height: auto;
}
.navbar-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.navbar-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #465E8A;
  text-decoration: none;
  transition: opacity 0.2s;
  padding: 0.35rem 0.5rem;
  border-radius: 0.5rem;
}
.navbar-link:hover {
  opacity: 0.7;
}
.navbar-link.router-link-active {
  opacity: 1;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.navbar-icon {
  width: 1.2rem;
  height: 1.2rem;
}
.navbar-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  background: #465E8A;
  color: #fff;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(70, 94, 138, 0.15);
}
.navbar-btn:hover {
  background: #3a4666;
}

@media (max-width: 640px) {
  .navbar-link span {
    display: none;
  }
  .navbar-icon {
    width: 1.4rem;
    height: 1.4rem;
  }
  .navbar-links {
    gap: 1rem;
  }
}
</style>
