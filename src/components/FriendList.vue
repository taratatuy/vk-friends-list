<template>
  <div @dragover.prevent @drop.prevent="drop" class="friendList">
    <div class="label">
      {{ columns[colKey].label }}
    </div>
    <ul>
      <slot />
    </ul>
  </div>
</template>

<script>
/**
 * Список каторчек.
 */
import { mapGetters } from 'vuex';

export default {
  name: 'FriendList',
  props: ['colKey'],
  computed: mapGetters(['columns']),

  methods: {
    drop(e) {
      const cardIndex = e.dataTransfer.getData('cardIndex');
      const colFromKey = e.dataTransfer.getData('colFromKey');
      this.$store.dispatch('transferCard', [
        colFromKey,
        this.colKey,
        cardIndex,
      ]);
    },
  },
};
</script>

<style scoped lang="scss">
.friendList {
  height: 100%;
  width: 100%;

  margin: 0 4px;
}

.label {
  padding: 8px 4px;
}

ul {
  height: 90%;

  list-style: none;
  padding: 0;
  margin: 0;

  outline: 1px solid rgba(0, 0, 0, 0.125);

  overflow: auto;
}
</style>
