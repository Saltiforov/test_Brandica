<template>
  <div class="home">
    <header-bar/>
    <main-structure/>

  </div>
</template>

<script>
// @ is an alias to /src


import HeaderBar from "@/components/HeaderBar";
import MainStructure from "@/components/MainStructure";

export default {
  name: "Home",
  components: {
    MainStructure,
    HeaderBar

  }
};
</script>
