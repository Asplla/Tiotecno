<template>
  <!-- Hero Section-->
  <section id="home" class="hero relative flex items-center justify-center bg-primary">
    <div class="hero-bg absolute w-full h-full top-0 left-0 right-0 bottom-0">
      <video autoplay muted loop playsinline preload="auto" src="/src/video/glass-animation-5.mp4"></video>
    </div>
    <!-- 内容区域 -->
    <div class="relative z-10 text-center">
      <h1 class="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
        <div>{{ t('hero.title1') }}</div>
        <div>{{ t('hero.title2') }}</div>
      </h1>
      <p class="hero-subtitle text-xl md:text-2xl">{{ t('hero.subtitle') }}</p>
    </div>
    <!-- 鼠标滚动效果 -->
    <div class="move-down">
      <div class="mouse-wheel"></div>
    </div>
  </section>
  <!-- Services Section -->
  <section id="services" class="services py-20 bg-secondary">
    <div class="container mx-auto px-6">
      <!-- Section Title -->
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">{{ t('services.title') }}</h2>
        <p class="text-xl md:text-2xl text-secondary max-w-2xl mx-auto">{{ t('services.subtitle') }}</p>
      </div>
      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- 工厂参观卡片 -->
        <div class="card p-6 md:p-8">
          <div class="mb-4">
            <FactoryIcon class="w-12 h-12 text-primary" />
          </div>
          <h3 class="card-title">{{ t('services.items.1.title') }}</h3>
          <p class="card-description">{{ t('services.items.1.description') }}</p>
        </div>

        <!-- 产品采购卡片 -->
        <div class="card p-6 md:p-8">
          <div class="mb-4">
            <ShopCartIcon class="w-12 h-12 text-primary" />
          </div>
          <h3 class="card-title">{{ t('services.items.2.title') }}</h3>
          <p class="card-description">{{ t('services.items.2.description') }}</p>
        </div>

        <!-- 价格谈判卡片 -->
        <div class="card p-6 md:p-8">
          <div class="mb-4">
            <TransferIcon class="w-12 h-12 text-primary" />
          </div>
          <h3 class="card-title">{{ t('services.items.3.title') }}</h3>
          <p class="card-description">{{ t('services.items.3.description') }}</p>
        </div>
      </div>
    </div>
  </section>
  <!-- China Map Section -->
  <section class="chinamap py-20 bg-primary">
    <div class="container mx-auto px-6">
      <!-- Section Title -->
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">{{ t('map.title') }}</h2>
      </div>
      <!-- Content -->
      <div class="max-w-8xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div class="lg:col-span-2 space-y-6">
            <!-- Card 1 - Price Advantage -->
            <div class="card rounded-xl p-4 md:p-6">
              <h3 class="text-xl font-bold text-primary mb-3">{{ t('map.items.1.title') }}</h3>
              <p class="text-secondary">{{ t('map.items.1.description') }}</p>
            </div>
            <!-- Card 2 - Guanxi -->
            <div class="card rounded-xl p-4 md:p-6">
              <h3 class="text-xl font-bold text-primary mb-3">{{ t('map.items.2.title') }}</h3>
              <p class="text-secondary">{{ t('map.items.2.description') }}</p>
            </div>
            <!-- Card 3 - Mutual Value -->
            <div class="card rounded-xl p-4 md:p-6">
              <h3 class="text-xl font-bold text-primary mb-3">{{ t('map.items.3.title') }}</h3>
              <p class="text-secondary">{{ t('map.items.3.description') }}</p>
            </div>
            <!-- Card 4 - Time Efficiency -->
            <div class="card rounded-xl p-4 md:p-6">
              <h3 class="text-xl font-bold text-primary mb-3">{{ t('map.items.4.title') }}</h3>
              <p class="text-secondary">{{ t('map.items.4.description') }}</p>
            </div>
          </div>
          <div class="lg:col-span-3 w-full h-full flex items-center">
            <ChinaMap />
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- We Offer Section-->
  <section class="weoffer py-20 bg-secondary">
    <div class="container mx-auto px-6">
      <!-- Section Title -->
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">{{ t('weoffer.title') }}</h2>
        <p class="text-xl md:text-2xl text-secondary">{{ t('weoffer.subtitle') }}</p>
      </div>
      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <!-- 英语-中文翻译卡片 -->
        <div class="card p-6 md:p-8 rounded-2xl">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <LanguageIcon class="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-primary mb-2">{{ t('weoffer.items.1.title') }}</h3>
              <p class="text-secondary">{{ t('weoffer.items.1.description') }}</p>
            </div>
          </div>
        </div>

        <!-- 工厂参观交通卡片 -->
        <div class="card p-6 md:p-8 rounded-2xl">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <BusIcon class="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-primary mb-2">{{ t('weoffer.items.2.title') }}</h3>
              <p class="text-secondary">{{ t('weoffer.items.2.description') }}</p>
            </div>
          </div>
        </div>

        <!-- 舒适的住宿卡片 -->
        <div class="card p-6 md:p-8 rounded-2xl">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <BedIcon class="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-primary mb-2">{{ t('weoffer.items.3.title') }}</h3>
              <p class="text-secondary">{{ t('weoffer.items.3.description') }}</p>
            </div>
          </div>
        </div>

        <!-- 观光旅游和零食卡片 -->
        <div class="card p-6 md:p-8 rounded-2xl">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <MapIcon class="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-primary mb-2">{{ t('weoffer.items.4.title') }}</h3>
              <p class="text-secondary">{{ t('weoffer.items.4.description') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- About Section-->
  <section id="about" class="about py-20 bg-primary">
    <div class="container mx-auto px-6">
      <!-- Section Title -->
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">{{ t('about.title') }}</h2>
      </div>
      <!-- Content -->
      <div class="flex justify-center">
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div class="w-36 h-36 md:w-72 md:h-72 rounded-full overflow-hidden flex-shrink-0 mb-0">
            <Noavatar class="w-full h-full object-cover" />
          </div>
          <div class="max-w-3xl">
            <h3 class="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 text-center md:text-left">{{ t('about.subtitle') }}</h3>
            <div class="grid grid-cols-3 md:flex md:flex-row gap-4 md:gap-24">
              <div class="text-center md:text-left">
                <div class="text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2">10+</div>
                <div class="text-xs md:text-base text-secondary">{{ t('about.stats.years') }}</div>
              </div>
              <div class="text-center md:text-left">
                <div class="text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2">500+</div>
                <div class="text-xs md:text-base text-secondary">{{ t('about.stats.clients') }}</div>
              </div>
              <div class="text-center md:text-left">
                <div class="text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2">1000+</div>
                <div class="text-xs md:text-base text-secondary">{{ t('about.stats.factories') }}</div>
              </div>
            </div>
            <p class="text-secondary mt-6 md:mt-8 text-center md:text-left text-sm md:text-base">{{ t('about.description') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Contact Section-->
  <section id="contact" class="contact py-20 bg-secondary">
    <div class="container mx-auto px-6">
      <!-- Section Title -->
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">{{ t('contact.title') }}</h2>
      </div>
      <!-- Content -->
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div class="space-y-8 h-full flex flex-col justify-between">
          <!-- WhatsApp -->
          <div class="card rounded-2xl p-7 hover:bg-primary/50">
            <div class="flex items-start gap-4">
              <WhatsappIcon class="w-12 h-12 text-green-500" />
              <div>
                <span class="text-xl md:text-2xl text-primary font-bold">{{ t('contact.whatsapp.title') }}</span>
                <p class="text-secondary mt-2 mb-2">{{ t('contact.whatsapp.desc') }}</p>
                <p class="text-primary text-lg md:text-xl">{{ t('contact.whatsapp.phone') }}</p>
              </div>
            </div>
          </div>
          <!-- Email -->
          <div class="card rounded-2xl p-7 hover:bg-primary/50">
            <div class="flex items-start gap-4">
              <MailIcon class="w-12 h-12 text-blue-500" />
              <div>
                <span class="text-xl md:text-2xl text-primary font-bold">{{ t('contact.email.title') }}</span>
                <p class="text-secondary mt-2 mb-2">{{ t('contact.email.desc') }}</p>
                <p class="text-primary text-lg md:text-xl">
                  <a :href="`mailto:${t('contact.email.emailName')}@${t('contact.email.emailDomain')}`">
                    {{ t('contact.email.emailName') }}@{{ t('contact.email.emailDomain') }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <SendEmail />
      </div>
  </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLanguage } from '~/composables/useLanguage'
import config from '~/config/config'
import Noavatar from '~/assets/img/noavatar.svg'
import FactoryIcon from '~/assets/icon/building-factory.svg'
import ShopCartIcon from '~/assets/icon/shopping-cart.svg'
import WhatsappIcon from '~/assets/icon/whatsapp.svg'
import TransferIcon from '~/assets/icon/transfer.svg'
import MailIcon from '~/assets/icon/mail.svg'
import LanguageIcon from '~/assets/icon/language.svg'
import BusIcon from '~/assets/icon/bus.svg'
import BedIcon from '~/assets/icon/bed.svg'
import MapIcon from '~/assets/icon/map.svg'
import SendEmail from '~/components/SendEmail.vue'
import { onMounted } from 'vue'
import { useSeo } from '~/composables/useSeo'

const { t } = useI18n()
const { currentLocale } = useLanguage()
const defaultLanguage = config.language.default

// 处理视频播放
onMounted(() => {
  const video = document.querySelector('.hero-bg video') as HTMLVideoElement;
  if (video) {
    video.play().catch((error: Error) => {
      console.log("Video autoplay failed:", error);
    });
  }
})

// 设置页面特定的 SEO
useSeo({
  title: `${t('meta.title.siteName')}${t('meta.title.separator')}${t('meta.title.siteDesc')}`,
  description: t('meta.description'),
  keywords: [
    t('meta.keywords.sourcing'),
    t('meta.keywords.china'),
    t('meta.keywords.manufacturing')
  ]
})
</script>
<style scoped>
/* 我们现在使用 Tailwind 的类，不需要额外的 CSS */
</style> 