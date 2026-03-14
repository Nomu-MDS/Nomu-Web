<template>
  <div class="min-h-screen w-full bg-[#E4DBCB]">
    <!-- Header -->
    <section class="pt-10 pb-8">
      <div class="w-full max-w-[95vw] 2xl:max-w-[60vw] mx-auto px-6 sm:px-10">
        <span class="inline-flex items-center gap-2 font-mono text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#465E8A]/60 mb-3">
          <span class="w-1.5 h-1.5 rounded-full bg-[#465E8A]/40 inline-block" />
          Centre d'aide
        </span>
        <h1 class="font-[roca] font-bold text-[2.25rem] text-[#0E224A] mb-1" style="letter-spacing:-0.04em;">
          Questions fréquentes
        </h1>
        <p class="font-mono text-sm text-[#465E8A] opacity-70">Tout ce que tu dois savoir sur Nomu.</p>
      </div>
    </section>

    <!-- White card -->
    <div class="faq-white-card">
      <div class="w-full max-w-[95vw] 2xl:max-w-[60vw] mx-auto p-6 sm:p-10">

        <!-- Sections -->
        <div v-for="section in sections" :key="section.id" class="faq-section">
          <h2 class="faq-section-title">{{ section.label }}</h2>

          <div class="flex flex-col gap-2">
            <div
              v-for="(item, i) in section.items"
              :key="item.q"
              class="faq-item"
              :class="{ 'faq-item--open': openKey === section.id + i }"
            >
              <button class="faq-question" @click="toggle(section.id + i)">
                <span>{{ item.q }}</span>
                <svg
                  class="faq-chevron"
                  :class="{ 'faq-chevron--open': openKey === section.id + i }"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div class="faq-answer">
                <div class="faq-answer-inner">
                  <p>{{ item.a }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Still need help -->
        <div class="mt-12 bg-[#F0EDE6] rounded-2xl p-8 text-center">
          <p class="font-[roca] font-bold text-[#0E224A] text-lg mb-1">Tu n'as pas trouvé ta réponse ?</p>
          <p class="font-mono text-sm text-[#465E8A]/70 mb-5">Notre équipe est disponible pour t'aider.</p>
          <a
            href="mailto:hello@nomu.app"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#465E8A] text-white font-mono text-sm font-bold no-underline hover:bg-[#3a4e6e] transition-colors"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Nous contacter
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'FAQ — Nomu',
  description: 'Retrouvez les réponses aux questions fréquentes sur Nomu : inscription, profil, activités et sécurité.',
  ogTitle: 'Questions fréquentes — Nomu',
  ogDescription: 'Tout ce que vous devez savoir sur Nomu.',
})

