<template>
  <div class="friend-card" draggable="true" @dragstart="dragStart">
    <div>
      <img
        :src="card.photo_100"
        alt="friend avatar"
        height="50"
        width="50"
        draggable="false"
      />
    </div>
    <div class="friend-meta">
      <div>{{ card.first_name }}</div>
      <div>{{ card.last_name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Friend',
  props: ['index', 'colKey', 'card'],
  methods: {
    dragStart(e) {
      e.dataTransfer.setData('cardIndex', this.index);
      e.dataTransfer.setData('colFromKey', this.colKey);
    },
  },
};
</script>

<style scoped lang="scss">
.friend-card {
  margin: 4px;
  padding: 4px;

  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 15px;
}

img {
  border-radius: 50%;
}

.friend-meta {
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    padding: 0 2px;
    font-weight: bold;
  }
}
</style>
