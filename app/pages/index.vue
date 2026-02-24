<template>
  <div class="bg-cream">

    <!-- ══════════════════════════════════════
         HERO — plein cadre arrondi (style WhatsApp)
    ══════════════════════════════════════ -->
    <section class="px-4 py-4 sm:px-5 sm:py-5">
      <div class="relative rounded-[20px] sm:rounded-[28px] overflow-hidden" style="min-height: 88vh;">

        <img
          src="/img/Randonneurs.jpeg"
          class="absolute inset-0 w-full h-full object-cover"
          style="object-position: 55% 35%"
          alt=""
        />
        <div class="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/35 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />

        <!-- Content -->
        <div class="relative z-10 flex flex-col justify-end p-8 sm:p-14" style="min-height: 88vh; padding-bottom: 4rem;">

          <!-- Bottom-left: title + CTA -->
          <div class="max-w-[520px]">
            <span ref="heroBadge" class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white font-space text-[0.68rem] font-bold tracking-[0.08em] uppercase px-4 py-[0.4rem] rounded-full mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-cream" />
              Local · Voyageur · Les deux à la fois
            </span>
            <h1 ref="heroTitle" class="font-roca font-bold text-white leading-[1.04] tracking-[-0.04em] mb-5" style="font-size: clamp(2.8rem, 5.5vw, 4.5rem);">
              Partage ta ville,<br>explore le monde.
            </h1>
            <p ref="heroSub" class="font-space text-[0.9rem] text-white/65 leading-[1.78] mb-8 max-w-[400px]">
              Propose tes activités ou réserve celles des passionnés qui t'accueillent. Ici, tout le monde est local quelque part.
            </p>
            <div ref="heroCta" class="flex gap-3 flex-wrap">
              <NuxtLink v-if="!isLoggedIn" to="/signup" class="px-6 py-3.5 rounded-full bg-cream text-navy font-roca font-bold text-[0.95rem] no-underline hover:bg-white transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                Créer un compte
              </NuxtLink>
              <NuxtLink to="/explore" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/15 backdrop-blur-md text-white font-space text-[0.88rem] no-underline border border-white/30 hover:bg-white/25 transition-colors">
                Explorer
                <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="evenodd" d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/></svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Right: floating UI cards -->
          <div class="absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 flex-col gap-4 hidden lg:flex">
            <div ref="float1" class="bg-white/92 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl w-[230px]">
              <img :src="avatar('Léa')" class="w-11 h-11 rounded-full shrink-0 bg-blue/20" alt="" />
              <div class="flex-1 min-w-0">
                <p class="font-roca font-bold text-navy text-[0.9rem] leading-none mb-0.5">Léa</p>
                <p class="font-space text-[0.62rem] text-blue">Randonnée · Chamonix</p>
              </div>
              <span class="w-2 h-2 rounded-full bg-unread shrink-0" />
            </div>

            <div ref="float2" class="bg-[rgba(255,106,87,0.93)] backdrop-blur-sm px-4 py-2.5 rounded-full self-end shadow-xl">
              <span class="font-space text-white text-[0.72rem] font-bold">Escalade · Hanoï</span>
            </div>

            <div ref="float3" class="bg-white/92 backdrop-blur-md rounded-2xl px-4 py-3.5 shadow-2xl w-[250px]">
              <p class="font-space text-[0.58rem] text-blue/60 uppercase tracking-wider mb-1.5">Nouvelle activité</p>
              <p class="font-roca font-bold text-navy text-[0.95rem] leading-tight">Plongée à Malte</p>
              <div class="flex items-center justify-between mt-1.5">
                <p class="font-space text-[0.62rem] text-charcoal/50">Marc · 3h · 45€</p>
                <span class="font-space text-[0.6rem] font-bold text-white bg-blue px-2 py-0.5 rounded-full">Dispo</span>
              </div>
            </div>

            <div ref="float4" class="bg-white/85 backdrop-blur-sm px-3.5 py-2 rounded-full self-center shadow-lg flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-blue" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span class="font-space text-[0.7rem] font-bold text-navy">30+ villes dans le monde</span>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════
         MANIFESTE — avatars flottants + grande citation
    ══════════════════════════════════════ -->
    <section class="manifesto-section relative py-10 overflow-hidden" style="min-height: 520px;">

      <!-- Avatars top -->
      <div class="manifesto-avatar absolute hidden sm:block" style="top:6%; left:6%">
        <img :src="avatar('Nina')" class="w-14 h-14 rounded-full shadow-lg ring-2 ring-white" alt="" />
      </div>
      <div class="manifesto-avatar absolute hidden sm:flex items-center gap-2" style="top:10%; left:42%">
        <img :src="avatar('Tom')" class="w-10 h-10 rounded-full shadow-md ring-2 ring-white shrink-0" alt="" />
        <div class="bg-white rounded-2xl px-3 py-2 shadow-md">
          <p class="font-space text-[0.72rem] text-navy font-bold">On se retrouve quand ?</p>
          <p class="font-space text-[0.55rem] text-navy/35 mt-0.5 text-right">14:22</p>
        </div>
      </div>
      <div class="manifesto-avatar absolute hidden lg:block" style="top:5%; right:8%">
        <img :src="avatar('Emma')" class="w-16 h-16 rounded-full shadow-lg ring-2 ring-white" alt="" />
      </div>
      <div class="manifesto-avatar absolute hidden lg:flex items-center gap-2" style="top:28%; left:14%">
        <img :src="avatar('Jules')" class="w-10 h-10 rounded-full shadow-md ring-2 ring-white shrink-0" alt="" />
        <div class="bg-white rounded-2xl px-3 py-2 shadow-md">
          <p class="font-space text-[0.72rem] text-navy font-bold">Hola !</p>
          <p class="font-space text-[0.55rem] text-navy/35 mt-0.5 text-right">09:47</p>
        </div>
      </div>
      <div class="manifesto-avatar absolute hidden lg:block" style="top:20%; right:18%">
        <img :src="avatar('Sofia')" class="w-12 h-12 rounded-full shadow-md ring-2 ring-white" alt="" />
      </div>

      <!-- Quote centrale -->
      <div class="manifesto-quote max-w-[820px] mx-auto text-center px-6 py-28 relative z-10">
        <p class="font-roca font-bold text-navy tracking-[-0.03em] leading-[1.22]" style="font-size: clamp(1.5rem, 3.2vw, 2.6rem);">
          Les rencontres authentiques vous permettent d'explorer le monde autrement, de partager ce que vous aimez et de vous sentir chez vous, où que vous soyez.
        </p>
      </div>

      <!-- Avatars bottom -->
      <div class="manifesto-avatar absolute hidden sm:block" style="bottom:8%; left:10%">
        <img :src="avatar('Lucia')" class="w-12 h-12 rounded-full shadow-lg ring-2 ring-white" alt="" />
      </div>
      <div class="manifesto-avatar absolute hidden lg:flex items-center gap-2" style="bottom:14%; left:32%">
        <img :src="avatar('Kenji')" class="w-10 h-10 rounded-full shadow-md ring-2 ring-white shrink-0" alt="" />
        <div class="bg-white rounded-2xl px-3 py-2 shadow-md">
          <p class="font-space text-[0.72rem] text-navy font-bold">À bientôt !</p>
          <p class="font-space text-[0.55rem] text-navy/35 mt-0.5 text-right">16:05</p>
        </div>
      </div>
      <div class="manifesto-avatar absolute hidden sm:block" style="bottom:6%; right:7%">
        <img :src="avatar('Amara')" class="w-14 h-14 rounded-full shadow-lg ring-2 ring-white" alt="" />
      </div>
      <div class="manifesto-avatar absolute hidden lg:flex flex-row-reverse items-center gap-2" style="bottom:18%; right:20%">
        <img :src="avatar('Ryo')" class="w-10 h-10 rounded-full shadow-md ring-2 ring-white shrink-0" alt="" />
        <div class="bg-white rounded-2xl px-3 py-2 shadow-md">
          <p class="font-space text-[0.72rem] text-navy font-bold">Prêt pour demain ?</p>
          <p class="font-space text-[0.55rem] text-navy/35 mt-0.5">11:30</p>
        </div>
      </div>

    </section>


    <!-- ══════════════════════════════════════
         FEATURE 1 — Proposez vos activités
    ══════════════════════════════════════ -->
    <section class="feature-section py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
      <div class="max-w-[1100px] mx-auto flex items-center gap-12 lg:gap-20">
        <div class="feature-text flex-1">
          <h2 class="font-roca font-bold text-navy tracking-[-0.04em] leading-[1.06] mb-5" style="font-size: clamp(1.9rem, 4vw, 3.2rem);">
            Proposez vos<br>activités locales
          </h2>
          <p class="font-space text-[0.88rem] text-charcoal/65 leading-[1.82] mb-7 max-w-[400px]">
            Partagez ce que vous aimez faire chez vous. Randonnée, cuisine, escalade — créez une activité en quelques minutes et accueillez des voyageurs curieux.
          </p>
          <NuxtLink to="/signup" class="inline-flex items-center gap-2 font-space text-[0.85rem] font-bold text-blue hover:text-navy transition-colors no-underline border-b-2 border-blue/30 hover:border-navy pb-0.5">
            Créer mon profil
            <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="evenodd" d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/></svg>
          </NuxtLink>
        </div>
        <div class="feature-media hidden lg:flex flex-1 justify-end">
          <div class="relative rounded-[24px] overflow-hidden shadow-[0_24px_64px_rgba(14,34,74,0.14)]" style="width: 360px; aspect-ratio: 3/4;">
            <img src="/img/963a1f2e92b33a7e9eb5b189895156e0746cf16e.png" class="w-full h-full object-cover" style="object-position: center 60%" alt="" />
            <div class="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
            <div class="absolute bottom-4 left-3 right-3 bg-white/92 backdrop-blur-md rounded-xl p-3 flex items-center gap-2.5 shadow-lg">
              <img :src="avatar('Marc')" class="w-9 h-9 rounded-full shrink-0" alt="" />
              <div class="flex-1 min-w-0">
                <p class="font-roca font-bold text-navy text-[0.82rem] leading-none mb-0.5">Marc</p>
                <p class="font-space text-[0.6rem] text-blue truncate">Vélo &amp; Nature · Nouvelle-Zélande</p>
              </div>
              <span class="shrink-0 font-space text-[0.58rem] font-bold text-white bg-blue px-2 py-1 rounded-full">Dispo</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════
         FEATURE 2 — fond navy, Explorez
    ══════════════════════════════════════ -->
    <section class="feature-section feature-reversed py-20 sm:py-28 px-6 sm:px-12 lg:px-20 bg-navy">
      <div class="max-w-[1100px] mx-auto flex items-center gap-12 lg:gap-20 flex-row-reverse">
        <div class="feature-text flex-1">
          <h2 class="font-roca font-bold text-cream tracking-[-0.04em] leading-[1.06] mb-5" style="font-size: clamp(1.9rem, 4vw, 3.2rem);">
            Explorez les<br><em class="not-italic text-blue">passionnés</em> locaux
          </h2>
          <p class="font-space text-[0.88rem] text-cream/55 leading-[1.82] mb-7 max-w-[400px]">
            En voyage, trouvez un expert local prêt à partager ses secrets de ville. Des milliers d'expériences authentiques, loin des circuits touristiques.
          </p>
          <NuxtLink to="/explore" class="inline-flex items-center gap-2 font-space text-[0.85rem] font-bold text-cream hover:text-blue transition-colors no-underline border-b-2 border-cream/25 hover:border-blue pb-0.5">
            Explorer les profils
            <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="evenodd" d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/></svg>
          </NuxtLink>
        </div>
        <div class="feature-media hidden lg:flex flex-1 justify-start">
          <div class="relative rounded-[24px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.4)]" style="width: 360px; aspect-ratio: 3/4;">
            <img src="/img/c28a7559afe67851b956dfe0a46c60e0c0b56238.jpg" class="w-full h-full object-cover object-center" alt="" />
            <div class="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />
            <div class="absolute bottom-4 left-4">
              <span class="bg-[rgba(255,106,87,0.9)] text-white font-space text-[0.65rem] font-bold px-3 py-1.5 rounded-full shadow-lg">Escalade &amp; Canyoning</span>
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
          <h2 class="font-roca font-bold text-navy tracking-[-0.04em] leading-[1.06] mb-5" style="font-size: clamp(1.9rem, 4vw, 3.2rem);">
            Réservez en<br>quelques clics
          </h2>
          <p class="font-space text-[0.88rem] text-charcoal/65 leading-[1.82] mb-7 max-w-[400px]">
            Discutez directement avec votre hôte, proposez une date et confirmez votre expérience. Aussi simple que d'envoyer un message.
          </p>
          <NuxtLink to="/signup" class="inline-flex items-center gap-2 font-space text-[0.85rem] font-bold text-blue hover:text-navy transition-colors no-underline border-b-2 border-blue/30 hover:border-navy pb-0.5">
            Commencer maintenant
            <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" fill-rule="evenodd" d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/></svg>
          </NuxtLink>
        </div>
        <div class="feature-media hidden lg:flex flex-1 justify-end">
          <div class="relative rounded-[24px] overflow-hidden shadow-[0_24px_64px_rgba(14,34,74,0.14)]" style="width: 360px; aspect-ratio: 3/4;">
            <img src="/img/ff6e53520532cef4432e3e0519c8b8be951b110d.png" class="w-full h-full object-cover" style="object-position: center 30%" alt="" />
            <div class="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
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
            <p class="font-space text-[0.65rem] font-bold tracking-[0.12em] uppercase text-blue/60 mb-2">À découvrir</p>
            <h2 class="font-roca font-bold text-navy text-[1.5rem] tracking-[-0.03em]">Profils populaires</h2>
          </div>
          <NuxtLink to="/explore" class="font-space text-[0.78rem] text-blue no-underline opacity-55 hover:opacity-100 transition-opacity">Voir tout →</NuxtLink>
        </div>

        <div v-if="profilesLoading" class="profiles-scroll flex gap-3 overflow-x-auto pb-2">
          <div v-for="i in 8" :key="i" class="relative shrink-0 rounded-[18px] overflow-hidden" style="width:140px;height:195px;">
            <USkeleton class="absolute inset-0" style="border-radius:18px;" />
          </div>
        </div>

        <div v-else-if="popularProfiles.length" class="profiles-scroll flex gap-3 overflow-x-auto pb-2">
          <component
            :is="isLoggedIn ? 'NuxtLink' : 'button'"
            v-for="(profile, i) in popularProfiles"
            :key="profile.id"
            :data-index="i"
            v-bind="isLoggedIn ? { to: `/profile/${profile.user_id || profile.id}` } : {}"
            class="profile-card-anim relative shrink-0 rounded-[18px] overflow-hidden no-underline block border-none cursor-pointer shadow-[0_4px_16px_rgba(14,34,74,0.1)] hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(14,34,74,0.2)] transition-all duration-200"
            style="width:140px;height:195px;"
            @click="!isLoggedIn && (showLoginModal = true)"
          >
            <img :src="profileAvatarUrl(profile)" class="absolute inset-0 w-full h-full object-cover" alt="" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(14,34,74,0.9)]" />
            <span v-if="firstInterest(profile)" class="absolute top-2 left-2 bg-[rgba(255,106,87,0.9)] text-white font-space text-[0.57rem] font-bold px-2 py-0.5 rounded-full truncate max-w-[calc(100%-1rem)]">{{ firstInterest(profile) }}</span>
            <div class="absolute bottom-0 left-0 right-0 px-3 pb-3">
              <p class="font-roca font-bold text-[0.82rem] text-white truncate">{{ profile.name }}</p>
              <p v-if="profile.city" class="font-space text-[0.58rem] text-white/55 truncate">{{ profile.city }}</p>
            </div>
          </component>
        </div>

        <div v-else class="text-center py-10">
          <NuxtLink to="/explore" class="inline-block px-6 py-3 rounded-full bg-blue text-white font-roca font-bold text-[0.9rem] no-underline hover:bg-navy transition-colors">Explorer les profils</NuxtLink>
        </div>

        <!-- Search bar inside profiles section -->
        <form @submit.prevent="searchProfiles" class="flex gap-2 mt-8 max-w-[520px] mx-auto">
          <div class="flex-1 flex items-center gap-3 bg-white border border-navy/15 rounded-2xl px-5 py-3.5 shadow-[0_2px_8px_rgba(14,34,74,0.06)] focus-within:border-navy/40 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-navy/35 shrink-0">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
            <input v-model="query" type="search" class="flex-1 border-none bg-transparent font-space text-[0.88rem] text-navy outline-none placeholder:text-navy/30" placeholder="Rechercher une activité, une ville…" />
          </div>
          <button type="submit" class="px-5 py-3.5 rounded-2xl bg-navy text-cream font-roca font-bold text-[0.9rem] border-none cursor-pointer hover:bg-blue transition-colors shadow-[0_4px_16px_rgba(14,34,74,0.2)] whitespace-nowrap">
            Rechercher →
          </button>
        </form>
      </div>
    </section>


    <!-- ══════════════════════════════════════
         INTERESTS — marquee double rangée
    ══════════════════════════════════════ -->
    <section class="py-14 overflow-hidden">
      <p class="font-space text-[0.65rem] font-bold tracking-[0.12em] uppercase text-navy/40 text-center mb-6">Explorer par passion</p>

      <!-- Row 1 — gauche -->
      <div class="overflow-hidden mb-3">
        <div class="marquee-row flex w-max">
          <div class="flex gap-3 pr-3">
            <button v-for="tag in tagsRow1" :key="'r1a-' + tag" class="shrink-0 px-5 py-2.5 rounded-full border-2 border-navy/12 bg-transparent font-space text-[0.82rem] font-bold text-navy cursor-pointer hover:bg-navy hover:text-cream hover:border-navy transition-all duration-150" @click="goSearch(tag)">{{ tag }}</button>
          </div>
          <div class="flex gap-3 pr-3" aria-hidden="true">
            <button v-for="tag in tagsRow1" :key="'r1b-' + tag" class="shrink-0 px-5 py-2.5 rounded-full border-2 border-navy/12 bg-transparent font-space text-[0.82rem] font-bold text-navy cursor-pointer hover:bg-navy hover:text-cream hover:border-navy transition-all duration-150" tabindex="-1" @click="goSearch(tag)">{{ tag }}</button>
          </div>
        </div>
      </div>

      <!-- Row 2 — droite -->
      <div class="overflow-hidden">
        <div class="marquee-row-reverse flex w-max">
          <div class="flex gap-3 pr-3">
            <button v-for="tag in tagsRow2" :key="'r2a-' + tag" class="shrink-0 px-5 py-2.5 rounded-full border-2 border-blue/15 bg-blue/5 font-space text-[0.82rem] font-bold text-blue cursor-pointer hover:bg-blue hover:text-white hover:border-blue transition-all duration-150" @click="goSearch(tag)">{{ tag }}</button>
          </div>
          <div class="flex gap-3 pr-3" aria-hidden="true">
            <button v-for="tag in tagsRow2" :key="'r2b-' + tag" class="shrink-0 px-5 py-2.5 rounded-full border-2 border-blue/15 bg-blue/5 font-space text-[0.82rem] font-bold text-blue cursor-pointer hover:bg-blue hover:text-white hover:border-blue transition-all duration-150" tabindex="-1" @click="goSearch(tag)">{{ tag }}</button>
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════
         CTA — dark (style WhatsApp footer section)
    ══════════════════════════════════════ -->
    <section class="cta-section px-4 sm:px-5 pb-5">
      <div class="cta-inner relative overflow-hidden rounded-[24px] bg-navy text-center py-20 sm:py-28 px-8">
        <img src="/img/Randonneurs.jpeg" class="absolute inset-0 w-full h-full object-cover opacity-[0.07]" style="object-position: center 40%" alt="" aria-hidden="true" />
        <div class="relative z-10 max-w-[600px] mx-auto">
          <h2 class="font-roca font-bold text-cream tracking-[-0.04em] leading-[1.05] mb-4" style="font-size: clamp(2rem, 5vw, 3.5rem);">
            Rejoignez<br>la communauté Nomu
          </h2>
          <p class="font-space text-[0.9rem] text-cream/50 leading-[1.75] mb-10">
            Local ou voyageur — souvent les deux à la fois.
          </p>
          <div class="flex gap-3 justify-center flex-wrap">
            <NuxtLink v-if="!isLoggedIn" to="/signup" class="px-8 py-4 rounded-full bg-cream text-navy font-roca font-bold text-[1rem] no-underline hover:bg-white transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.2)]">Créer un compte</NuxtLink>
            <NuxtLink to="/explore" class="px-8 py-4 rounded-full border border-cream/25 text-cream font-space text-[0.9rem] no-underline hover:bg-cream/10 transition-colors">Explorer les profils →</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <LoginRequiredModal v-model="showLoginModal" />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useSeoMeta({
  title: 'Nomu — Partage ta ville, explore le monde.',
  description: 'Propose tes activités locales ou réserve celles des passionnés qui t\'accueillent. Ici, chacun est local quelque part.',
  ogTitle: 'Nomu — Local & Voyageur à la fois',
  ogDescription: 'Partage tes passions, rencontre des voyageurs et vis des expériences authentiques.',
  ogImage: 'https://app.nomu.charlesremy.dev/img/Nomu_OG.png',
  twitterCard: 'summary_large_image',
})

