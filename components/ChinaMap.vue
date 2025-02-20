<template>
  <div class="map-container">
    <div class="map-visual">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 774 569"
        aria-label="Map of China" 
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
            'has-products': province.p?.c,
            'no-products': !province.p?.c
          }"
          @mouseover="handleHover(province)"
          @mouseout="handleMouseLeave"
        />
      </svg>

      <!-- 标记点和连接线 -->
      <div 
        v-if="activeProvince && activeProvince.p?.c"
        class="marker-container"
        :style="getMarkerPosition(activeProvince.i)"
      >
        <div class="marker-point"></div>
        <div class="marker-line"></div>
      </div>

      <!-- 提示框 -->
      <div 
        v-if="activeProvince && activeProvince.p?.c"
        class="map-tooltip"
        :style="getTooltipPosition(activeProvince.i)"
      >
        <div class="tooltip-content">
          <h3>{{ activeProvince.n.c }}</h3>
          <p>{{ activeProvince.p.c }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { chinaMapData } from '~/config/china-map'

interface ProvinceData {
  i: string
  d: string
  n: {
    c: string
    e: string
    [key: string]: string
  }
  p: {
    c: string
    e: string
    [key: string]: string
  }
}

const mapSvg = ref<SVGSVGElement | null>(null)
const activeProvince = ref<ProvinceData | null>(null)
const activeProvinceIndex = ref(0)
let intervalId: number | null = null

// 将 provinces 定义为 ref，使其在模板中可用
const provinces = ref(chinaMapData)

// 检查省份是否有产品数据
const hasProvinceData = (province: ProvinceData): boolean => {
  return province.p.c.trim() !== ''
}

// 筛选出有产品数据的省份
const provincesWithData = chinaMapData.filter(hasProvinceData)

// 计算标记点位置
const getMarkerPosition = (provinceId: string): Record<string, string> => {
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
  activeProvince.value = province
  
  // 悬停时暂停轮播
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// 处理鼠标离开
const handleMouseLeave = (): void => {
  activeProvince.value = null
  // 鼠标离开时恢复轮播
  if (!intervalId && provincesWithData.length > 0) {
    startCarousel()
  }
}

// 自动轮播
const startCarousel = (): void => {
  intervalId = window.setInterval(() => {
    activeProvinceIndex.value = (activeProvinceIndex.value + 1) % provincesWithData.length
    activeProvince.value = provincesWithData[activeProvinceIndex.value]
  }, 3000)
}

onMounted(() => {
  if (provincesWithData.length > 0) {
    activeProvince.value = provincesWithData[0]
    startCarousel()
  }
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