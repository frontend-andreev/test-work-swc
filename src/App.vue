<template>
  <div class="wrapper">
    <Sidebar />
    <div class="sm:ml-64">
      <Header :countOfCars="count" />
      <div class="p-[32px]">
        <router-view @countOfCars="changeCount"/>
      </div>
    </div>
</div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import { ref } from "vue";

export default {
  components: {Sidebar, Header},
  name: 'App',
  setup() {
    let count = ref(0)
    const changeCount = (val) => {
      count.value = val
    }
    return {changeCount, count}
  }
}
</script>

<style>
</style>
