<template>
  <!-- Hero Section-->
  <section id="home" class="hero relative flex items-center justify-center bg-primary overflow-hidden">
    <div class="hero-bg absolute w-full h-full top-0 left-0 right-0 bottom-0">
      <video autoplay muted loop playsinline preload="auto" src="/src/video/glass-animation-5.mp4"></video>
    </div>
    <!-- 内容区域 -->
    <div class="relative z-10 text-center">
      <h1 class="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
        <div>探索中国制造</div>
        <div>的无限可能</div>
      </h1>
      <p class="hero-subtitle text-xl md:text-2xl">专业采购服务，助您找到可靠的中国制造商</p>
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
        <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">我们的服务</h2>
        <p class="text-xl md:text-2xl text-secondary max-w-2xl mx-auto">全方位的采购解决方案</p>
      </div>
      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- 工厂参观卡片 -->
        <div class="card p-6 md:p-8">
          <div class="mb-4">
            <FactoryIcon class="w-12 h-12 text-primary" />
          </div>
          <h3 class="card-title">工厂参观</h3>
          <p class="card-description">我们安排参观您选择的工厂或我们推荐的工厂。</p>
        </div>

        <!-- 产品采购卡片 -->
        <div class="card p-6 md:p-8">
          <div class="mb-4">
            <ShopCartIcon class="w-12 h-12 text-primary" />
          </div>
          <h3 class="card-title">产品采购</h3>
          <p class="card-description">我们帮助您找到可靠的供应商，并确保无错误的生产和交付过程。</p>
        </div>

        <!-- 价格谈判卡片 -->
        <div class="card p-6 md:p-8">
          <div class="mb-4">
            <TransferIcon class="w-12 h-12 text-primary" />
          </div>
          <h3 class="card-title">价格谈判</h3>
          <p class="card-description">我们不向供应商收取中介费。我们只在谈判期间代表您的利益。</p>
        </div>
      </div>
    </div>
  </section>
  <!-- China Map Section -->
  <section class="chinamap py-20 bg-primary">
    <div class="container mx-auto px-6">
      <!-- Section Title -->
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">为什么亲自去中国实际上可以省钱？</h2>
      </div>
      <!-- Content -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div class="lg:col-span-2 space-y-6">
          <!-- Card 1 - Price Advantage -->
          <div class="card rounded-xl p-4 md:p-6">
            <h3 class="text-xl font-bold text-primary mb-3">竞争性定价</h3>
            <p class="text-secondary">获取竞争性定价和成本效益制造解决方案</p>
          </div>
          <!-- Card 2 - Guanxi -->
          <div class="card rounded-xl p-4 md:p-6">
            <h3 class="text-xl font-bold text-primary mb-3">强关系</h3>
            <p class="text-secondary">与可靠制造商和供应商建立关系</p>
          </div>
          <!-- Card 3 - Mutual Value -->
          <div class="card rounded-xl p-4 md:p-6">
            <h3 class="text-xl font-bold text-primary mb-3">质量保证</h3>
            <p class="text-secondary">严格的质量控制和检验过程</p>
          </div>
          <!-- Card 4 - Time Efficiency -->
          <div class="card rounded-xl p-4 md:p-6">
            <h3 class="text-xl font-bold text-primary mb-3">时间效率</h3>
            <p class="text-secondary">快速周转时间和高效的生产过程</p>
          </div>
          <!-- Card 4 - Time Efficiency -->
          <div class="card rounded-xl p-4 md:p-6">
            <h3 class="text-xl font-bold text-primary mb-3">时间效率</h3>
            <p class="text-secondary">快速周转时间和高效的生产过程</p>
          </div>
        </div>
        <div class="lg:col-span-3 w-full h-full flex items-center">
          <ChinaMap />
        </div>
      </div>
    </div>
  </section>
  <!-- We Offer Section-->
  <section class="weoffer py-20 bg-secondary">
    <div class="container mx-auto px-6">
      <!-- Section Title -->
      <div class="text-center mb-10 md:mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">我们提供</h2>
        <p class="text-xl md:text-2xl text-secondary">全方位的采购解决方案</p>
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
              <h3 class="text-xl font-bold text-primary mb-2">英语-中文翻译</h3>
              <p class="text-secondary">专业的英语翻译将全程陪同您，协助您的沟通。</p>
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
              <h3 class="text-xl font-bold text-primary mb-2">工厂参观交通</h3>
              <p class="text-secondary">我们为您准备了6座MPV，随时为您服务。如果您更喜欢火车，我们也可以安排。</p>
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
              <h3 class="text-xl font-bold text-primary mb-2">舒适的住宿</h3>
              <p class="text-secondary">我们为您提供至少四星级酒店，并照顾您的三餐。</p>
            </div>
          </div>
        </div>

        <!-- 观光旅游和零食卡片 -->
        <div class="card p-6 md:p-8 rounded-2xl">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0" data-v-inspector="src/views/Home.vue:221:15">
              <MapIcon class="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-primary mb-2">观光旅游和零食</h3>
              <p class="text-secondary">在您的空闲时间，我们将带您参观中国的独特景点，品尝正宗的美食。</p>
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
        <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">关于我们</h2>
      </div>
      <!-- Content -->
      <div class="flex justify-center">
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div class="w-36 h-36 md:w-72 md:h-72 rounded-full overflow-hidden flex-shrink-0 mb-0">
            <Noavatar class="w-full h-full object-cover" />
          </div>
          <div class="max-w-3xl">
            <h3 class="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 text-center md:text-left">
              我是一名外贸采购顾问，让我帮您找到最合适的制造商。</h3>
            <div class="grid grid-cols-3 md:flex md:flex-row gap-4 md:gap-24">
              <div class="text-center md:text-left">
                <div class="text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2">10+</div>
                <div class="text-xs md:text-base text-secondary">年经验</div>
              </div>
              <div class="text-center md:text-left">
                <div class="text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2">500+</div>
                <div class="text-xs md:text-base text-secondary">服务客户</div>
              </div>
              <div class="text-center md:text-left">
                <div class="text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2">1000+</div>
                <div class="text-xs md:text-base text-secondary">工厂资源</div>
              </div>
            </div>
            <p class="text-secondary mt-6 md:mt-8 text-center md:text-left text-sm md:text-base">
              作为一名经验丰富的外贸顾问，我深刻理解选择合适的供应商对于公司发展的重要性。让我帮助您在中国找到最合适的制造商。</p>
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
        <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">联系我们</h2>
      </div>
      <!-- Content -->
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div class="space-y-8 h-full flex flex-col justify-between">
          <!-- WhatsApp -->
          <div class="card rounded-2xl p-7 hover:bg-primary/50">
            <div class="flex items-start gap-4">
              <WhatsappIcon class="w-12 h-12 text-green-500" />
              <div>
                <span class="text-xl md:text-2xl text-primary font-bold">WhatsApp</span>
                <p class="text-secondary mt-2 mb-2">通过 WhatsApp 与我们联系，获取快速响应。</p>
                <p class="text-primary text-lg md:text-xl">+86 123 4567 8901</p>
              </div>
            </div>
          </div>
          <!-- Email -->
          <div class="card rounded-2xl p-7 hover:bg-primary/50">
            <div class="flex items-start gap-4">
              <MailIcon class="w-12 h-12 text-blue-500" />
              <div>
                <span class="text-xl md:text-2xl text-primary font-bold">Email</span>
                <p class="text-secondary mt-2 mb-2">发送电子邮件进行详细咨询。</p>
                <p class="text-primary text-lg md:text-xl"><a href="mailto:contact@wxss.com">contact@wxss.com</a></p>
              </div>
            </div>
          </div>
        </div>
        <SendEmail />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',
  mounted() {
    const video = document.querySelector('.hero-bg video');
    if (video) {
      video.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }
}
</script>
<script setup>
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
</script>
<style scoped>
/* 我们现在使用 Tailwind 的类，不需要额外的 CSS */
</style>