<template>

<div class="container">
  <div v-for="(value, key, index) in taskobj" :key="index">
    <div v-for="(values, keys, indexs) in value" :key="indexs">
      <div v-if="keys ==='lang'">
        <div v-for="ques in values" :key="index">
          <div v-for="(ques_values, ques_keys, ques_index) in ques">
            <div v-if="ques_keys === 'description'"><Option :data="ques_values" :ques_no="index+1" type="ques"/></div>
            <div v-else v-for="(option_values, option_keys, option_index) in ques_values" :key="option_index">
              <Option :data="option_values" :option_no="option_index" type="ans" :ques_no="index+1" :comp_data="key"/>
            </div>
            
          </div>
          <button class="border-2 border-black ml-5 px-2" @click="addOption(key)">Add Option</button>
          <button class="border-2 border-black ml-5 px-2" @click="deleteQues(index+1)">Delete Question</button>
        </div>
      </div>
    </div>
    <button v-if="Object.keys(taskobj).length === Number(key)" class="border-2 border-black ml-5 mt-10 px-2" @click="addQues">Add Question</button>
  </div>
</div>

</template>

<script setup lang="ts">
import Option from './Option.vue';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useCounterStore();
const { taskobj } = storeToRefs(store);
let newTask:{} = ref()

const addOption = ((quesNo:string | number) => {
  newTask = taskobj.value[quesNo]["lang"]["en"]["options"];
  let newQues = Object.keys(newTask).length+1;
  taskobj.value[quesNo]["lang"]["en"]["options"][newQues] = "" ;
})

const addQues = (()=>{
  let newQues = Object.keys(taskobj.value).length+1;
  let newQuesData = {
    "correct_options": {
      "1": "2"
    },
    "lang": {
      "en": {
        "description": "",
        "options": {
          "1": ""
        }
      }
    },
    "type": "mc"
  }
  Object.assign(taskobj.value,{[newQues]:newQuesData});
})

const deleteQues = ((quesNo:string | number) => {
  delete taskobj.value[quesNo];
})

</script>