const sections = [
  {
    id: 'general',
    label: 'Général',
    items: [
      {
        q: "C'est quoi Nomu ?",
        a: "Nomu est une plateforme qui connecte voyageurs et locaux passionnés. Que tu sois chez toi ou en voyage, tu peux proposer tes activités ou réserver celles d'habitants qui partagent leurs coups de cœur.",
      },
      {
        q: "Comment fonctionne Nomu ?",
        a: "Crée un profil, renseigne tes centres d'intérêt et ta ville, puis explore les profils autour de toi ou dans ta prochaine destination. Tu peux contacter directement les hôtes pour organiser une expérience ensemble.",
      },
      {
        q: "Nomu est-il gratuit ?",
        a: "L'inscription et la navigation sur Nomu sont entièrement gratuites. Une commission est prélevée uniquement sur les activités payantes, ce qui nous permet de faire fonctionner la plateforme et de garantir la sécurité des transactions. Si une activité est gratuite, aucun frais n'est appliqué.",
      },
      {
        q: "Dans quels pays Nomu est-il disponible ?",
        a: "Nomu est disponible partout dans le monde. La communauté est encore jeune et grandit chaque jour — plus tu rejoins tôt, plus tu aides à construire la plateforme dans ta région.",
      },
    ],
  },
  {
    id: 'compte',
    label: 'Compte & Profil',
    items: [
      {
        q: "Comment créer un compte ?",
        a: "Clique sur « Créer un compte » depuis la page d'accueil, renseigne ton email et un mot de passe. C'est tout ! Tu peux ensuite compléter ton profil avec ta photo, ta bio et tes centres d'intérêt.",
      },
      {
        q: "Comment rendre mon profil visible dans les recherches ?",
        a: "Dans les paramètres de ton compte, active l'option « Visible dans les recherches ». Ton profil apparaîtra alors dans l'explorateur et pourra être découvert par d'autres membres.",
      },
      {
        q: "Puis-je modifier mes informations après l'inscription ?",
        a: "Oui, à tout moment depuis la page « Mon compte ». Tu peux mettre à jour ta photo, ta biographie, ta ville, ton pays et tes centres d'intérêt.",
      },
      {
        q: "Comment supprimer mon compte ?",
        a: "Tu peux demander la suppression de ton compte en contactant notre équipe à hello@nomu.app. Toutes tes données seront définitivement effacées dans un délai de 30 jours.",
      },
    ],
  },
  {
    id: 'activites',
    label: 'Activités',
    items: [
      {
        q: "Quels types d'activités peut-on proposer ?",
        a: "Tout ce que tu aimes faire et que tu voudrais partager : randonnée, cuisine locale, escalade, musique, art, visite de quartier… Il n'y a pas de limite tant que l'activité est légale et bienveillante.",
      },
      {
        q: "Comment contacter un hôte ?",
        a: "Depuis le profil d'un membre, clique sur le bouton de contact pour démarrer une conversation. Un compte Nomu est requis pour envoyer des messages.",
      },
      {
        q: "Est-ce que les activités sont payantes ?",
        a: "Ça dépend de l'hôte. Certains proposent leurs activités gratuitement par passion du partage, d'autres peuvent fixer un tarif. Les conditions sont définies directement entre les membres, et le paiement est sécurisé via la plateforme.",
      },
      {
        q: "Est-ce que Nomu prend une commission ?",
        a: "Oui, Nomu prélève une petite commission sur les activités payantes. Cette commission nous permet de maintenir la plateforme, de garantir la sécurité des paiements et de continuer à développer de nouvelles fonctionnalités pour la communauté. Pour les activités gratuites, aucune commission n'est appliquée.",
      },
      {
        q: "Pourquoi passer par Nomu plutôt qu'organiser en dehors de l'app ?",
        a: "En passant par Nomu, tu bénéficies de la protection offerte par la plateforme : paiements sécurisés, profils vérifiés, système de signalement et support en cas de litige. Organiser une activité en dehors de l'app prive les deux parties de ces garanties. Nomu est conçu pour que chaque expérience se passe dans les meilleures conditions possibles.",
      },
    ],
  },
  {
    id: 'securite',
    label: 'Sécurité & Confidentialité',
    items: [
      {
        q: "Comment Nomu vérifie-t-il les profils ?",
        a: "Nomu s'appuie sur un processus de vérification d'identité pour les membres actifs sur la plateforme. Un badge « Profil vérifié » est attribué aux utilisateurs dont l'identité a été confirmée, t'aidant à identifier les hôtes de confiance en un coup d'œil.",
      },
      {
        q: "Pourquoi les profils vérifiés sont-ils importants ?",
        a: "Les profils vérifiés garantissent que tu interagis avec de vraies personnes. C'est l'une des raisons pour lesquelles il est fortement recommandé de rester sur Nomu pour organiser et payer tes activités : tu as la certitude de l'identité de ton hôte, une traçabilité des échanges et un recours en cas de problème.",
      },
      {
        q: "Mes données personnelles sont-elles protégées ?",
        a: "Oui. Nous ne partageons jamais tes données avec des tiers à des fins publicitaires. Seules les informations que tu choisis de rendre publiques (photo, bio, ville, intérêts) sont visibles par les autres membres.",
      },
      {
        q: "Que faire si je rencontre un comportement inapproprié ?",
        a: "Tu peux signaler un profil ou un message directement depuis l'application. Notre équipe examine chaque signalement et peut suspendre ou bannir les comptes qui ne respectent pas nos règles de communauté.",
      },
    ],
  },
]

const openKey = ref<string | null>(null)

function toggle(key: string) {
  openKey.value = openKey.value === key ? null : key
}
</script>

<style scoped>
.faq-white-card {
  background: #fff;
  border-radius: 32px 32px 0 0;
  min-height: 60vh;
  padding-top: 0.5rem;
}

/* Section */
.faq-section {
  margin-bottom: 2.5rem;
}

.faq-section-title {
  font-family: 'roca', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #0E224B;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
}

/* FAQ item */
.faq-item {
  border-radius: 14px;
  border: 1.5px solid rgba(70, 94, 138, 0.1);
  background: #fff;
  overflow: hidden;
  transition: border-color 0.2s;
}

.faq-item--open {
  border-color: rgba(70, 94, 138, 0.25);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.93rem;
  color: #0E224A;
  transition: background 0.15s;
}

.faq-question:hover {
  background: rgba(70, 94, 138, 0.04);
}

.faq-chevron {
  width: 1rem;
  height: 1rem;
  color: #465E8A;
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-chevron--open {
  transform: rotate(180deg);
}

/* Accordion — CSS grid trick for smooth native transition */
.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-item--open .faq-answer {
  grid-template-rows: 1fr;
}

.faq-answer-inner {
  overflow: hidden;
}

.faq-answer-inner p {
  padding: 0 1.2rem 1rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  line-height: 1.72;
  color: #465E8A;
  margin: 0;
  border-top: 1px solid rgba(70, 94, 138, 0.08);
  padding-top: 0.85rem;
}
</style>
