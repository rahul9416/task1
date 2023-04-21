<template>
    <div>
        <div  v-if="a.type === 'ques'">
            Question {{ a.ques_no }}
            <input type="text" :class="[a.ques_no===1?'mb-10':'my-10','bg-orange-500 w-96 border-2 border-black']" v-model="a.data"/></div>
        <div v-else>
            Option {{ a.option_no+1 }}
            <input type="text" class="ml-5 bg-orange-200 my-2 w-96 border-2 border-black" v-model="a.data"/>
            <button class="border-2 border-black ml-5 px-2" @click="del(a.option_no,a.ques_no)">Delete</button>
        </div>
    </div>
        
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue';

import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { taskobj } = storeToRefs(store);

const a = defineProps(['data','type', 'option_no', 'ques_no']);

const del=((optionNo:number,quesNo:string)=> {
    let key = Object.keys(taskobj.value[quesNo]["lang"]["en"]["options"])[optionNo];
    delete taskobj.value[quesNo]["lang"]["en"]["options"][key];
})


</script>