// State
const query = ref('')
const showLoginModal = ref(false)
const router = useRouter()
const { isLoggedIn } = useAuth()

// Refs for GSAP
const heroTitle = ref<HTMLElement>()
const heroSub = ref<HTMLElement>()
const heroCta = ref<HTMLElement>()
const heroBadge = ref<HTMLElement>()
const float1 = ref<HTMLElement>()
const float2 = ref<HTMLElement>()
const float3 = ref<HTMLElement>()
const float4 = ref<HTMLElement>()

// Data
const { results: popularProfiles, loading: profilesLoading, searchProfiles: doSearch } = useProfileSearch({
  query: ref(''), interests: ref([]), cities: ref([]), countries: ref([]),
})

const tagsRow1 = ['Yoga', 'Randonnée', 'Surf', 'Photographie', 'Cuisine', 'Escalade', 'Plongée', 'Vélo']
const tagsRow2 = ['Musique', 'Arts & Craft', 'Méditation', 'Trail', 'Kayak', 'Street art', 'Danse', 'Astronomie']

// Helpers
function avatar(name: string) {
  return `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(name)}&backgroundColor=465e8a&scale=110`
}
function parseInterests(interests: string | string[] | undefined): string[] {
  if (!interests) return []
  if (Array.isArray(interests)) return interests
  return interests.split(',').map(s => s.trim()).filter(Boolean)
}
function firstInterest(profile: any) { return parseInterests(profile.interests)[0] || null }
function profileAvatarUrl(profile: any) {
  if (profile.image_url) return profile.image_url
  return avatar(profile.name || String(profile.id || 'user'))
}
function searchProfiles() {
  if (!isLoggedIn.value) { showLoginModal.value = true; return }
  router.push({ path: '/explore', query: { q: query.value || '' } })
}
function goSearch(tag: string) {
  if (!isLoggedIn.value) { showLoginModal.value = true; return }
  router.push({ path: '/explore', query: { q: tag } })
}

