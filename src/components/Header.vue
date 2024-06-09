<template>
  <header class="p-[30px] flex items-center justify-between border-b-[1px] border-[#E4E4E4] ">
    <div class="flex items-center gap-x-[18px]">
      <h1 class="text-[32px] text-[#293148] font-[700]">{{ currentRouteName }}</h1>
      <p v-if="$props.countOfCars && currentRouteName == 'Vechicles'" class="py-[4px] px-[14px] text-[#293148] bg-[#F3F6F8] rounded-[6px]">{{ $props.countOfCars }}</p>
    </div>
    <div class="flex items-center gap-x-[40px]">
      <div class="p-[9px] rounded-[6px] border-[1px] border-[#E86E84] hover:opacity-[60%] transition-opacity cursor-pointer">
        <IconPlus />
      </div>
      <div class="flex items-center gap-x-[14px]">
        <img src="../assets/images/avatar.png" alt="">
        <p class="text-[15px] text-[#293148] font-[500]">John Doe</p>
      </div>
      <div class="relative">
          <button @click="show = !show" class="flex items-center">
            <component class="mr-[14px]" :is="currentItem"></component>
            <span class="text-[#293148] text-[15px] font-[500] mr-[3px]">{{ currentItem }}</span>
            <IconArrowDown />
          </button>
          <div v-show="show" class="absolute right-0 py-2 mt-2 bg-[#282828] rounded-md shadow-xl w-20 z-[999]">
            <p v-for="(item, index) in dropdownOptions" @click="currentItem = item; show = false" :key="index" class="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100 cursor-pointer mb-[8px]" :class="{'bg-indigo-400 text-indigo-100': currentItem == item}">{{ item }}</p>
          </div>
      </div>
    </div>
  </header>
</template>
<script>
import IconPlus from "@/components/icons/Plus.vue";
import En from "@/components/icons/England.vue";
import Pt from "@/components/icons/Portugal.vue";
import De from "@/components/icons/Germany.vue";
import Us from "@/components/icons/Usa.vue"
import IconArrowDown from "@/components/icons/ArrowDown.vue";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
export default {
  components: {IconPlus, IconArrowDown, En, De, Pt, Us},
  props: ["countOfCars"],
  setup() {
    const route = useRoute();
    const currentRouteName = computed(() => route.name);
    const dropdownOptions = ["Pt", "En", "Us", "De"]
    let show = ref(false);
    let currentItem = ref('En')
    return {currentRouteName, currentItem, dropdownOptions, IconArrowDown, show, }
  }
}
</script>