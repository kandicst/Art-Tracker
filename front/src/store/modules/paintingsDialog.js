import Vue from 'vue';

const state = {
  dialogPainting: {
    name: '',
    artistId: '',
    created: '',
    location: '',
    medium: '',
    description: '',
    artMovement: '',
    img: '',
  },
  showDialog: false,
  dialogType: 'add',
};

const mutations = {
  openAddDialog(state) {
    const painting = {
      name: '',
      artistId: '',
      created: '',
      location: '',
      medium: '',
      description: '',
      artMovement: '',
      img: '',
    };
    Object.assign(state.dialogPainting, painting);
    state.showDialog = true;
    state.dialogType = 'add';
  },

  openEditDialog(state, painting) {
    Object.assign(state.dialogPainting, painting);
    state.showDialog = true;
    state.dialogType = 'edit';
  },

  closeDialog(state) {
    state.showDialog = false;
  },

  resetDialogPainting(state) {
    const painting = {
      name: '',
      artistId: '',
      created: '',
      location: '',
      medium: '',
      description: '',
      artMovement: '',
      img: '',
    };
    Object.assign(state.dialogPainting, painting);
  },
};

const actions = {};

const getters = {
  getDialogPainting: state => state.dialogPainting,
  getDialogType: state => state.dialogType,
  getShowDialog: state => state.showDialog,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