// GSAP
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  doSearch()

  // ── Hero entrance ──
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from(heroBadge.value!, { y: 20, opacity: 0, duration: 0.7 }, 0.2)
    .from(heroTitle.value!, { y: 50, opacity: 0, duration: 0.9 }, 0.4)
    .from(heroSub.value!, { y: 30, opacity: 0, duration: 0.7 }, 0.65)
    .from(heroCta.value!, { y: 20, opacity: 0, duration: 0.6 }, 0.85)
    .from([float1.value!, float2.value!, float3.value!, float4.value!].filter(Boolean), {
      x: 40, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'back.out(1.2)'
    }, 0.9)

  // ── Manifesto avatars ──
  gsap.from('.manifesto-avatar', {
    scrollTrigger: { trigger: '.manifesto-section', start: 'top 80%' },
    y: 30, opacity: 0, stagger: 0.07, duration: 0.6, ease: 'power2.out',
  })
  gsap.from('.manifesto-quote', {
    scrollTrigger: { trigger: '.manifesto-section', start: 'top 65%' },
    y: 45, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2,
  })

  // ── Feature sections ──
  document.querySelectorAll<HTMLElement>('.feature-section').forEach((section) => {
    const reversed = section.classList.contains('feature-reversed')
    const text = section.querySelector('.feature-text')
    const media = section.querySelector('.feature-media')
    if (text) gsap.from(text, {
      scrollTrigger: { trigger: section, start: 'top 72%' },
      x: reversed ? 60 : -60, opacity: 0, duration: 0.9, ease: 'power3.out',
    })
    if (media) gsap.from(media, {
      scrollTrigger: { trigger: section, start: 'top 72%' },
      x: reversed ? -60 : 60, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.18,
    })
  })

  // ── Profiles ──
  gsap.from('.profiles-section', {
    scrollTrigger: { trigger: '.profiles-section', start: 'top 80%' },
    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
  })
  gsap.from('.profile-card-anim', {
    scrollTrigger: { trigger: '.profiles-section', start: 'top 70%' },
    y: 30, opacity: 0, stagger: 0.07, duration: 0.55, ease: 'power2.out', delay: 0.25,
  })

  // ── CTA ──
  gsap.from('.cta-inner', {
    scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
    y: 50, opacity: 0, duration: 1, ease: 'power3.out',
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<style scoped>
.profiles-scroll { scrollbar-width: none; }
.profiles-scroll::-webkit-scrollbar { display: none; }

@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.marquee-row { animation: marquee 32s linear infinite; will-change: transform; }
.marquee-row-reverse { animation: marquee 26s linear infinite reverse; will-change: transform; }
.marquee-row:hover, .marquee-row-reverse:hover { animation-play-state: paused; }
</style>
