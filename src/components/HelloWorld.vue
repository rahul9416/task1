<template>
  <div class="w-4/5 relative justify-center left-[23rem] ">
    <div v-if="activeid===-5" class="flex justify-center">
      <h2 class="mt-5">No Active Task</h2>
    </div>
    <div v-else>
      <input type="text" class="h-10 relative left-10 mt-5 flex outline-none border-b border-dashed border-gray-400" placeholder="Enter task title" v-model="task_title"/>
      <input type="date" class="h-10 relative left-10 mt-5 outline-none" v-model="dates">
      <textarea class="relative h-[80vh] left-10 mt-10 flex w-3/4 overflow-hidden outline-none p-2 rounded-xl border border-dashed border-gray-400 opacity-75 lg:h-[80vh]" placeholder="Enter Task Details" v-model="task"></textarea>
</div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import type {Task} from '../main';
  const store = useCounterStore();
  const { task , dates,activeid, task_title, tasklists } = storeToRefs(store);
  watchEffect(() => {
  if(activeid.value>0){
    tasklists.value.map((tasks:Task) => {
      if(tasks["id"]===activeid.value){
        if(task_title.value===''){
          tasks["title"]='Untitled Task';
        }
        // if(dates.value===''){alert('hey')}
        else{
          tasks["title"]=task_title.value
          tasks["desc"]=task.value
          tasks["date"]=dates.value;
      }
      }})
  }
  tasklists.value.sort((a:Task, b:Task) => {return Date.parse(a.date) - Date.parse(b.date)})
})
  // const { task , dates,activeid, task_title } : any = inject('location');
</script>
