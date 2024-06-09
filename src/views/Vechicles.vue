<template>
  <div class="flex items-center justify-between mb-[32px]">
    <div class="flex items-center gap-x-[32px]">
      <div class="relative text-[16px] w-[320px] h-[42px]">
        <input v-model="requestInfo.search" type="text" placeholder="Search VIN" class="outline-none border-[1px] rounded-[8px] py-[9px] px-[16px] h-full w-full">
        <SearchIcon class="absolute right-[16px] top-[9px]" />
      </div>
      <div class="flex items-center gap-x-[16px]">
        <p class="text-[#293148]">Select vehicles per page:</p>
        <div class="relative">
          <button @click="show = !show" class="flex items-center border rounded-[8px] border-[#E4E4E4] py-[9px] px-[16px]">
            <span class="text-[#293148] text-[15px] font-[500] mr-[12px]">{{ requestInfo.per_page }}</span>
            <IconArrowDown />
          </button>
          <div v-show="show" class="absolute right-0 py-2 mt-2 bg-[#282828] rounded-md shadow-xl w-20 z-[999] max-h-[200px] overflow-auto">
            <p v-for="(item, index) in perPageOptions" @click="requestInfo.per_page = item; show = false;" :key="index" class="block px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-400 hover:text-indigo-100 cursor-pointer mb-[8px]">{{ item }}</p>
            <IconArrowDown />
          </div>
      </div>
      </div>
    </div>
    <button class="flex items-center gap-x-[16px] py-[9px] px-[16px] bg-[#D90E32] rounded-[10px]">
      <IconPlus />
      <p class="text-[12px] font-[700] text-white uppercase">Add Vechicle</p>
    </button>
  </div>
  <div v-if="cars.length > 0">
    <div class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-[30px]">
    <div v-for="car in cars" :key="car.id" class="relative bg-[#F3F6F8] rounded-[10px] px-[24px] pb-[16px] pt-[40px]">
      <img class="mx-[auto] mt-[16px] mb-[24px] w-[310px] h-[235px] rounded-[5px]" :src="car.preview" alt="">
      <div class="h-[65px]">
        <p class="text-[20px] font-[500] text-[#293148] mb-[12px]">{{ car.vehicle_name }}</p>
        <p class="text-[15px] text-[#293148]/60 font-[500]">WDB {{ car.vin }}</p>
      </div>
      <div class="mt-[18px] pt-[18px] border-t-[1px] border-t-[#E4E4E4] flex items-center justify-between">
        <div class="py-[4px] px-[12px] flex items-center bg-[#EDEDED] text-[#293148]" :class="{'bg-[#E4F5DD] text-[#7FC75E]': car.angles_count == 30}">
          <IconCheck class="mr-[8px]" v-if="car.angles_count == 30" />
          <p class="text-[15px] text-[700]">{{car.angles_count}}/30</p>
        </div>
        <p class="text-[15px] text-[#293148]/60">{{ formatDate(car.created_at) }} days left</p>
      </div>
      <IconDots class="absolute top-[20px] right-[20px]" />
    </div>
  </div>
  <div class="flex items-center justify-between mt-[37px]">
    <p class="text-[16px] text-[#293148]">Showing {{ answerInfo.to }} out of {{ answerInfo.total }}</p>
    <div class="flex items-center gap-x-[12px]">
      <IconArrowLeft class="cursor-pointer" @click="answerInfo.currentPage > 1 ? requestInfo.page -= 1 : false" />
      <div class="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] border border-[#E4E4E4] text-[15px]">
        <p>
          {{ answerInfo.currentPage }}
        </p>
      </div>
      <span>of</span>
      <div class="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] border border-[#E4E4E4] text-[15px] opacity-70">
        <p>
          {{ answerInfo.lastPage }}
        </p>
      </div>
      <IconArrowRight class="cursor-pointer" @click="answerInfo.currentPage < answerInfo.lastPage ? requestInfo.page += 1 : false" />
    </div>
  </div>
  </div>
  <p v-else-if="!isLoading"> No result</p>
</template>
<script>
import SearchIcon from "@/components/icons/Search.vue";
import IconPlus from '@/components/icons/Plus.vue';
import IconDots from "@/components/icons/Dots.vue";
import IconCheck from "@/components/icons/Checkmark.vue";
import IconArrowDown from "@/components/icons/ArrowDown.vue"
import IconArrowLeft from "@/components/icons/ArrowLeft.vue";
import IconArrowRight from "@/components/icons/ArrowRight.vue";
import axios from "axios";
import { ref, onMounted, reactive, watch } from "vue";
export default {
  emits: ['countOfCars'],
  components: {SearchIcon, IconPlus, IconDots, IconCheck, IconArrowDown, IconArrowRight, IconArrowLeft},
  setup(props, {emit}) {
    const perPageOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const cars = ref([]);
    let show = ref(false);
    let answerInfo = reactive({
      to: 0,
      total: 0,
      currentPage: 0,
      lastPage: 0
    });
    const requestInfo = reactive({
      per_page: 10,
      search: '',
      page: 1
    })
    const getCars = () => {
     axios.get('https://api.caiman-app.de/api/cars-test', {params: requestInfo})
        .then((res) => {
          if (res.data.meta.current_page > res.data.meta.last_page) {
            requestInfo.page = res.data.meta.last_page;
            return
          }
          console.log(res.data.data);
          answerInfo.lastPage = res.data.meta.last_page,
          answerInfo.currentPage = res.data.meta.current_page
          answerInfo.to = res.data.meta.to
          answerInfo.total = res.data.meta.total
          emit("countOfCars", res.data.meta.total)
          cars.value = res.data.data
        })
    }
    const formatDate = (date) => {
      const difference = new Date().getTime() - new Date(date).getTime();
      return new Date(difference).getDate()
    }
    watch(requestInfo, () => {
      getCars()
    })

    onMounted(() => {
      getCars()
    })
    return {cars, show, perPageOptions, getCars, answerInfo, requestInfo, formatDate}
  }
}
</script>