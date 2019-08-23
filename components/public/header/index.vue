<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <Topbar/>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <Searchbar />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Topbar from './topbar.vue';
import Searchbar from './searchbar';
export default {
  components:{
    Topbar,
    Searchbar
  }
}
</script>
