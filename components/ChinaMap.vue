<template>
  <div class="map-container">
    <div class="map-visual">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 774 569"
        :aria-label="t('map.label')"
        class="china-map"
        ref="mapSvg"
      >
        <path 
          v-for="province in provinces" 
          :key="province.i"
          :d="province.d"
          :title="province.i"
          class="province-path"
          :class="{
            'active': activeProvince?.i === province.i,
            'has-products': hasProvinceData(province),
            'no-products': !hasProvinceData(province)
          }"
          @mouseover="handleHover(province)"
          @mouseout="handleMouseLeave"
        />
      </svg>

      <!-- 标记点和连接线 -->
      <div 
        v-if="activeProvince && hasProvinceData(activeProvince)"
        class="marker-container"
        :style="getMarkerPosition(activeProvince.i)"
      >
        <div class="marker-point"></div>
        <div class="marker-line"></div>
      </div>

      <!-- 提示框 -->
      <div 
        v-if="activeProvince && hasProvinceData(activeProvince)"
        class="map-tooltip"
        :style="getTooltipPosition(activeProvince.i)"
      >
        <div class="tooltip-content">
          <h3>{{ getProvinceContent(activeProvince, 'n') }}</h3>
          <p>{{ getProvinceContent(activeProvince, 'p') }}</p>
        </div>
      </div>

      <!-- 数据来源标注 -->
      <div class="absolute bottom-2 right-2 text-xs text-secondary opacity-60">
        Map data from mapsvg.com
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguage } from '~/composables/useLanguage'
import { chinaMapData } from '~/config/china-map'

const { t } = useI18n()
const { currentLocale, locale } = useI18n()

// 计算当前语言，如果当前语言没有内容则使用英文
const currentLang = computed(() => {
  const lang = locale.value
  // 检查第一个省份是否有该语言的内容
  const hasLang = chinaMapData.some(province => province.n[lang] && province.p[lang])
  return hasLang ? lang : 'en'
})

interface ProvinceData {
  i: string
  d: string
  n: {
    zh: string
    en: string
    es: string
    [key: string]: string
  }
  p: {
    zh: string
    en: string
    es: string
    [key: string]: string
  }
}

const mapSvg = ref<SVGSVGElement | null>(null)
const activeProvince = ref<ProvinceData | null>(null)
const activeProvinceIndex = ref(0)
let intervalId: number | null = null

// 将 provinces 定义为 ref，使其在模板中可用
const provinces = ref([...chinaMapData])

// 检查省份是否有产品数据
const hasProvinceData = (province: ProvinceData): boolean => {
  const lang = currentLang.value
  // 如果当前语言没有数据，尝试使用英文
  return Boolean(province?.p?.[lang] || (lang !== 'en' && province?.p?.en))
}

// 将 provincesWithData 也定义为 ref
const provincesWithData = ref(chinaMapData.filter(hasProvinceData))

// 获取省份显示内容
const getProvinceContent = (province: ProvinceData, type: 'n' | 'p'): string => {
  const lang = currentLang.value
  return province[type][lang] || province[type]['en'] || ''
}

// 修改自动轮播逻辑
const startCarousel = (): void => {
  if (!process.client) return
  
  intervalId = window.setInterval(() => {
    activeProvinceIndex.value = (activeProvinceIndex.value + 1) % provincesWithData.value.length
    activeProvince.value = provincesWithData.value[activeProvinceIndex.value]
  }, 3000)
}

// 更新省份数据的函数
const updateProvinceData = () => {
  provincesWithData.value = chinaMapData.filter(hasProvinceData)
  
  // 如果当前激活的省份在新语言下没有数据，则清除激活状态
  const lang = currentLang.value
  if (activeProvince.value && !hasProvinceData(activeProvince.value)) {
    activeProvince.value = null
  }
  
  // 重新开始轮播
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  
  if (provincesWithData.value.length > 0) {
    activeProvince.value = provincesWithData.value[0]
    startCarousel()
  }
}

