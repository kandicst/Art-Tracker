import Vue from 'vue';

const state = {
  dialogArtist: {
    name: '',
    birthday: { day: '', month: '', year: '' },
    birthplace: '',
    nationality: '',
    artMovement: '',
    death: { day: '', month: '', year: '' },
  },
  showDialog: false,
  dialogType: 'add',
};

const mutations = {
  openAddDialog(state) {
    const artist = {
      name: '',
      birthday: { day: '', month: '', year: '' },
      birthplace: '',
      nationality: '',
      artMovement: '',
      death: { day: '', month: '', year: '' },
    };
    Object.assign(state.dialogArtist, artist);
    state.showDialog = true;
    state.dialogType = 'add';
  },

  openEditDialog(state, artist) {
    Object.assign(state.dialogArtist, artist);
    state.showDialog = true;
    state.dialogType = 'add';
  },

  closeDialog(state) {
    state.showDialog = false;
  },

  resetDialogArtist(state) {
    const artist = {
        name : "",
        birthday: {day: '', month: '', year: ''},
        birthplace: '',
        nationality: '',
        artMovement: '',
        death: {day: '', month: '', year: ''},
    };
    Object.assign(state.dialogArtist, artist);
  },
};

const actions = {};

const getters = {
  getDialogArtist: state => state.dialogArtist,
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
