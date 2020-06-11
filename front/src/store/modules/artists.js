import Vue from 'vue';
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import {artistsDB} from '@/firebase'

const state = {
  artists: [
  ],
  search:"",
  filter:{
    date1:null,
    date2:null,
  }
};

const mutations = {
  setArtist(state, newArtists) {
    state.artists = newArtists;
  },
  setSearch(state, search){
    state.search = search;
  },
  setFilter(state, filter){
    state.filter = filter;
  },
  addArtist(state, newArtist) {
    artistsDB.push(newArtist);
  },

  updateArtist(state, payload) {
    const {key, newArtist} = payload;
    artistsDB.child(key).update(newArtist);
  },

  moveArtistOnMap(state, payload) {
    const index = state.artists.findIndex(
      artist => artist.name == payload.name
    );
    let newArtist = { ...state.artists[index] };
    newArtist.coords = [payload.coords.lng, payload.coords.lat];
    artistsDB.child(state.artists[index]['.key']).update(newArtist);
  },

  removeArtist(state, key) {
    artistsDB.child(key).remove();
  },
};

const actions = {
  async getArtistAction({ commit, dispatch }) {
    try {
      // request to back-end
      const data = {};
      commit('setArtists', data);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  bindArtists: firebaseAction(({ bindFirebaseRef }) => {
    // return the promise returned by `bindFirebaseRef`
    return bindFirebaseRef('artists', artistsDB)
  }),

  async addArtistAction({ commit, dispatch }, payload) {
    try {
      commit('addArtist', payload);
    } catch (error) {
      console.log(error);
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async updateArtistAction({ commit, dispatch }, payload) {
    try {
      commit('updateArtist', payload);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },

  async removeArtistAction({ commit, dispatch }, payloadId) {
    try {
      // request to back-end
      commit('removeArtist', payloadId);
    } catch (error) {
      dispatch('snackbar/showError', error.response.data, { root: true });
    }
  },
};

const getters = {
  getAllPeriods:(state)=>{
    console.log("getPeriods");

    let periods = new Set();
    console.log(state.artists);
    
    for (const artist of state.artists) {
      console.log(artist.artMovement);
      
      periods.add(artist.artMovement)
    }
    console.log(Array.from(periods));
    
    return Array.from(periods);
  },
  getAllArtists: state => state.artists,
  getArtistById: state => id =>  state.artists.filter(item => item['.key'] == id)[0],
  // get Artists based on current map
  getArtists: (state, getters, rootState, rootGetters) => {
    const map = rootGetters['map/getSelectedMap'].name;
    console.log("getArtists");
    
    let dates = 
    {
      January:0,
      February:1,
      March:2,
      April:3,
      May:4,
      June:5,
      July:6,
      August:7,
      September:8,
      October:9,
      November:10,
      December:11
    };
    return state.artists.filter(item => {
      
      let birthday = new Date(item.birthday.year, dates[item.birthday.month], item.birthday.day);
      let death = new Date(item.death.year, dates[item.death.month], item.death.day);
      let afterFirst = !state.filter.date1||new Date(state.filter.date1)<=birthday;
      let beforeSecond = !state.filter.date2||birthday<=new Date(state.filter.date2);
      let afterFirstDeath = !state.filter.date3||new Date(state.filter.date3)<=birthday;
      let beforeSecondDeath = !state.filter.date4||death<=new Date(state.filter.date4);
      let artMovement = !state.filter.period||item.artMovement.indexOf(state.filter.period)>-1;
      return item.map == map&&item.name.includes(state.search)&&afterFirst&&beforeSecond&&afterFirstDeath&&beforeSecondDeath&&artMovement;
    })
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
