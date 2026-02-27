<template>
  <div class="bg-cream">
    <!-- ══════════════════════════════════════
         HERO — plein cadre arrondi (style WhatsApp)
    ══════════════════════════════════════ -->
    <section class="px-4 py-4 sm:px-5 sm:py-5">
      <div
        class="relative rounded-[20px] sm:rounded-[28px] overflow-hidden"
        style="min-height: 88vh"
      >
        <img
          src="/img/AdobeStock_96991406.jpg"
          class="absolute inset-0 w-full h-full object-cover"
          style="object-position: 55% 35%"
          alt=""
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/35 to-transparent"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent"
        />

        <!-- Content -->
        <div
          class="relative z-10 flex flex-col justify-center p-8 sm:p-14"
          style="min-height: 88vh; padding-bottom: 4rem"
        >
          <!-- Bottom-left: title + CTA -->
          <div class="max-w-[520px]">
            <span
              ref="heroBadge"
              class="opacity-0 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white font-space text-[0.68rem] font-bold tracking-[0.08em] uppercase px-4 py-[0.4rem] rounded-full mb-6"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-cream" />
              Local · Voyageur · Les deux à la fois
            </span>
            <h1
              ref="heroTitle"
              class="opacity-0 font-roca font-bold text-white leading-[1.04] tracking-[-0.04em] mb-5"
              style="font-size: clamp(2.8rem, 5.5vw, 4.5rem)"
            >
              Partage ta ville,<br />explore le monde.
            </h1>
            <p
              ref="heroSub"
              class="opacity-0 font-space text-[0.9rem] text-white/65 leading-[1.78] mb-8 max-w-[400px]"
            >
              Propose tes activités ou réserve celles des passionnés qui
              t'accueillent. Ici, tout le monde est local quelque part.
            </p>
            <div ref="heroCta" class="opacity-0 flex gap-3 flex-wrap">
              <NuxtLink
                v-if="!isLoggedIn"
                to="/signup"
                class="px-6 py-3.5 rounded-full bg-cream text-navy font-roca font-bold text-[0.95rem] no-underline hover:bg-white transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
              >
                Créer un compte
              </NuxtLink>
              <NuxtLink
                to="/explore"
                class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/15 backdrop-blur-md text-white font-space text-[0.88rem] no-underline border border-white/30 hover:bg-white/25 transition-colors"
              >
                Explorer
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                    clip-rule="evenodd"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Right: floating UI cards -->
          <div
            class="absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 flex-col gap-4 hidden lg:flex"
          >
            <div
              ref="float1"
              class="opacity-0 bg-white/92 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl w-[230px]"
            >
              <img
                :src="avatar('Léa')"
                class="w-11 h-11 rounded-full shrink-0 bg-blue/20"
                alt=""
              />
              <div class="flex-1 min-w-0">
                <p
                  class="font-roca font-bold text-navy text-[0.9rem] leading-none mb-0.5"
                >
                  Léa
                </p>
                <p class="font-space text-[0.62rem] text-blue">
                  Randonnée · Chamonix
                </p>
              </div>
              <span class="w-2 h-2 rounded-full bg-unread shrink-0" />
            </div>

            <div
              ref="float2"
              class="opacity-0 bg-[rgba(255,106,87,0.93)] backdrop-blur-sm px-4 py-2.5 rounded-full self-end shadow-xl"
            >
              <span class="font-space text-white text-[0.72rem] font-bold"
                >Escalade · Hanoï</span
              >
            </div>

            <div
              ref="float3"
              class="opacity-0 bg-white/92 backdrop-blur-md rounded-2xl px-4 py-3.5 shadow-2xl w-[250px]"
            >
              <p
                class="font-space text-[0.58rem] text-blue/60 uppercase tracking-wider mb-1.5"
              >
                Nouvelle activité
              </p>
              <p
                class="font-roca font-bold text-navy text-[0.95rem] leading-tight"
              >
                Plongée à Malte
              </p>
              <div class="flex items-center justify-between mt-1.5">
                <p class="font-space text-[0.62rem] text-charcoal/50">
                  Marc · 3h · 45€
                </p>
                <span
                  class="font-space text-[0.6rem] font-bold text-white bg-blue px-2 py-0.5 rounded-full"
                  >Dispo</span
                >
              </div>
            </div>

            <div
              ref="float4"
              class="opacity-0 bg-white/85 backdrop-blur-sm px-3.5 py-2 rounded-full self-center shadow-lg flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3 h-3 text-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span class="font-space text-[0.7rem] font-bold text-navy"
                >30+ villes dans le monde</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         SEARCH BAR — superposée bas du hero
    ══════════════════════════════════════ -->
    <div class="relative z-20 -mt-10 sm:-mt-14 px-5 sm:px-10 mb-4">
      <form @submit.prevent="searchProfiles" class="max-w-[700px] mx-auto bg-white/96 backdrop-blur-md rounded-2xl shadow-[0_16px_56px_rgba(14,34,74,0.22)] p-2.5 flex gap-2 items-center">
        <div class="flex-1 flex items-center gap-3 px-3 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-navy/35 shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
          <input v-model="query" type="search" class="flex-1 border-none bg-transparent font-space text-[0.9rem] text-navy outline-none placeholder:text-navy/35" placeholder="Activité, ville, passion…" />
        </div>
        <button type="submit" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-cream font-roca font-bold text-[0.9rem] border-none cursor-pointer hover:bg-blue transition-colors shadow-[0_4px_16px_rgba(14,34,74,0.2)] whitespace-nowrap">
          Rechercher
          <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6 6l6-6m-6-6l6 6"/></svg>
        </button>
      </form>
    </div>

    <!-- ══════════════════════════════════════
         MANIFESTE — avatars flottants + grande citation
    ══════════════════════════════════════ -->
    <section
      class="manifesto-section relative py-10 overflow-hidden"
      style="min-height: 520px"
    >
      <!-- Avatars top -->
      <div
        class="manifesto-avatar absolute hidden sm:block"
        style="top: 6%; left: 6%"
      >
        <img
          :src="avatar('Nina')"
          class="w-14 h-14 rounded-full shadow-lg ring-2 ring-white"
          alt=""
        />
      </div>
      <div
        class="manifesto-avatar absolute hidden sm:flex items-center gap-2"
        style="top: 10%; left: 42%"
      >
        <img
          :src="avatar('Tom')"
          class="w-10 h-10 rounded-full shadow-md ring-2 ring-white shrink-0"
          alt=""
        />
        <div class="bg-white rounded-2xl px-3 py-2 shadow-md">
          <p class="font-space text-[0.72rem] text-navy font-bold">
            On se retrouve quand ?
          </p>
          <p class="font-space text-[0.55rem] text-navy/35 mt-0.5 text-right">
            14:22
          </p>
        </div>
      </div>
      <div
        class="manifesto-avatar absolute hidden lg:block"
        style="top: 5%; right: 8%"
      >
        <img
          :src="avatar('Emma')"
          class="w-16 h-16 rounded-full shadow-lg ring-2 ring-white"
          alt=""
        />
      </div>
      <div
        class="manifesto-avatar absolute hidden lg:flex items-center gap-2"
        style="top: 28%; left: 14%"
      >
        <img
          :src="avatar('Jules')"
          class="w-10 h-10 rounded-full shadow-md ring-2 ring-white shrink-0"
          alt=""
        />
        <div class="bg-white rounded-2xl px-3 py-2 shadow-md">
          <p class="font-space text-[0.72rem] text-navy font-bold">Hola !</p>
          <p class="font-space text-[0.55rem] text-navy/35 mt-0.5 text-right">
            09:47
          </p>
        </div>
      </div>
      <div
        class="manifesto-avatar absolute hidden lg:block"
        style="top: 20%; right: 18%"
      >
        <img
          :src="avatar('Sofia')"
          class="w-12 h-12 rounded-full shadow-md ring-2 ring-white"
          alt=""
        />
      </div>

      <!-- Quote centrale -->
      <div
        class="manifesto-quote max-w-[820px] mx-auto text-center px-6 py-28 relative z-10"
      >
        <p
          class="font-roca font-bold text-navy tracking-[-0.03em] leading-[1.22]"
          style="font-size: clamp(1.5rem, 3.2vw, 2.6rem)"
        >
          Les rencontres authentiques vous permettent d'explorer le monde
          autrement, de partager ce que vous aimez et de vous sentir chez vous,
          où que vous soyez.
        </p>
      </div>

      <!-- Avatars bottom -->
      <div
        class="manifesto-avatar absolute hidden sm:block"
        style="bottom: 8%; left: 10%"
      >
        <img
          :src="avatar('Lucia')"
          class="w-12 h-12 rounded-full shadow-lg ring-2 ring-white"
          alt=""
        />
      </div>
      <div
        class="manifesto-avatar absolute hidden lg:flex items-center gap-2"
        style="bottom: 14%; left: 32%"
      >
        <img
          :src="avatar('Kenji')"
          class="w-10 h-10 rounded-full shadow-md ring-2 ring-white shrink-0"
          alt=""
        />
        <div class="bg-white rounded-2xl px-3 py-2 shadow-md">
          <p class="font-space text-[0.72rem] text-navy font-bold">
            À bientôt !
          </p>
          <p class="font-space text-[0.55rem] text-navy/35 mt-0.5 text-right">
            16:05
          </p>
        </div>
      </div>
      <div
        class="manifesto-avatar absolute hidden sm:block"
        style="bottom: 6%; right: 7%"
      >
        <img
          :src="avatar('Amara')"
          class="w-14 h-14 rounded-full shadow-lg ring-2 ring-white"
          alt=""
        />
      </div>
      <div
        class="manifesto-avatar absolute hidden lg:flex flex-row-reverse items-center gap-2"
        style="bottom: 18%; right: 20%"
      >
        <img
          :src="avatar('Ryo')"
          class="w-10 h-10 rounded-full shadow-md ring-2 ring-white shrink-0"
          alt=""
        />
        <div class="bg-white rounded-2xl px-3 py-2 shadow-md">
          <p class="font-space text-[0.72rem] text-navy font-bold">
            Prêt pour demain ?
          </p>
          <p class="font-space text-[0.55rem] text-navy/35 mt-0.5">11:30</p>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         ALBUM PHOTO — éventail désordonné
    ══════════════════════════════════════ -->
    <section class="album-section py-16 sm:py-20 overflow-hidden">
      <p
        class="font-space text-[1rem] font-bold tracking-[0.12em] uppercase text-navy/80 text-center mb-14"
      >
        Des expériences à travers le monde
      </p>
      <div
        ref="photoAlbum"
        class="album-wrap mx-auto"
        style="position: relative; height: 580px; max-width: 1060px"
      >
        <div
          v-for="(photo, i) in albumPhotos"
          :key="i"
          class="album-photo"
          :style="{ zIndex: photo.zIndex }"
          @mouseenter="hoverAlbum(i, true)"
          @mouseleave="hoverAlbum(i, false)"
        >
          <img :src="photo.src" :alt="photo.caption" class="album-img" />
          <span class="album-caption">{{ photo.caption }}</span>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         COMMENT ÇA MARCHE — 3 mockups téléphone
    ══════════════════════════════════════ -->
    <section
      class="how-section py-20 sm:py-28 px-6 overflow-hidden bg-[#edf4ed]"
    >
      <div class="max-w-[1060px] mx-auto">
        <!-- Header -->
        <div class="how-header text-center mb-16">
          <p
            class="font-space text-[0.8rem] font-bold tracking-[0.12em] uppercase text-navy/80 mb-3"
          >
            3 étapes
          </p>
          <h2
            class="font-roca font-bold text-navy tracking-[-0.04em] leading-[1.1]"
            style="font-size: clamp(1.8rem, 3.5vw, 2.9rem)"
          >
            Fatigué du tourisme de masse ?<br />
            <em class="not-italic text-blue">Nomu rend les voyages humains</em>
          </h2>
        </div>

        <!-- 3 colonnes mockups -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-14">
          <!-- Étape 1 — Explorer -->
          <div class="how-step text-center">
            <div class="phone-frame mx-auto mb-7">
              <div class="phone-vol-up" />
              <div class="phone-vol-down" />
              <div class="phone-power" />
              <div class="phone-screen">
                <div class="phone-status">
                  <span>9:41</span>
                  <div class="phone-island" />
                  <div class="flex items-center gap-1">
                    <svg class="h-2 w-3" viewBox="0 0 12 8" fill="currentColor"><rect x="0" y="3" width="2" height="5" rx="0.4"/><rect x="3" y="2" width="2" height="6" rx="0.4"/><rect x="6" y="1" width="2" height="7" rx="0.4"/><rect x="9" y="0" width="2" height="8" rx="0.4" opacity="0.25"/></svg>
                    <svg class="h-2.5 w-5" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="17" height="9" rx="2" stroke="currentColor" stroke-width="1"/><rect x="17.5" y="3" width="2" height="4" rx="1" fill="currentColor"/><rect x="1.5" y="1.5" width="11" height="7" rx="1.5" fill="currentColor"/></svg>
                  </div>
                </div>
                <div class="px-3 pt-1 pb-2 bg-navy">
                  <p
                    class="font-space text-[0.48rem] text-cream/50 mb-1.5 text-center tracking-wider uppercase"
                  >
                    Explorer
                  </p>
                  <div
                    class="bg-white/12 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
                  >
                    <svg
                      class="w-2.5 h-2.5 text-white/40 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                      />
                    </svg>
                    <span class="font-space text-[0.5rem] text-white/40"
                      >Yoga, Paris…</span
                    >
                  </div>
                </div>
                <div class="px-2.5 pt-2.5 space-y-1.5">
                  <div
                    class="flex items-center gap-2 bg-white rounded-xl p-2 shadow-sm"
                  >
                    <img
                      :src="avatar('Léa')"
                      class="w-7 h-7 rounded-full shrink-0"
                      alt=""
                    />
                    <div class="flex-1 min-w-0">
                      <p
                        class="font-roca font-bold text-navy text-[0.65rem] leading-none"
                      >
                        Léa
                      </p>
                      <p class="font-space text-[0.5rem] text-blue">
                        Yoga · Paris
                      </p>
                    </div>
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-[#34d399] shrink-0"
                    />
                  </div>
                  <div
                    class="flex items-center gap-2 bg-white rounded-xl p-2 shadow-sm"
                  >
                    <img
                      :src="avatar('Marc')"
                      class="w-7 h-7 rounded-full shrink-0"
                      alt=""
                    />
                    <div class="flex-1 min-w-0">
                      <p
                        class="font-roca font-bold text-navy text-[0.65rem] leading-none"
                      >
                        Marc
                      </p>
                      <p class="font-space text-[0.5rem] text-blue">
                        Randonnée · Chamonix
                      </p>
                    </div>
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-[#34d399] shrink-0"
                    />
                  </div>
                  <div
                    class="flex items-center gap-2 bg-white rounded-xl p-2 shadow-sm"
                  >
                    <img
                      :src="avatar('Sofia')"
                      class="w-7 h-7 rounded-full shrink-0"
                      alt=""
                    />
                    <div class="flex-1 min-w-0">
                      <p
                        class="font-roca font-bold text-navy text-[0.65rem] leading-none"
                      >
                        Sofia
                      </p>
                      <p class="font-space text-[0.5rem] text-blue">
                        Cuisine · Lyon
                      </p>
                    </div>
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-navy/20 shrink-0"
                    />
                  </div>
                </div>
              </div>
            </div>
            <h3 class="font-roca font-bold text-navy text-[1.08rem] xl:text-[1.2rem] mb-2">
              Trouve ton local
            </h3>
            <p
              class="font-space text-[1rem] text-charcoal/80 leading-[1.75]  mx-auto"
            >
              Parcours les profils, filtre par passion ou par ville et trouve la
              personne idéale.
            </p>
          </div>

          <!-- Étape 2 — Discuter -->
          <div class="how-step text-center">
            <div class="phone-frame mx-auto mb-7">
              <div class="phone-vol-up" />
              <div class="phone-vol-down" />
              <div class="phone-power" />
              <div class="phone-screen">
                <div class="phone-status">
                  <span>9:41</span>
                  <div class="phone-island" />
                  <div class="flex items-center gap-1">
                    <svg class="h-2 w-3" viewBox="0 0 12 8" fill="currentColor"><rect x="0" y="3" width="2" height="5" rx="0.4"/><rect x="3" y="2" width="2" height="6" rx="0.4"/><rect x="6" y="1" width="2" height="7" rx="0.4"/><rect x="9" y="0" width="2" height="8" rx="0.4" opacity="0.25"/></svg>
                    <svg class="h-2.5 w-5" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="17" height="9" rx="2" stroke="currentColor" stroke-width="1"/><rect x="17.5" y="3" width="2" height="4" rx="1" fill="currentColor"/><rect x="1.5" y="1.5" width="11" height="7" rx="1.5" fill="currentColor"/></svg>
                  </div>
                </div>
                <div class="px-3 pt-1 pb-2 bg-navy flex items-center gap-2">
                  <img
                    :src="avatar('Marc')"
                    class="w-6 h-6 rounded-full shrink-0"
                    alt=""
                  />
                  <div>
                    <p
                      class="font-roca font-bold text-cream text-[0.6rem] leading-none"
                    >
                      Marc
                    </p>
                    <p class="font-space text-[0.44rem] text-cream/45">
                      En ligne
                    </p>
                  </div>
                </div>
                <div class="px-2.5 pt-3 space-y-2">
                  <div class="flex justify-start">
                    <div
                      class="bg-white rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[80%] shadow-sm"
                    >
                      <p class="font-space text-[0.55rem] text-navy">
                        Disponible le 15 mars ?
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-end">
                    <div
                      class="bg-navy rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[80%]"
                    >
                      <p class="font-space text-[0.55rem] text-cream">
                        Oui, avec plaisir ! 🏔️
                      </p>
                    </div>
                  </div>
                  <div class="flex justify-start">
                    <div
                      class="bg-white rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[80%] shadow-sm"
                    >
                      <p class="font-space text-[0.55rem] text-navy">
                        Je t'envoie une résa 👍
                      </p>
                    </div>
                  </div>
                  <div
                    class="bg-white rounded-xl p-2 shadow-sm"
                    style="border: 1px solid rgba(14, 34, 74, 0.08)"
                  >
                    <p
                      class="font-space text-[0.44rem] text-blue font-bold uppercase tracking-wide mb-1"
                    >
                      Proposition
                    </p>
                    <p class="font-roca font-bold text-navy text-[0.62rem]">
                      Randonnée Mont-Blanc
                    </p>
                    <p class="font-space text-[0.48rem] text-navy/50">
                      15 mars · 45€
                    </p>
                    <div class="flex gap-1 mt-1.5">
                      <span
                        class="flex-1 text-center bg-navy rounded-md py-1 font-space text-[0.44rem] text-cream font-bold"
                        >Accepter</span
                      >
                      <span
                        class="flex-1 text-center rounded-md py-1 font-space text-[0.44rem] text-navy/50"
                        style="border: 1px solid rgba(14, 34, 74, 0.15)"
                        >Refuser</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 class="font-roca font-bold text-navy text-[1.08rem] xl:text-[1.2rem] mb-2">
              Discute &amp; planifie
            </h3>
            <p
              class="font-space text-[1rem] text-charcoal/80 leading-[1.75]  mx-auto"
            >
              Échange directement avec ton hôte et conviens des détails dans le
              chat intégré.
            </p>
          </div>

          <!-- Étape 3 — Réserver -->
          <div class="how-step text-center">
            <div class="phone-frame mx-auto mb-7">
              <div class="phone-vol-up" />
              <div class="phone-vol-down" />
              <div class="phone-power" />
              <div class="phone-screen">
                <div class="phone-status">
                  <span>9:41</span>
                  <div class="phone-island" />
                  <div class="flex items-center gap-1">
                    <svg class="h-2 w-3" viewBox="0 0 12 8" fill="currentColor"><rect x="0" y="3" width="2" height="5" rx="0.4"/><rect x="3" y="2" width="2" height="6" rx="0.4"/><rect x="6" y="1" width="2" height="7" rx="0.4"/><rect x="9" y="0" width="2" height="8" rx="0.4" opacity="0.25"/></svg>
                    <svg class="h-2.5 w-5" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="17" height="9" rx="2" stroke="currentColor" stroke-width="1"/><rect x="17.5" y="3" width="2" height="4" rx="1" fill="currentColor"/><rect x="1.5" y="1.5" width="11" height="7" rx="1.5" fill="currentColor"/></svg>
                  </div>
                </div>
                <div class="px-3 pt-3 pb-3 text-center">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                    style="background: rgba(52, 211, 153, 0.15)"
                  >
                    <svg
                      class="w-5 h-5"
                      style="color: #10b981"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <p class="font-roca font-bold text-navy text-[0.78rem]">
                    Réservé !
                  </p>
                  <p class="font-space text-[0.5rem] text-navy/45 mt-0.5">
                    Ton expérience t'attend
                  </p>
                </div>
                <div class="mx-2.5 bg-navy rounded-2xl p-3">
                  <div class="flex items-center gap-2 mb-2.5">
                    <img
                      :src="avatar('Marc')"
                      class="w-8 h-8 rounded-full shrink-0"
                      style="box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15)"
                      alt=""
                    />
                    <div>
                      <p class="font-roca font-bold text-cream text-[0.68rem]">
                        Marc
                      </p>
                      <p class="font-space text-[0.48rem] text-cream/45">
                        Randonnée · Chamonix
                      </p>
                    </div>
                  </div>
                  <div class="space-y-1.5">
                    <div class="flex justify-between">
                      <span class="font-space text-[0.5rem] text-cream/45"
                        >Activité</span
                      >
                      <span
                        class="font-space text-[0.56rem] font-bold text-cream"
                        >Mont-Blanc</span
                      >
                    </div>
                    <div class="flex justify-between">
                      <span class="font-space text-[0.5rem] text-cream/45"
                        >Date</span
                      >
                      <span
                        class="font-space text-[0.56rem] font-bold text-cream"
                        >15 mars</span
                      >
                    </div>
                    <div class="flex justify-between">
                      <span class="font-space text-[0.5rem] text-cream/45"
                        >Prix</span
                      >
                      <span
                        class="font-space text-[0.56rem] font-bold text-blue"
                        >45€</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 class="font-roca font-bold text-navy text-[1.08rem] xl:text-[1.2rem] mb-2">
              Réserve en 1 clic
            </h3>
            <p
              class="font-space text-[1rem] text-charcoal/80 leading-[1.75]  mx-auto"
            >
              Confirme ta réservation dans l'app et prépare-toi à vivre quelque
              chose d'unique.
            </p>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center">
          <NuxtLink
            to="/signup"
            class="inline-block px-8 py-4 rounded-full bg-navy text-cream font-roca font-bold text-[1rem] no-underline hover:bg-blue transition-colors shadow-[0_4px_20px_rgba(14,34,74,0.22)]"
          >
            Rejoindre Nomu
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         APP SPLIT — image + texte navy
    ══════════════════════════════════════ -->
    <section class="px-4 sm:px-5 py-4">
      <div
        class="app-split overflow-hidden rounded-[28px] flex flex-col lg:flex-row mt-10"
        style="min-height: 520px"
      >
        <!-- Gauche : image pleine + overlay card -->
        <div class="relative flex-1 min-h-[300px] lg:min-h-0">
          <img
            src="/img/c28a7559afe67851b956dfe0a46c60e0c0b56238.jpg"
            class="absolute inset-0 w-full h-full object-cover object-center"
            alt=""
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
          />
          <!-- Floating card -->
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-[240px]">
            <div
              class="bg-white/96 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl"
            >
              <p
                class="font-space text-[0.55rem] font-bold uppercase tracking-wider text-blue mb-2"
              >
                ✅ Réservation confirmée
              </p>
              <div class="flex items-center gap-2.5 mb-2.5">
                <img
                  :src="avatar('Marc')"
                  class="w-9 h-9 rounded-full shrink-0"
                  alt=""
                />
                <div class="flex-1 min-w-0">
                  <p
                    class="font-roca font-bold text-navy text-[0.82rem] leading-none"
                  >
                    Marc
                  </p>
                  <p class="font-space text-[0.58rem] text-blue truncate">
                    Randonnée · Chamonix
                  </p>
                </div>
              </div>
              <div class="bg-navy/5 rounded-xl px-3 py-2">
                <p class="font-roca font-bold text-navy text-[0.8rem]">
                  Randonnée Mont-Blanc
                </p>
                <p class="font-space text-[0.58rem] text-navy/50 mt-0.5">
                  15 mars · 8h → 18h ·
                  <span class="text-navy/80 font-bold">45€</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Droite : texte navy -->
        <div
          class="bg-navy flex items-center lg:w-[46%] shrink-0 px-8 py-14 sm:px-12 lg:px-14 xl:px-16"
        >
          <div class="max-w-[400px]">
            <span
              class="font-space text-[0.6rem] font-bold tracking-[0.14em] uppercase text-cream/35 block mb-4"
              >Rejoins la communauté</span
            >
            <h2
              class="font-roca font-bold text-cream leading-[1.05] tracking-[-0.03em] mb-5"
              style="font-size: clamp(1.9rem, 3vw, 2.8rem)"
            >
              Vis des aventures<br /><em class="not-italic text-blue"
                >vraiment locales</em
              >
            </h2>
            <p
              class="font-space text-[0.88rem] text-cream/50 leading-[1.85] mb-8"
            >
              Nomu connecte ceux qui veulent vivre comme des locaux avec ceux
              qui veulent partager leur passion. Simple, authentique, humain.
            </p>
            <NuxtLink
              v-if="!isLoggedIn"
              to="/signup"
              class="inline-block px-7 py-3.5 rounded-full bg-cream text-navy font-roca font-bold text-[0.92rem] no-underline hover:bg-white transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
            >
              Créer un compte gratuit
            </NuxtLink>
            <NuxtLink
              v-else
              to="/explore"
              class="inline-block px-7 py-3.5 rounded-full bg-cream text-navy font-roca font-bold text-[0.92rem] no-underline hover:bg-white transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
            >
              Explorer les profils
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         FEATURE 1 — Proposez vos activités
    ══════════════════════════════════════ -->
    <section class="feature-section py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
      <div class="max-w-[1100px] mx-auto flex items-center gap-12 lg:gap-20">
        <div class="feature-text flex-1">
          <h2
            class="font-roca font-bold text-navy tracking-[-0.04em] leading-[1.06] mb-5"
            style="font-size: clamp(1.9rem, 4vw, 3.2rem)"
          >
            Proposez vos<br />activités locales
          </h2>
          <p
            class="font-space text-[0.88rem] text-charcoal/80 leading-[1.82] mb-7 max-w-[400px]"
          >
            Partagez ce que vous aimez faire chez vous. Randonnée, cuisine,
            escalade — créez une activité en quelques minutes et accueillez des
            voyageurs curieux.
          </p>
          <NuxtLink
            to="/signup"
            class="inline-flex items-center gap-2 font-space text-[0.85rem] font-bold text-blue hover:text-navy transition-colors no-underline border-b-2 border-blue/30 hover:border-navy pb-0.5"
          >
            Créer mon profil
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                clip-rule="evenodd"
              />
            </svg>
          </NuxtLink>
        </div>
        <div class="feature-media hidden lg:flex flex-1 justify-end">
          <div
            class="relative rounded-[24px] overflow-hidden shadow-[0_24px_64px_rgba(14,34,74,0.14)]"
            style="width: 360px; aspect-ratio: 3/4"
          >
            <img
              src="/img/963a1f2e92b33a7e9eb5b189895156e0746cf16e.png"
              class="w-full h-full object-cover"
              style="object-position: center 60%"
              alt=""
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent"
            />
            <div
              class="absolute bottom-4 left-3 right-3 bg-white/92 backdrop-blur-md rounded-xl p-3 flex items-center gap-2.5 shadow-lg"
            >
              <img
                :src="avatar('Marc')"
                class="w-9 h-9 rounded-full shrink-0"
                alt=""
              />
              <div class="flex-1 min-w-0">
                <p
                  class="font-roca font-bold text-navy text-[0.82rem] leading-none mb-0.5"
                >
                  Marc
                </p>
                <p class="font-space text-[0.6rem] text-blue truncate">
                  Vélo &amp; Nature · Nouvelle-Zélande
                </p>
              </div>
              <span
                class="shrink-0 font-space text-[0.58rem] font-bold text-white bg-blue px-2 py-1 rounded-full"
                >Dispo</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         FEATURE 2 — fond navy, Explorez
    ══════════════════════════════════════ -->
    <section
      class="feature-section feature-reversed py-20 sm:py-28 px-6 sm:px-12 lg:px-20 bg-navy"
    >
      <div
        class="max-w-[1100px] mx-auto flex items-center gap-12 lg:gap-20 flex-row-reverse"
      >
        <div class="feature-text flex-1">
          <h2
            class="font-roca font-bold text-cream tracking-[-0.04em] leading-[1.06] mb-5"
            style="font-size: clamp(1.9rem, 4vw, 3.2rem)"
          >
            Explorez les<br /><em class="not-italic text-blue">passionnés</em>
            locaux
          </h2>
          <p
            class="font-space text-[0.88rem] text-cream/80 leading-[1.82] mb-7 max-w-[400px]"
          >
            En voyage, trouvez un expert local prêt à partager ses secrets de
            ville. Des milliers d'expériences authentiques, loin des circuits
            touristiques.
          </p>
          <NuxtLink
            to="/explore"
            class="inline-flex items-center gap-2 font-space text-[0.85rem] font-bold text-cream hover:text-blue transition-colors no-underline border-b-2 border-cream/25 hover:border-blue pb-0.5"
          >
            Explorer les profils
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                clip-rule="evenodd"
              />
            </svg>
          </NuxtLink>
        </div>
        <div class="feature-media hidden lg:flex flex-1 justify-start">
          <div
            class="relative rounded-[24px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
            style="width: 360px; aspect-ratio: 3/4"
          >
            <img
              src="/img/c28a7559afe67851b956dfe0a46c60e0c0b56238.jpg"
              class="w-full h-full object-cover object-center"
              alt=""
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent"
            />
            <div class="absolute bottom-4 left-4">
              <span
                class="bg-[rgba(255,106,87,0.9)] text-white font-space text-[0.65rem] font-bold px-3 py-1.5 rounded-full shadow-lg"
                >Escalade &amp; Canyoning</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         FEATURE 3 — Réservez
    ══════════════════════════════════════ -->
    <section class="feature-section py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
      <div class="max-w-[1100px] mx-auto flex items-center gap-12 lg:gap-20">
        <div class="feature-text flex-1">
          <h2
            class="font-roca font-bold text-navy tracking-[-0.04em] leading-[1.06] mb-5"
            style="font-size: clamp(1.9rem, 4vw, 3.2rem)"
          >
            Réservez en<br />quelques clics
          </h2>
          <p
            class="font-space text-[0.88rem] text-charcoal/80 leading-[1.82] mb-7 max-w-[400px]"
          >
            Discutez directement avec votre hôte, proposez une date et confirmez
            votre expérience. Aussi simple que d'envoyer un message.
          </p>
          <NuxtLink
            to="/signup"
            class="inline-flex items-center gap-2 font-space text-[0.85rem] font-bold text-blue hover:text-navy transition-colors no-underline border-b-2 border-blue/30 hover:border-navy pb-0.5"
          >
            Commencer maintenant
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                clip-rule="evenodd"
              />
            </svg>
          </NuxtLink>
        </div>
        <div class="feature-media hidden lg:flex flex-1 justify-end">
          <div
            class="relative rounded-[24px] overflow-hidden shadow-[0_24px_64px_rgba(14,34,74,0.14)]"
            style="width: 360px; aspect-ratio: 3/4"
          >
            <img
              src="/img/ff6e53520532cef4432e3e0519c8b8be951b110d.png"
              class="w-full h-full object-cover"
              style="object-position: center 30%"
              alt=""
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         PROFILS — carousel
    ══════════════════════════════════════ -->
    <section class="profiles-section py-14 px-4 sm:px-5">
      <div class="bg-[#F0EDE6] rounded-[24px] py-12 px-6 sm:px-10">
        <div class="flex items-end justify-between mb-8 max-w-[980px] mx-auto">
          <div>
            <p
              class="font-space text-[0.65rem] font-bold tracking-[0.12em] uppercase text-blue/60 mb-2"
            >
              À découvrir
            </p>
            <h2
              class="font-roca font-bold text-navy text-[1.5rem] tracking-[-0.03em]"
            >
              Profils populaires
            </h2>
          </div>
          <NuxtLink
            to="/explore"
            class="inline-flex items-center gap-1.5 font-space text-[0.78rem] text-blue no-underline opacity-55 hover:opacity-100 transition-opacity"
            >Voir tout <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6 6l6-6m-6-6l6 6"/></svg></NuxtLink
          >
        </div>

        <div
          v-if="profilesLoading"
          class="profiles-scroll flex gap-3 overflow-x-auto pb-2"
        >
          <div
            v-for="i in 8"
            :key="i"
            class="relative shrink-0 rounded-[18px] overflow-hidden"
            style="width: 140px; height: 195px"
          >
            <USkeleton class="absolute inset-0" style="border-radius: 18px" />
          </div>
        </div>

        <div
          v-else-if="popularProfiles.length"
          class="profiles-scroll flex gap-3 overflow-x-auto pb-2"
        >
          <template v-for="(profile, i) in popularProfiles" :key="profile.id">
            <NuxtLink
              v-if="isLoggedIn"
              :to="`/profile/${profile.user_id || profile.id}`"
              :data-index="i"
              class="profile-card-anim relative shrink-0 rounded-[18px] overflow-hidden no-underline block border-none cursor-pointer shadow-[0_4px_16px_rgba(14,34,74,0.1)] hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(14,34,74,0.2)] transition-all duration-200"
              style="width: 140px; height: 195px"
            >
              <img
                :src="profileAvatarUrl(profile)"
                class="absolute inset-0 w-full h-full object-cover"
                alt=""
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(14,34,74,0.9)]"
              />
              <span
                v-if="firstInterest(profile)"
                class="absolute top-2 left-2 bg-[rgba(255,106,87,0.9)] text-white font-space text-[0.57rem] font-bold px-2 py-0.5 rounded-full truncate max-w-[calc(100%-1rem)]"
                >{{ firstInterest(profile) }}</span
              >
              <div class="absolute bottom-0 left-0 right-0 px-3 pb-3">
                <p class="font-roca font-bold text-[0.82rem] text-white truncate">
                  {{ profile.name }}
                </p>
                <p
                  v-if="profile.city"
                  class="font-space text-[0.58rem] text-white/55 truncate"
                >
                  {{ profile.city }}
                </p>
              </div>
            </NuxtLink>
            <button
              v-else
              :data-index="i"
              class="profile-card-anim relative shrink-0 rounded-[18px] overflow-hidden no-underline block border-none cursor-pointer shadow-[0_4px_16px_rgba(14,34,74,0.1)] hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(14,34,74,0.2)] transition-all duration-200"
              style="width: 140px; height: 195px"
              @click="ShowModalorRedirect(profile, $event)"
            >
              <img
                :src="profileAvatarUrl(profile)"
                class="absolute inset-0 w-full h-full object-cover"
                alt=""
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(14,34,74,0.9)]"
              />
              <span
                v-if="firstInterest(profile)"
                class="absolute top-2 left-2 bg-[rgba(255,106,87,0.9)] text-white font-space text-[0.57rem] font-bold px-2 py-0.5 rounded-full truncate max-w-[calc(100%-1rem)]"
                >{{ firstInterest(profile) }}</span
              >
              <div class="absolute bottom-0 left-0 right-0 px-3 pb-3">
                <p class="font-roca font-bold text-[0.82rem] text-white truncate">
                  {{ profile.name }}
                </p>
                <p
                  v-if="profile.city"
                  class="font-space text-[0.58rem] text-white/55 truncate"
                >
                  {{ profile.city }}
                </p>
              </div>
            </button>
          </template>
        </div>

        <div v-else class="text-center py-10">
          <NuxtLink
            to="/explore"
            class="inline-block px-6 py-3 rounded-full bg-blue text-white font-roca font-bold text-[0.9rem] no-underline hover:bg-navy transition-colors"
            >Explorer les profils</NuxtLink
          >
        </div>

        <!-- Search bar inside profiles section -->
        <form
          @submit.prevent="searchProfiles"
          class="flex gap-2 mt-8 max-w-[520px] mx-auto"
        >
          <div
            class="flex-1 flex items-center gap-3 bg-white border border-navy/15 rounded-2xl px-5 py-3.5 shadow-[0_2px_8px_rgba(14,34,74,0.06)] focus-within:border-navy/40 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 text-navy/35 shrink-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
            <input
              v-model="query"
              type="search"
              class="flex-1 border-none bg-transparent font-space text-[0.88rem] text-navy outline-none placeholder:text-navy/30"
              placeholder="Rechercher une activité, une ville…"
            />
          </div>
          <button
            type="submit"
            class="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-navy text-cream font-roca font-bold text-[0.9rem] border-none cursor-pointer hover:bg-blue transition-colors shadow-[0_4px_16px_rgba(14,34,74,0.2)] whitespace-nowrap"
          >
            Rechercher
            <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6 6l6-6m-6-6l6 6"/></svg>
          </button>
        </form>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         INTERESTS — marquee double rangée
    ══════════════════════════════════════ -->
    <section class="py-14 overflow-hidden">
      <p
        class="font-space text-[0.65rem] font-bold tracking-[0.12em] uppercase text-navy/40 text-center mb-6"
      >
        Explorer par passion
      </p>

      <!-- Row 1 — gauche -->
      <div class="overflow-hidden mb-3">
        <div class="marquee-row flex w-max">
          <div class="flex gap-3 pr-3">
            <button
              v-for="tag in tagsRow1"
              :key="'r1a-' + tag"
              class="shrink-0 px-5 py-2.5 rounded-full border-2 border-navy/12 bg-transparent font-space text-[0.82rem] font-bold text-navy cursor-pointer hover:bg-navy hover:text-cream hover:border-navy transition-all duration-150"
              @click="goSearch(tag)"
            >
              {{ tag }}
            </button>
          </div>
          <div class="flex gap-3 pr-3">
            <button
              v-for="tag in tagsRow1"
              :key="'r1a-' + tag"
              class="shrink-0 px-5 py-2.5 rounded-full border-2 border-navy/12 bg-transparent font-space text-[0.82rem] font-bold text-navy cursor-pointer hover:bg-navy hover:text-cream hover:border-navy transition-all duration-150"
              @click="goSearch(tag)"
            >
              {{ tag }}
            </button>
          </div>
          <div class="flex gap-3 pr-3" aria-hidden="true">
            <button
              v-for="tag in tagsRow1"
              :key="'r1b-' + tag"
              class="shrink-0 px-5 py-2.5 rounded-full border-2 border-navy/12 bg-transparent font-space text-[0.82rem] font-bold text-navy cursor-pointer hover:bg-navy hover:text-cream hover:border-navy transition-all duration-150"
              tabindex="-1"
              @click="goSearch(tag)"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>

      <!-- Row 2 — droite -->
      <div class="overflow-hidden">
        <div class="marquee-row-reverse flex w-max">
          <div class="flex gap-3 pr-3">
            <button
              v-for="tag in tagsRow2"
              :key="'r2a-' + tag"
              class="shrink-0 px-5 py-2.5 rounded-full border-2 border-blue/15 bg-blue/5 font-space text-[0.82rem] font-bold text-blue cursor-pointer hover:bg-blue hover:text-white hover:border-blue transition-all duration-150"
              @click="goSearch(tag)"
            >
              {{ tag }}
            </button>
          </div>
          <div class="flex gap-3 pr-3">
            <button
              v-for="tag in tagsRow2"
              :key="'r2a-' + tag"
              class="shrink-0 px-5 py-2.5 rounded-full border-2 border-blue/15 bg-blue/5 font-space text-[0.82rem] font-bold text-blue cursor-pointer hover:bg-blue hover:text-white hover:border-blue transition-all duration-150"
              @click="goSearch(tag)"
            >
              {{ tag }}
            </button>
          </div>
          <div class="flex gap-3 pr-3" aria-hidden="true">
            <button
              v-for="tag in tagsRow2"
              :key="'r2b-' + tag"
              class="shrink-0 px-5 py-2.5 rounded-full border-2 border-blue/15 bg-blue/5 font-space text-[0.82rem] font-bold text-blue cursor-pointer hover:bg-blue hover:text-white hover:border-blue transition-all duration-150"
              tabindex="-1"
              @click="goSearch(tag)"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         CTA — dark (style WhatsApp footer section)
    ══════════════════════════════════════ -->
    <section class="cta-section px-4 sm:px-5 pb-5">
      <div
        class="cta-inner relative overflow-hidden rounded-[24px] bg-navy text-center py-20 sm:py-28 px-8"
      >
        <img
          src="/img/AdobeStock_96991406.jpg"
          class="absolute inset-0 w-full h-full object-cover opacity-[0.07]"
          style="object-position: center 40%"
          alt=""
          aria-hidden="true"
        />
        <div class="relative z-10 max-w-[600px] mx-auto">
          <h2
            class="font-roca font-bold text-cream tracking-[-0.04em] leading-[1.05] mb-4"
            style="font-size: clamp(2rem, 5vw, 3.5rem)"
          >
            Rejoignez<br />la communauté Nomu
          </h2>
          <p
            class="font-space text-[0.9rem] text-cream/50 leading-[1.75] mb-10"
          >
            Local ou voyageur — souvent les deux à la fois.
          </p>
          <div class="flex gap-3 justify-center flex-wrap">
            <NuxtLink
              v-if="!isLoggedIn"
              to="/signup"
              class="px-8 py-4 rounded-full bg-cream text-navy font-roca font-bold text-[1rem] no-underline hover:bg-white transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >Créer un compte</NuxtLink
            >
            <NuxtLink
              to="/explore"
              class="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-cream/25 text-cream font-space text-[0.9rem] no-underline hover:bg-cream/10 transition-colors"
              >Explorer les profils <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6 6l6-6m-6-6l6 6"/></svg></NuxtLink
            >
          </div>
        </div>
      </div>
    </section>

    <LoginRequiredModal v-model="showLoginModal" />
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