// 监听语言变化
watch(locale, (newLang) => {
  if (!process.client) return
  
  // 强制更新 provinces 引用以触发重新渲染
  provinces.value = [...chinaMapData]
  
  // 使用 nextTick 确保 DOM 更新后再更新数据
  nextTick(() => {
    updateProvinceData()
  })
}, { immediate: true })

// 计算标记点位置
const getMarkerPosition = (provinceId: string): Record<string, string> => {
  if (!process.client) return { position: 'absolute' }
  
  if (!mapSvg.value) return { position: 'absolute' }
  
  const path = mapSvg.value.querySelector(`path[title="${provinceId}"]`) as SVGPathElement
  if (!path) return { position: 'absolute' }

  const bbox = path.getBBox()
  const point = mapSvg.value.createSVGPoint()

  // 使用简单的偏移系数
  const offsets: Record<string, { x: number, y: number }> = {
    'heilongjiang': { x: 0.5, y: 0.65 },
    'xinjiang': { x: 0.35, y: 0.45 },
    'xizang': { x: 0.4, y: 0.45 },
    'neimenggu': { x: 0.7, y: 0.35 },
    'gansu': { x: 0.65, y: 0.45 },
    'sichuan': { x: 0.45, y: 0.6 },
    'qinghai': { x: 0.45, y: 0.55 },
    'yunnan': { x: 0.5, y: 0.6 },
    'guangxi': { x: 0.5, y: 0.6 },
    'jilin': { x: 0.5, y: 0.5 },
    'liaoning': { x: 0.5, y: 0.4 },
    'hebei': { x: 0.35, y: 0.65 },
    'shandong': { x: 0.4, y: 0.5 },
    'jiangsu': { x: 0.6, y: 0.5 },
    'zhejiang': { x: 0.5, y: 0.5 },
    'fujian': { x: 0.5, y: 0.5 },
    'guangdong': { x: 0.5, y: 0.4 },
    'shanghai': { x: 0.4, y: 0.5 }
  }

  const offset = offsets[provinceId] || { x: 0.5, y: 0.5 }
  point.x = bbox.x + bbox.width * offset.x
  point.y = bbox.y + bbox.height * offset.y

  const ctm = mapSvg.value.getScreenCTM()
  if (!ctm) return { position: 'absolute' }
  
  const screenPoint = point.matrixTransform(ctm)
  const svgRect = mapSvg.value.getBoundingClientRect()
  
  return {
    position: 'absolute',
    left: `${screenPoint.x - svgRect.left}px`,
    top: `${screenPoint.y - svgRect.top}px`
  }
}

// 使用相同的坐标计算系统
const getTooltipPosition = (provinceId: string): Record<string, string> => {
  const markerPosition = getMarkerPosition(provinceId)
  const left = parseFloat(markerPosition.left)
  const top = parseFloat(markerPosition.top)
  
  return {
    position: 'absolute',
    left: `${left}px`,
    top: `${top - 40}px`,
    transform: 'translate(-50%, -100%)'
  }
}

// 处理鼠标悬停
const handleHover = (province: ProvinceData): void => {
  if (!hasProvinceData(province)) return
  
  // 悬停时暂停轮播
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  
  activeProvince.value = province
}

// 处理鼠标离开
const handleMouseLeave = (): void => {
  activeProvince.value = null
  
  // 鼠标离开时恢复轮播
  if (!intervalId && provincesWithData.value.length > 0) {
    nextTick(() => {
      startCarousel()
    })
  }
}

onMounted(() => {
  if (!process.client) return
  
  nextTick(() => {
    if (provincesWithData.value.length > 0) {
      activeProvince.value = provincesWithData.value[0]
      startCarousel()
    }
  })
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
/* 移除所有样式，因为已经移到 style.css 中 */
</style> 