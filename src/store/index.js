import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
     task:[],
     message:''
     
  },


  mutations: {
      update(state,tas){
      const index = state.task.findIndex(task => task.id ===tas.id);
      if (index !== -1) {
        Vue.set(state.task, index,tas);
      }
    },
    delete(state,taskId){
      state.task = state.task.filter(task => task.id !== taskId);
      console.log(state.task)
    },
     setdata(state,data){
        state.task=data;
      
     },
     setmessage(state,data){
      state.message=data
     },
    
  },


  actions: {
           async update({commit},tasks){
            try{
            const token=localStorage.getItem("Token")
            const res= await axios.put("http://127.0.0.1:8000/api/update",
                   tasks,{ headers: {
                  'Authorization': `Bearer ${token}`   
            }
                }
             );
           console.log(res)
           commit('update',tasks);
            }
            catch(error){
                console.log(error)
            }                                                         
       },


         async get({commit},id){
         try {
            const token=localStorage.getItem("Token")
            const res = await axios.get(`http://127.0.0.1:8000/api/getdata/${id}`,{ headers: {
              Authorization: `Bearer ${token}`
            }}); 
            
            if(res.data.task.length>0){
            commit('setdata', res.data.task);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
       },


         async  delete({commit},id){
          try{   
                 const token=localStorage.getItem("Token")
                 const response = await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`, {
                                    headers: {
                                    Authorization: `Bearer ${token}`
                                     }
        });
        if(response.data.message==='Deleted'){
          commit('delete',id);
        } 
        }
        catch(error){
          console.log(error)
        }
      
  },
},

  getters: {
    gettask: (state) => state.task
  }
});
