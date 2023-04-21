import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {Task, TaskObject} from '@/main';

export const useCounterStore = defineStore('counter', () => {
  
  let task = ref('');
  let task_title=ref<string>('');
  let tasklists = ref<Task[]>([]);
  let activeid=ref(-5);
  let activetask = ref<Task | null >(null);
  let dates=ref('');

// Function to Add task in tasklist array
const addtasks = (()=>{
  const currentid = tasklists.value.length+1;
  let d = new Date(Date.now());

  dates.value=d.getFullYear()+"-"+((d.getMonth()+1)>9?(d.getMonth()+1):"0"+(d.getMonth()+1))+"-"+d.getDate();
  activetask.value={title:'',id:currentid,desc:'',date:dates.value,check:false};
  tasklists.value.push({title:'',id:currentid,desc:'',date:dates.value, check:false});
  task_title.value='';
  task.value='';
  activeid.value=currentid;
  });
// Functions to delete task in taskslist
const deletetasks = ((tasks:number) => {
  if(activeid.value===tasks){task.value=''}
  tasklists.value=tasklists.value.filter((task:Task) => {return task["id"]!==tasks});
  activeid.value=-5;
});
// Function to update task
const edit = ((tasks:number) => {
  activetask.value = tasklists.value.find((task:Task) =>  task["id"] === tasks) || null;
  if(activetask.value === null || undefined)
  {
    return alert('Error'+task);
  }
  task_title.value = activetask.value["title"];
  task.value=activetask.value?activetask.value['desc']:'';
  dates.value=activetask.value?activetask.value['date']:'';
  activeid.value = tasks;
});

const check = ((ids:number) => {
  tasklists.value.map((task:Task)=>{if(task["id"]===ids){task["check"]=!task["check"]}})
})

// Data fro practice

let taskobj= ref<TaskObject>({
  "1": {
    "correct_options": {
      "1": "1"
    },
    "lang": {
      "en": {
        "description": "<p textalign=\"left\" class=\"text-left\">Rahul</p>",
        "options": {
          "1": "<p textalign=\"left\" class=\"text-left\">yes</p>",
          "2": "<p textalign=\"left\" class=\"text-left\">no</p>",
          "3": "<p textalign=\"left\" class=\"text-left\">rest</p>",
          "4": "<p textalign=\"left\" class=\"text-left\">Ok</p>"
        }
      }
    },
    "type": "mc"
  },
  "2": {
    "correct_options": {
      "1": "2"
    },
    "lang": {
      "en": {
        "description": "<p textalign=\"left\" class=\"text-left\">Read</p>",
        "options": {
          "1": "<p textalign=\"left\" class=\"text-left\">learn</p>",
          "2": "<p textalign=\"left\" class=\"text-left\">vue</p>",
          "3": "<p textalign=\"left\" class=\"text-left\">nuxt</p>",
          "4": "<p textalign=\"left\" class=\"text-left\">developer</p>"
        }
      }
    },
    "type": "mc"
  }
});


return {task, dates,activeid, addtasks, deletetasks,tasklists,edit , task_title, check, taskobj}
})
