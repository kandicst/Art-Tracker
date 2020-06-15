const getInitialState = () => {
  return {
    text: "",
    snackbar: false,
    color: ""
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },

  showSnackbar(state, data) {
    state.text = data.text;
    state.snackbar = true;
    state.color = data.color;
  },

  closeSnackbar(state) {
    state.text = "";
    state.snackbar = false;
    state.color = "";
  },

  setSnackbar(state, value) {
    state.snackbar = value;
  }
};

const actions = {
  closeSnackbar({ commit }) {
    commit("closeSnackbar");
  },

  showError({ commit }, text) {
    commit("showSnackbar", { text, color: "error" });
  },

  showSuccess({ commit }, text) {
    commit("showSnackbar", { text, color: "success" });
  }
};

const getters = {
  getSnackbar: state => state.snackbar,
  getText: state => state.text,
  getColor: state => state.color
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
