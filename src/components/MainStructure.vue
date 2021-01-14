<template>

  <main class="main">
    <div class="container">
      <template v-if="getInfo.editing">
        <div class="edit__content">
          <div class="main__content-top">
            <div class="main__img">
              <img :src="`${getInfo.icon}`" alt="icon">
            </div>
            <label>
              <textarea placeholder="Enter information" v-model="aboutInfo"
                        :class="{invalid: $v.aboutInfo.$dirty && !$v.aboutInfo.required }"
              />
            </label>
            <span
                v-if="$v.aboutInfo.$dirty && !$v.aboutInfo.required"
                class="helper-text invalid">Enter name</span>
          </div>
          <form @submit.prevent="saveChanges">
            <div class="edit__content-bottom">
              <div class="edit__name">
                <label>
                  <input type="text" v-model="aboutName" placeholder="Edit name"
                         :class="{invalid: $v.aboutName.$dirty && !$v.aboutName.required}"
                  >
                </label>
                <span
                    v-if="$v.aboutName.$dirty && !$v.aboutName.minLength"
                    class="helper-text invalid">Enter the name</span>
              </div>
              <div class="edit__email">
                <label>
                  <input type="email" v-model="aboutEmail" placeholder="Edit Email"
                         :class="{invalid: $v.aboutEmail.$dirty && !$v.aboutEmail.required }"
                  >
                </label>
                <span
                    v-if="$v.aboutEmail.$dirty && !$v.aboutEmail.required"
                    class="helper-text invalid">Enter email</span>
              </div>
              <div class="edit__phone">
                <label>
                  <input type="text" v-model="aboutPhone" placeholder="+380"
                         :class="{invalid: $v.aboutPhone.$dirty && !$v.aboutPhone.required && $v.aboutPhone.numeric}"
                  >
                </label>
                <span
                    v-if="$v.aboutPhone.$dirty && !$v.aboutPhone.minLength && $v.aboutPhone.numeric"
                    class="helper-text invalid">minLength (8)</span>
              </div>
              <div class="edit__img"

              >
                <label>
                  <input type="text" v-model="aboutImg" placeholder="Edit img"
                         :class="{invalid: $v.aboutImg.$dirty && !$v.aboutImg.required }"
                  >
                </label>
                <span
                    v-if="$v.aboutImg.$dirty && !$v.aboutImg.required"
                    class="helper-text invalid">Enter url for images</span>
              </div>
            </div>
            <button class="edit__btn" type="submit">
              Save
            </button>
          </form>

        </div>
      </template>
      <template v-else>
        <div class="main__content">
          <div class="main__content-top">
            <div class="main__img">
              <img :src="`${getInfo.icon}`" alt="icon">
            </div>
            <div class="main__info">
              <p>{{ getInfo.info }}</p>
            </div>
          </div>
          <div class="main__content-bottom">
            <div class="name"><p>{{ getInfo.name }}</p></div>
            <div class="email"><p>{{ getInfo.email }}</p></div>
            <div class="phone"><p>{{ getInfo.phone }}</p></div>
          </div>
        </div>
      </template>

    </div>
  </main>

</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {required, minLength, email, helpers} from 'vuelidate/lib/validators'

const numeric = helpers.regex('numeric', /^[0-9]*$/)

export default {
  name: "MainStructure",
  data() {
    return {
      aboutInfo: '',
      aboutPhone: '',
      aboutEmail: '',
      aboutName: '',
      aboutImg: '',
    }

  },
  methods: {
    ...mapMutations(['saveChange']),
    saveChanges() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return;
      }
      try {
        this.$store.commit('saveChange', {
          info: this.aboutInfo,
          phone: this.aboutPhone,
          email: this.aboutEmail,
          name: this.aboutName,
          icon: this.aboutImg,
          editing: false
        })
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {

    ...mapGetters(['getInfo'],
    )
  },
  async mounted() {
    const data = await localStorage.getItem('info')
    this.$store.commit('saveChange', JSON.parse(data))
  },
  validations: {
    aboutInfo: {required},
    aboutEmail: {
      required,
      email
    },
    aboutImg: {required},
    aboutPhone: {
      required,
      minLength: minLength(8),
      numeric

    },
    aboutName: {
      required,
      minLength: minLength(4)
    },
  },
}
</script>

<style lang="scss">
.container {
  max-width: 1230px;
  padding: 15px;
  margin: 0 auto;
}

.invalid {
  color: #f44336;
}

.helper-text {
  position: relative;
  min-height: 18px;
  display: block;
  font-size: 12px;
  color: #f44336;
}

.main {
  &__content {

    &-top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      textarea {
        width: 800px;
        height: 200px;
        padding: 10px;
        resize: none;
      }
    }

    &-bottom {
      display: grid;
      margin-top: 50px;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
          "name email"
          "phone phone";
      gap: 20px;

      .name,
      .email,
      .phone {
        border: 1px solid black;
        text-align: center;
        margin: 10px;
      }

      .name {
        grid-area: name;
      }

      .email {
        grid-area: email;
      }

      .phone {
        grid-area: phone;
      }
    }
  }

  &__img {
    img {
      width: 250px;
      height: 250px;
      border-radius: 50%;
    }
  }

  &__info {
    width: 800px;
    height: 200px;
    border: 3px solid black;
    padding: 10px;
  }

  .edit__content-bottom {
    display: grid;
    margin-top: 50px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
          "Editname Editemail"
          "Editphone Editimg";
    gap: 20px;

    input {
      width: 100%;
      height: 50px;
    }

    .edit__name {
      grid-area: Editname;
    }

    .edit__email {
      grid-area: Editemail;
    }

    .edit__phone {
      grid-area: Editphone;
    }

    .edit__img {
      grid-area: Editimg;
    }
  }

  .edit__btn {
    width: 500px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    background-color: transparent;
    cursor: pointer;
    display: block;
    margin: 40px auto 10px;
  }
}

</style>
