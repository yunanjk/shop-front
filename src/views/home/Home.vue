<!--<script setup>-->

<!--</script>-->

<!--<template>-->

<!--</template>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <h2>HOME!!!!</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