useSeoMeta({
  title: "Nomu — Partage ta ville, explore le monde.",
  description:
    "Propose tes activités locales ou réserve celles des passionnés qui t'accueillent. Ici, chacun est local quelque part.",
  ogTitle: "Nomu — Local & Voyageur à la fois",
  ogDescription:
    "Partage tes passions, rencontre des voyageurs et vis des expériences authentiques.",
  ogImage: "https://app.nomu.charlesremy.dev/img/Nomu_OG.png",
  twitterCard: "summary_large_image",
});

// State
const query = ref("");
const showLoginModal = ref(false);
const router = useRouter();
const { isLoggedIn } = useAuth();

// Refs for GSAP
const heroTitle = ref<HTMLElement>();
const heroSub = ref<HTMLElement>();
const heroCta = ref<HTMLElement>();
const heroBadge = ref<HTMLElement>();
const float1 = ref<HTMLElement>();
const float2 = ref<HTMLElement>();
const float3 = ref<HTMLElement>();
const float4 = ref<HTMLElement>();
const photoAlbum = ref<HTMLElement>();

const albumPhotos = [
  {
    src: "/img/AdobeStock_185639188.jpeg",
    caption: "Randonnée · Chamonix",
    zIndex: 1,
    hoverX: -15,
    hoverY: 2,
  },
  {
    src: "/img/AdobeStock_769910821.jpeg",
    caption: "Escalade · Hanoï",
    zIndex: 3,
    hoverX: -11,
    hoverY: -10,
  },
  {
    src: "/img/AdobeStock_1602836779.jpeg",
    caption: "Activités locales",
    zIndex: 2,
    hoverX: 14,
    hoverY: 5,
  },
  {
    src: "/img/AdobeStock_1899765400.jpeg",
    caption: "Expériences uniques",
    zIndex: 4,
    hoverX: 15,
    hoverY: -1,
  },
];
const albumReady = ref(false)
const albumSpread = [
  { x: -240, y: 38, rotation: -16 },
  { x: -70, y: -60, rotation: 5 },
  { x: 85, y: 32, rotation: -8 },
  { x: 255, y: -20, rotation: 14 },
];

