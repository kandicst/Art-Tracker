import Vue from 'vue';

const state = {
    artists: [],
};

const mutations = {
    setArtist(state, newArtists){
        state.artists = newArtists;
    },

    addArtist(state, newArtist){
        state.artists.push(newArtist);
    },

    updateArtist(state, newArtist){
        const index = state.artists.findIndex(artist => artist.id == newArtist.id)
        Object.assign(state.artists[index], newArtist);
    },

    removeArtist(state, artistId){
        const index = state.artists.findIndex(artist => artist.id == artistId);
        state.artists.splice(index, 1)
    }
};

const actions = {
    async getArtistAction({commit, dispatch}) {
        try{
            // request to back-end
            const data = {}
            commit('setArtists', data);
        } catch(error){
            dispatch('snackbar/showError', error.response.data, { root: true})
        }
    },

    async addArtistAction({commit, dispatch}, payload) {
        try{
            console.log('-----------------')
            console.log(payload);
            // request to back-end
            const data = payload;
            commit('addArtist', data);
        } catch(error) {
            console.log(error);
            dispatch('snackbar/showError', error.response.data, { root: true})
        }
    },

    async updateArtistAction({commit, dispatch}, payload) {
        try{
            // request to back-end
            const data = payload
            commit('updateArtist', data);
        } catch(error) {
            dispatch('snackbar/showError', error.response.data, { root: true})
        }
    },

    async removeArtistAction({commit, dispatch}, payloadId) {
        try{
            // request to back-end
            const data = payloadId
            commit('removeArtist', data);
        } catch(error) {
            dispatch('snackbar/showError', error.response.data, { root: true})
        }
    },
};

const getters = {
    getArtists : state => state.artists,
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
