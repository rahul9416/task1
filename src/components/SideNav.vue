<template>
  <div class="container w-[39vh] bg-gray-400/[0.7] h-[100vh] absolute top-0 left-0">
    <h2 class="font-extrabold text-4xl text-center mt-5">Todo Task</h2>
    <button class="border-2 rounded-xl w-52 text-center mx-20 mt-5 h-16 border-gray-500 text-xl" @click="addtasks">Add
      Task +</button>
    <div class="container h-[82.6vh] overflow-y-auto container overflow-x-hidden py-2 my-5 border-t border-gray-500">
    <div v-show="tasklists.length > 0" class="grid grid-cols-1 gap-y-3 px-3 ">
      <div v-for="task in tasklists" :key="task.id"
        :class="[task.check === true ? 'bg-green-500' :new Date(task.date).toDateString() < new Date(Date.now()).toDateString() ? 'bg-red-500' : task.id === activeid ? 'bg-orange-600' : 'bg-[#1168c1]', 'flex-col flex py-6 h-auto px-2 hover:cursor-pointer rounded-md']"
        @click="edit(task.id)">

        <h3
          :class="[ 'w-[14rem] text-left mt-[-1rem] text-xl h-auto break-words text-white']">
          {{ task.title ? task.title : 'Unititled' }}</h3>
        <input type="checkbox" name="complete" :class="'static ml-64 w-4'" @click.stop="check(task.id)" />
        <button class="static ml-72 mt-[-1.2rem]" @click.stop.prevent="deletetasks(task.id)"><i
            :class="'fa-solid fa-trash mr-2 text-white'"></i></button>
            <h6 class="text-sm relative mt-3 text-white">Complete By : {{ task.date }}</h6>
      </div>

    </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { watchEffect } from 'vue';
const store = useCounterStore();
const { addtasks, deletetasks, edit, check } = store
const { activeid, tasklists } = storeToRefs(store);


</script>