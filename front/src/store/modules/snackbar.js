const state = {
    show: false,
    color: "",
    text: "",
    orientation: "bottom",
}

const actions = {
    showSnackbar({commit}, params){
        commit("setSnackBar", params);
        setTimeout(() =>{
            commit("hideSnackBar");
        }, 3000)
    },

    hide({commit}){
        commit("hideSnackBar");
    }
}

const mutations = {
    setSnackBar(state, params){
        state.text = params[0];
        state.color = params[1];
        state.orientation = params[2];
        state.show = true;
    },

    hideSnackBar(state){
        state.color = "";
        state.text = "";
        state.orientation = "bottom"
        state.show = false;
    }
}

const getters = {
    getSnackBar: state => state.show,
    getSnackBarColor: state => state.color,
    getSnackBarText: state => state.text,
    getSnackBarOrientation : state => state.orientation,
}

export default {
    namespaced: true,
    state, mutations, getters, actions
}
