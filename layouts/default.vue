<template>
  <div>
    <el-header height="200px">
      <Header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>

  </div>
</template>

<script>
import Header from '../components/public/header/index.vue';
import Footer from '../components/public/footer/index.vue'
export default {
  components:{
    Header,
    Footer
  }
}
</script>
