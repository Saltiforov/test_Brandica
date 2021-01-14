<template>
  <header class="header">
    <div class="header__content">
      <div class="header__img"><img :src="`${getInfo.icon}`" alt="icon"></div>
      <h2 class="header__name">{{ getInfo.name }}</h2>
      <button class="edit" type="submit" @click="accountEditing">
        <img src="@/assets/images/edit.svg" alt="edit">
      </button>
    </div>
  </header>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: "HeaderBar",
  data() {
    return {
      editingAcc: false
    }
  },
  methods: {
    ...mapMutations(['setEditing']),
    accountEditing() {
      this.$store.commit('setEditing', !this.editingAcc)
    }
  },
  computed: {...mapGetters(['getInfo'])}
}
</script>

<style lang="scss">
.edit {
  position: absolute;
  right: 20px;
  cursor: pointer;
  background-color: transparent;
  border: none;

  img {
    width: 40px;
    height: 40px;
  }
}

.header__content {
  display: flex;
  align-items: center;
  background-color: #FFD02F;
  position: relative;
}

.header__img {
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  padding-left: 20px;
}

.header__name {
  padding-left: 20px;
}
</style>
