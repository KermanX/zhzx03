<script lang="ts">
import FileSyncVue from "./pages/FileSync.vue";
import ConsoleVue from "./pages/Console.vue";
export default {
  components: {
    "file-sync": FileSyncVue,
    "console": ConsoleVue
  },
  data() {
    return {
      pages: [
        {
          name: "文件同步",
          id: "file-sync"
        },
        {
          name: "控制台",
          id: "console"
        }
      ],
      activePage: 0
    }
  },
  methods: {
    clickItem(index: number) {
      this.activePage = index;
    }
  }
}
</script>

<template>
  <el-container>
    <el-header id="header" height="30px">

      <el-row :gutter="20">
        <el-col :span="4">
          .
        </el-col>
        <el-col :offset="6" :span="5">
          <span style="font-size: x-large;">
            {{ pages[activePage].name }}
          </span>
        </el-col>
      </el-row>
    </el-header>
    <el-main id="content">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-menu>
            <el-menu-item :class='"item" + (index === activePage ? " active" : "")' v-for="(item, index) in pages"
              :key="index" @click="clickItem(index)">
              {{ item.name }}
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <component :is="pages[activePage].id" />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

/**

#header #name {
  width: 150px;
  position: absolute;
  left: 0px;
  border-top-right-radius: 5px;
  background-color: rgb(152, 183, 219);
  text-align: middle;
}

#header #name span {
  top: 3px;
  position: relative;
  font-size: 25px;

}

#header #page span {
  position: relative;
  top: 14px;
}
 */