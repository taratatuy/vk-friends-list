<template>
  <div id="app">
    <header>
      <button @click="addColumn">Add new column</button>
    </header>
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

        <div v-for="colKey in getOtherCols()" :key="colKey" class="button-ph">
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
    ...mapGetters(['columns']),
  },

  methods: {
    /*
     * Вешаем листенер на виджет авторизации.
     */
    authWidgetListener() {
      window.VK.init({ apiId: 7793585 });
      window.VK.Widgets.Auth('vk_auth', {
        width: '250px',
        onAuth: this.onLogIn,
      });
    },

    /*
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

    /*
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

    /*
     * Лог в консоль.
     */
    showLog(colKey) {
      const output = [];
      this.columns[colKey].cards.forEach((card) => {
        output.push(`${card.first_name} ${card.last_name}`);
      });

      console.log(output);
    },

    getOtherCols() {
      return Object.keys(this.columns).filter((key) => {
        return key != 'col1';
      });
    },

    addColumn() {
      this.$store.dispatch('addColumn');
      console.log(this.columns);
      this.$forceUpdate();
    },
  },
  async mounted() {
    this.authWidgetListener();
  },
};
</script>

<style lang="scss">
@import './scss/base.scss';

.button-ph {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  display: block;

  font-size: 20px;

  height: 100%;
  width: 100%;

  margin: 16px;
}

#vk_auth,
button {
  max-width: 400px;
}

body ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* Track */
body ::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: rgba(240, 240, 240, 0.8);
}

/* Handle */
body ::-webkit-scrollbar-thumb {
  -webkit-border-radius: 6px;
  border-radius: 6px;
  background: rgba(210, 210, 210, 0.8);
}

body ::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(200, 200, 200, 0.8);
}
</style>
