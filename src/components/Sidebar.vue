<template>
  <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full py-4 overflow-y-auto bg-[#282828]">
    <h3 class="text-[#fff] text-[24px] font-[700] text-center mb-[100px]">Demo Test</h3>
      <ul class=" font-medium">
         <li class="relative mb-[16px]">
            <router-link to="/profile" class="flex items-center gap-x-[20px] px-[30px] py-[12px] rounded-lg text-text1/45 text-[16px] font-[500]" :class="{'bg-white/20 before:content before:block before:absolute before:h-full before:w-[2px] before:bg-[#D90E32] before:top-[0] before:left-[0]': currentRouteName == 'Profile' }">
               <IconUser />
               <p>Profile</p>
            </router-link>
         </li>
         <li class="relative mb-[16px]">
            <router-link to="/" class="flex items-center gap-x-[20px] px-[30px] py-[12px] rounded-lg text-text1/45 text-[16px] font-[500]" :class="{'bg-white/20 before:content before:block before:absolute before:h-full before:w-[2px] before:bg-[#D90E32] before:top-[0] before:left-[0]': currentRouteName == 'Vechicles' }">
               <IconVechicles />
               <p>Vechicles</p>
            </router-link>
         </li>
         <li class="relative">
            <router-link to="/setting" class="flex items-center gap-x-[20px] px-[30px] py-[12px] rounded-lg text-text1/45 text-[16px] font-[500]" :class="{'bg-white/20 before:content before:block before:absolute before:h-full before:w-[2px] before:bg-[#D90E32] before:top-[0] before:left-[0]': currentRouteName == 'Setting' }">
               <IconSetting />
               <p>Setting</p>
            </router-link>
         </li>
      </ul>
   </div>
</aside>
</template>
<script>
import IconUser from "@/components/icons/User.vue";
import IconVechicles from "@/components/icons/Vechicles.vue";
import IconSetting from "@/components/icons/Setting.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  components: {IconUser, IconVechicles, IconSetting},
  setup() {
    const route = useRoute()
    const currentRouteName = computed(() => route.name)
    const activeClass = computed(() => 'bg-white/20 before:content-[""] before:block before:absolute before:h-full before:w-[2px] before:bg-[#D90E32] before:top-[0]')
    return {currentRouteName, activeClass}
  }
}
</script>