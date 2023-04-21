import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'


import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// export default interface Fun{
//     addtask:string
// }

export interface Task{
    title:string,
    id:number,
    desc:string,
    date: string,
    check: boolean,
}

export interface TaskObject{
    [key:string]:{
        correct_options: {
            "1": string;
        };
        lang: {
            en: {
                description: string;
                options: {
                    [key:string]: string;
                };
            };
        };
        type: string;
    };
}

