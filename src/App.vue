<template>
  <div id="app">
    <header></header>
    <div class="wrapper">
      <div class="flex list-row">
        <FriendList
          v-for="colKey in Object.keys(columns)"
          :key="colKey"
          :colKey="colKey"
        >
          <Friend
            v-for="(friend, index) in columns[colKey].cards"
            :key="friend.id"
            :index="index"
            :colKey="colKey"
            :card="friend"
          />
        </FriendList>
      </div>

      <div class="flex">
        <div class="button-ph">
          <div id="vk_auth"></div>
        </div>

        <div v-for="colKey in otherCols" :key="colKey" class="button-ph">
          <button type="button" @click="showLog(colKey)">
            Log {{ columns[colKey].label }}
          </button>
        </div>
      </div>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FriendList from '@/components/FriendList.vue';
import Friend from '@/components/Friend.vue';

export default {
  name: 'App',
  components: {
    FriendList,
    Friend,
  },

  computed: {
    otherCols() {
      return Object.keys(this.columns).filter((key) => {
        return key != 'col1';
      });
    },
    ...mapGetters(['columns']),
  },

  methods: {
    /**
     * Вешаем листенер на виджет авторизации.
     */
    authWidgetListener() {
      window.VK.init({ apiId: 7793585 });
      window.VK.Widgets.Auth('vk_auth', {
        width: '200px',
        onAuth: this.onLogIn,
      });
    },

    /**
     * Обработчик авторизации.
     */
    onLogIn() {
      this.callAPI('friends.get', {
        fields: 'photo_100',
      })
        .then((res) => {
          this.$store.dispatch('clearData');
          this.$store.dispatch('setColumn', ['col1', res.items]);
        })
        .catch((e) => {
          alert('Login error: ' + e);
        });
    },

    /**
     * Запрос к апи вк через open API.
     */
    callAPI(method, params) {
      params.v = 5.73;
      return new Promise((resolve, reject) => {
        window.VK.api(method, params, (data) => {
          if (data.error) {
            reject(data.error);
          } else {
            resolve(data.response);
          }
        });
      });
    },

    /**
     * Лог в консоль.
     */
    showLog(colKey) {
      const output = [];
      this.columns[colKey].cards.forEach((card) => {
        output.push(`${card.first_name} ${card.last_name}`);
      });

      console.log(output);
    },
  },
  async mounted() {
    this.authWidgetListener();
  },
};
</script>

<style lang="scss">
@import './scss/base.scss';

header,
footer {
  margin: 0 auto;
  min-height: 50px;
}

.wrapper {
  width: 100%;
  min-width: 500px;
  max-width: 1080px;
  min-height: 550px;
  margin: 0 auto;
  padding: 0 8px;

  flex-grow: 1;
}

.list-row {
  height: 75%;
}

.button-ph {
  display: flex;
  justify-content: center;
  align-items: center;

  flex-grow: 2;
}

button {
  display: block;

  font-size: 20px;

  margin: 16px auto;
}

#vk_auth,
button {
  max-width: 400px;
}
</style>
