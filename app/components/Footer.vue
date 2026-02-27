<template>
  <footer class="site-footer">
    <div class="footer-inner">

      <!-- Top: logo + tagline + nav columns -->
      <div class="footer-top">

        <!-- Brand -->
        <div class="footer-brand">
          <NuxtLink to="/">
            <img src="/img/Nomu_logo.svg" alt="Nomu" class="footer-logo" />
          </NuxtLink>
          <p class="footer-tagline">
            Partage ta ville,<br />explore le monde.
          </p>
          <p class="footer-sub">
            Connecte voyageurs et locaux passionnés autour d'activités authentiques.
          </p>
        </div>

        <!-- Nav columns -->
        <div class="footer-nav">
          <div class="footer-col">
            <p class="footer-col-title">Plateforme</p>
            <NuxtLink to="/explore" class="footer-link">Explorer les profils</NuxtLink>
            <NuxtLink to="/faq" class="footer-link">FAQ</NuxtLink>
          </div>

          <div class="footer-col">
            <p class="footer-col-title">Compte</p>
            <NuxtLink to="/login" class="footer-link">Connexion</NuxtLink>
            <NuxtLink to="/signup" class="footer-link">Créer un compte</NuxtLink>
          </div>

          <div class="footer-col">
            <p class="footer-col-title">Légal</p>
            <NuxtLink to="/mentions-legales" class="footer-link">Mentions légales</NuxtLink>
            <NuxtLink to="/confidentialite" class="footer-link">Confidentialité</NuxtLink>
            <NuxtLink to="/cgu" class="footer-link">CGU</NuxtLink>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="footer-divider" />

      <!-- Bottom: copyright + socials -->
      <div class="footer-bottom">
        <p class="footer-copy">© {{ year }} Nomu. Tous droits réservés.</p>
        <div class="footer-socials">
          <!-- Instagram -->
          <a href="#" aria-label="Instagram" class="footer-social-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <!-- TikTok -->
          <a href="#" aria-label="TikTok" class="footer-social-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
            </svg>
          </a>
          <!-- LinkedIn -->
          <a href="#" aria-label="LinkedIn" class="footer-social-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  background: #0E224A;
  width: 100%;
}

.footer-inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 3.5rem 1.5rem 2rem;
}

/* Top row */
.footer-top {
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}

/* Brand */
.footer-brand {
  max-width: 260px;
}

.footer-logo {
  width: 6rem;
  height: auto;
  filter: brightness(0) invert(1);
  margin-bottom: 1.1rem;
}

.footer-tagline {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #E4DBCB;
  line-height: 1.35;
  margin: 0 0 0.75rem;
}

.footer-sub {
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem;
  color: rgba(228, 219, 203, 0.5);
  line-height: 1.65;
  margin: 0;
}

/* Nav columns */
.footer-nav {
  display: flex;
  gap: 3.5rem;
  flex-wrap: wrap;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-col-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(228, 219, 203, 0.85);
  margin: 0 0 0.25rem;
}

.footer-link {
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: rgba(228, 219, 203, 0.75);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-link:hover {
  color: #E4DBCB;
}

/* Divider */
.footer-divider {
  height: 1px;
  background: rgba(228, 219, 203, 0.1);
  margin-bottom: 1.5rem;
}

/* Bottom row */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copy {
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  color: rgba(228, 219, 203, 0.35);
  margin: 0;
}

.footer-socials {
  display: flex;
  gap: 0.75rem;
}

.footer-social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  border: 1px solid rgba(228, 219, 203, 0.15);
  color: rgba(228, 219, 203, 0.5);
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s;
}

.footer-social-btn:hover {
  border-color: rgba(228, 219, 203, 0.4);
  color: #E4DBCB;
}

@media (max-width: 640px) {
  .footer-top {
    gap: 2rem;
  }
  .footer-nav {
    gap: 2rem;
  }
  .footer-brand {
    max-width: 100%;
  }
}
</style>
