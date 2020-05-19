import Vue from 'vue';

const state = {
    dialogArtist : {},
    showDialog: false,
    dialogType: "add",
};
  
  
const mutations = {
    openAddDialog(state) {
        state.dialogArtist = {};
        state.showDialog = true;
        state.dialogType = "add";
    },

    openEditDialog(state, artist) {
        state.dialogArtist = Object.assign({}, artist);
        state.showDialog = true;
        state.dialogType = "add";
    },

    closeDialog(state) {
        state.showDialog = false;
    }
};
  
const actions = {

};
  
const getters = {
    getDialogArtist: (state) => state.dialogArtist,
    getDialogType: (state) => state.dialogType,
    getShowDialog: (state) => state.showDialog,
};
  
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
  