// Data
const {
  results: popularProfiles,
  loading: profilesLoading,
  searchProfiles: doSearch,
} = useProfileSearch({
  query: ref(""),
  interests: ref([]),
  cities: ref([]),
  countries: ref([]),
});

const tagsRow1 = [
  "Yoga",
  "Randonnée",
  "Surf",
  "Photographie",
  "Cuisine",
  "Escalade",
  "Plongée",
  "Vélo",
];
const tagsRow2 = [
  "Musique",
  "Arts & Craft",
  "Méditation",
  "Trail",
  "Kayak",
  "Street art",
  "Danse",
  "Astronomie",
];

// Helpers
function avatar(name: string) {
  const n = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return `https://i.pravatar.cc/500?img=${(n % 70) + 1}`;
}
function parseInterests(interests: string | string[] | undefined): string[] {
  if (!interests) return [];
  if (Array.isArray(interests)) return interests;
  return interests
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
function firstInterest(profile: any) {
  return parseInterests(profile.interests)[0] || null;
}
function profileAvatarUrl(profile: any) {
  if (profile.image_url) return profile.image_url;
  return avatar(profile.name || String(profile.id || "user"));
}
function searchProfiles() {
  router.push({ path: "/explore", query: { q: query.value || "" } });
}
function goSearch(tag: string) {
  router.push({ path: "/explore", query: { q: tag } });
}
function hoverAlbum(i: number, enter: boolean) {
  if (!albumReady.value) return;
  const el = document.querySelectorAll<HTMLElement>(".album-photo")[i];
  if (!el) return;
  const spread = albumSpread[i];
  const photo = albumPhotos[i];
  if (!spread || !photo) return;
  gsap.to(el, {
    x: enter ? spread.x + photo.hoverX : spread.x,
    y: enter ? spread.y + photo.hoverY : spread.y,
    duration: enter ? 0.3 : 0.22,
    ease: enter ? "back.out(1.4)" : "power2.out",
    overwrite: "auto",
  });
}

// Fonction pour afficher la modale de connexion
function ShowModalorRedirect(profile: any, event: Event) {
  event.preventDefault();
  showLoginModal.value = true;
}

// GSAP
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  doSearch();

  // ── Hero entrance (opacity-0 initial via CSS class) ──
  const floatEls = [
    float1.value,
    float2.value,
    float3.value,
    float4.value,
  ].filter(Boolean);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.to(heroBadge.value!, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
    .fromTo(
      heroTitle.value!,
      { y: 50 },
      { opacity: 1, y: 0, duration: 0.9 },
      0.4,
    )
    .fromTo(
      heroSub.value!,
      { y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.65,
    )
    .to(heroCta.value!, { opacity: 1, duration: 0.6 }, 0.85)
    .fromTo(
      floatEls,
      { x: 40 },
      { opacity: 1, x: 0, stagger: 0.15, duration: 0.7, ease: "back.out(1.2)" },
      0.9,
    );

  // ── Manifesto avatars ──
  gsap.from(".manifesto-avatar", {
    scrollTrigger: { trigger: ".manifesto-section", start: "top 80%" },
    y: 30,
    opacity: 0,
    stagger: 0.07,
    duration: 0.6,
    ease: "power2.out",
  });
  gsap.from(".manifesto-quote", {
    scrollTrigger: { trigger: ".manifesto-section", start: "top 65%" },
    y: 45,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  });

  // ── Feature sections ──
  document
    .querySelectorAll<HTMLElement>(".feature-section")
    .forEach((section) => {
      const reversed = section.classList.contains("feature-reversed");
      const text = section.querySelector(".feature-text");
      const media = section.querySelector(".feature-media");
      if (text)
        gsap.from(text, {
          scrollTrigger: { trigger: section, start: "top 72%" },
          x: reversed ? 60 : -60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      if (media)
        gsap.from(media, {
          scrollTrigger: { trigger: section, start: "top 72%" },
          x: reversed ? -60 : 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.18,
        });
    });

  // ── Profiles ──
  gsap.from(".profiles-section", {
    scrollTrigger: { trigger: ".profiles-section", start: "top 80%" },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });
  gsap.from(".profile-card-anim", {
    scrollTrigger: { trigger: ".profiles-section", start: "top 70%" },
    y: 30,
    opacity: 0,
    stagger: 0.07,
    duration: 0.55,
    ease: "power2.out",
    delay: 0.25,
  });

  // ── CTA ──
  gsap.from(".cta-inner", {
    scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // ── App split ──
  gsap.from(".app-split", {
    scrollTrigger: { trigger: ".app-split", start: "top 78%" },
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
  });

  // ── How section ──
  gsap.from(".how-header", {
    scrollTrigger: { trigger: ".how-section", start: "top 76%" },
    y: 35,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });
  gsap.from(".how-step", {
    scrollTrigger: { trigger: ".how-section", start: "top 65%" },
    y: 55,
    opacity: 0,
    stagger: 0.15,
    duration: 0.75,
    ease: "power3.out",
    delay: 0.15,
  });

  // ── Album photo — toutes les photos empilées au centre, puis éventail au scroll ──
  if (photoAlbum.value) {
    gsap.set(".album-photo", { rotation: 0, x: 0, y: 0 });
    gsap.to(".album-photo", {
      scrollTrigger: { trigger: photoAlbum.value, start: "top 75%" },
      x: (i: number) => albumSpread[i]?.x ?? 0,
      y: (i: number) => albumSpread[i]?.y ?? 0,
      rotation: (i: number) => albumSpread[i]?.rotation ?? 0,
      stagger: 0.1,
      duration: 0.9,
      ease: "back.out(1.4)",
      onComplete: () => { albumReady.value = true },
    });
  }
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<style scoped>
.profiles-scroll {
  scrollbar-width: none;
}
.profiles-scroll::-webkit-scrollbar {
  display: none;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.marquee-row {
  animation: marquee 32s linear infinite;
  will-change: transform;
}
.marquee-row-reverse {
  animation: marquee 26s linear infinite reverse;
  will-change: transform;
}
.marquee-row:hover,
.marquee-row-reverse:hover {
  animation-play-state: paused;
}

/* ── Phone mockup ── */
.phone-frame {
  width: 180px;
  height: 362px;
  background: linear-gradient(160deg, #2e2e32 0%, #18181b 100%);
  border-radius: 40px;
  position: relative;
  overflow: visible;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 0 rgba(255, 255, 255, 0.04),
    0 30px 64px rgba(0, 0, 0, 0.55),
    0 8px 20px rgba(0, 0, 0, 0.3);
}
.phone-screen {
  position: absolute;
  inset: 4px;
  border-radius: 36px;
  background: #f0ebe3;
  overflow: hidden;
}
.phone-island {
  width: 56px;
  height: 18px;
  background: #0a0a0b;
  border-radius: 20px;
  flex-shrink: 0;
}
.phone-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 6px;
  font-family: 'Space Mono', monospace;
  font-size: 0.5rem;
  font-weight: 700;
  color: #18181b;
  line-height: 1;
}
.phone-vol-up,
.phone-vol-down {
  position: absolute;
  left: -3px;
  width: 3px;
  background: linear-gradient(to right, #222226, #36363a);
  border-radius: 2px 0 0 2px;
}
.phone-vol-up  { top: 90px;  height: 28px; }
.phone-vol-down{ top: 126px; height: 28px; }
.phone-power {
  position: absolute;
  right: -3px;
  top: 108px;
  width: 3px;
  height: 46px;
  background: linear-gradient(to left, #222226, #36363a);
  border-radius: 0 2px 2px 0;
}

/* ── Album photo ── */
.album-wrap {
  user-select: none;
}
.album-photo {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -155px;
  margin-top: -162px;
  width: 310px;
  background: #fff;
  padding: 12px 12px 36px;
  box-shadow: 0 6px 28px rgba(14, 34, 74, 0.18);
  will-change: transform;
  cursor: pointer;
}
.album-img {
  display: block;
  width: 100%;
  height: 270px;
  object-fit: cover;
}
.album-caption {
  display: block;
  margin-top: 10px;
  text-align: center;
  font-family: "Space Mono", monospace;
  font-size: 0.8rem;
  color: rgba(14, 34, 74, 0.8);
  letter-spacing: 0.03em;
}
</style>
