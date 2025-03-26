<template>
  <div>
  
  <div class="tableouter">
  
    <div class="table-container">
  
      <div class="divider">
        <center> <p :style="{ height:'40px',fontSize:'18px',marginBottom:'5px',color:color,
        textTransform:'uppercase',fontWeight:'bold',textDecoration:'underline'}">{{ message }}</p></center> 

        <h3 :style="{ textTransform: 'uppercase', fontSize: '1em', color: '#191970' }">
          Pending Task
        </h3>
        <table :style="{ border: '1px solid black', width: '75%', margin: '1em' }">
          <thead :style="{ backgroundColor: 'rgb(227, 238, 238)' }">
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Status</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in getdata" :key="index" :style="line(task)">
              <td>
                <span v-if="isEditing === task.id">
                  <input type="text" v-model="update.title" />
                </span>
                <span v-else>{{ task.title }}</span>
              </td>

              <td>
                <span v-if="isEditing === task.id">
                  <input type="text" v-model="update.description" />
                </span>
                <span v-else>{{ task.description }}</span>
              </td>

              <td>
                <span v-if="isEditing === task.id">
                  <input
                    type="checkbox"
                    v-model="update.status"
                    :style="{ transform: 'scale(1.9)' }"
                  />
                </span>
                <span v-else>
                  <input
                    type="checkbox"
                    :style="{ transform: 'scale(1.9)', border: '1px solid black' }"
                    :checked="task.status === 'Completed'"
                    disabled
                  />
                </span>
              </td>
              <td>
                <button class="Editbutton" v-if="isEditing === task.id" @click="save()">
                  Save
                </button>
                <button class="Editbutton" v-else @click="edit(task)">Edit</button>
                <button class="Deletebutton" @click="deleteTask(task.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
       
        <h3 :style="{ textTransform: 'uppercase', fontSize: '1em', color: '#191970' }">
          Completed Task
        </h3>
        <table :style="{ border: '1px solid black', width: '75%', margin: '1em' }">
          <thead :style="{ backgroundColor: 'rgb(227, 238, 238)' }">
            <tr>
              <th>Task</th>

              <th>Description</th>
              <th>Status</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in pending" :key="index" :style="line(task)">
              <td>
                <span v-if="isEditing === task.id">
                  <input type="text" v-model="update.title" />
                </span>
                <span v-else>{{ task.title }}</span>
              </td>

              <td>
                <span v-if="isEditing === task.id">
                  <input type="text" v-model="update.description" />
                </span>
                <span v-else>{{ task.description }}</span>
              </td>

              <td>
                <span v-if="isEditing === task.id">
                  <input
                    type="checkbox"
                    v-model="update.status"
                    :style="{ transform: 'scale(1.9)' }"
                  />
                </span>
                <span v-else>
                  <input
                    type="checkbox"
                    :style="{ transform: 'scale(1.9)', border: '1px solid black' }"
                    :checked="task.status === 'Completed'"
                    disabled
                  />
                </span>
              </td>
              <td>
                <button class="Editbutton" v-if="isEditing === task.id" @click="save()">
                  Save
                </button>
                <button class="Editbutton" v-else @click="edit(task)">Edit</button>
                <button class="Deletebutton" @click="deleteTask(task.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 v-show="visible">rthr</h3>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { computed } from "vue";
import store from "../store/index";
import Login from "./Login.vue";

export default {
  name: "Taskbody",

  data() {
    return {
      isEditing: "",
      color:'green',
      message:'',
      update: {
        title: "",
        description: "",
        status: false,
      },
      pending: [],
      tasks: [],
      visible: false,
    };
  },
  computed: {
    getdata() {
      const data = this.$store.getters.gettask;
      this.message=this.$store.state.message;
      if(this.message){
       setTimeout(()=>{
         this.$store.commit('setmessage','')
       },1000)
           
      }
      let obj = [];
      const y = data.filter((task) => {
        if (task.status === "Completed") {
          obj.push(task);
        } else {
          return task;
        }
      });
      this.pending = obj;

      return y;
    },
  },

  methods: {
    edit(task) {
      this.isEditing = task.id;
      this.update = {
        ...task,
        status: task.status === "Completed",
      };
    },
    line(task) {
      if (task.status === "Completed") {
        return "text-decoration: line-through";
      }
    },

    save() {
      this.update.status = this.update.status ? "Completed" : "Pending";
      this.$store.dispatch("update", this.update);
      this.isEditing = "";
      this.color='green'
      this.$store.commit('setmessage','Updated SucessFully')
      this.resetForm();
    },

    deleteTask(id) {
      this.$store.dispatch("delete", id);
      this.color='red'
      this.$store.commit('setmessage','Deleted SucessFully')
    },

    resetForm() {
      this.update = { title: "", description: "", status: false };
    },
  },

  created() {
    if (!localStorage.getItem("Token")) {
      this.$router.push("/login");
    }
    const id = localStorage.getItem("id");
    this.$store.dispatch("get", id);
    console.log("Hi");
  },
};
</script>
<style>
.tableouter {
  display: flex;
  margin-left: 10em;
}
.table-container {
  display: flex;
  justify-content: center;
  margin-top: 4em;
  align-items: center;
}
.divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
}
table {
  background-color: rgba(252, 252, 252, 0.986);
  border-spacing: 20px;
  table-layout: fixed;
  border-radius: 10px;
}
table th {
  font-size: larger;
}
.Deletebutton {
  padding: 0.6em;
  margin-left: 5px;
  background-color: rgb(160, 56, 56);
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.Deletebutton:hover {
  background-color: rgb(221, 38, 38);
}
.Editbutton {
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 8px;
  border: none;
  padding-bottom: 8px;
  background-color: rgba(20, 167, 76, 0.973);
  border-radius: 5px;
  cursor: pointer;
}
.Editbutton:hover {
  background-color: green;
}
.tableouter {
  height: auto;
  width: 80%;
}

table td {
  font-weight: 200;
  text-align: center;
  font-size: larger;
}
</style>
