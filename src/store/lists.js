export default {
  state: {
    columns: {
      col1: { label: 'All friends', cards: [] },
      col2: { label: 'Selected friends', cards: [] },
      // Для добавления колонок добавить новую строку, аналогичноую тем, что выше.
    },
  },
  mutations: {},
  actions: {
    setColumn({ state }, [colKey, cards]) {
      state.columns[colKey].cards = cards || [];
    },

    transferCard({ state }, [colFromKey, colToKey, cardIndex]) {
      state.columns[colToKey].cards.push(
        state.columns[colFromKey].cards[cardIndex]
      );
      state.columns[colFromKey].cards.splice(cardIndex, 1);
    },

    /**
     * Очискта списков при новом логине.
     */
    clearData({ state }) {
      Object.keys(state.columns).forEach((colKey) => {
        state.columns[colKey].cards = [];
      });
    },
  },
  getters: {
    columns(state) {
      return state.columns;
    },
  },
};
