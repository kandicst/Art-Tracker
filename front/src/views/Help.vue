<template>
  <v-container>
    <section id="top" class="section docs-heading">
      <v-row justify="center">
        <v-col cols="12" align="center">
          <div class="big-title text-center">
            <h1>Artist Tracker</h1>
          </div>
        </v-col>
      </v-row>
      <v-divider class="mx-12"></v-divider>
    </section>

    <v-row justify="start">
      <v-col cols="3">
        <nav
          class="docs-sidebar"
          data-spy="affix"
          data-offset-top="300"
          data-offset-bottom="200"
          role="navigation"
        >
          <ul class="nav headline">
            <li><a href="#line1">Getting Started</a></li>
            <li><a href="#toolbar">Toolbar</a></li>
            <li><a href="#artists" class="#artists">Artists</a></li>
            <li><a href="#paintings" class="#paintings">Paintings</a></li>
            <li><a href="#map">Map</a></li>
          </ul>
        </nav>
      </v-col>

      <v-col cols="9" lg="7" class="pr-6">
        <v-row>
          <v-col cols="12">
            <h2 class="dark-text display-2">
              Introduction
              <hr />
            </h2>
            <v-row>
              <v-col cols="12">
                <div class="intro1">
                  <ul>
                    <li>
                      <strong>Description : </strong>
                      Software for visualizing artists and their paintings
                    </li>
                    <li><strong>Version : </strong> v1.0</li>
                    <li>
                      <strong>Authors : </strong>
                      <a href="https://github.com/ssttefann" target="_blank"
                        >Stefan Kandic
                      </a>
                      ,
                      <a href="https://github.com/ssttefann" target="_blank"
                        >Dusan Stojancevic
                      </a>
                      ,
                      <a href="https://github.com/ssttefann" target="_blank"
                        >Nikola Papic
                      </a>
                    </li>

                  </ul>
                </div>

                <hr />
                <div>
                  <p>
                    This documentation is to help you regarding each step of
                    using the application. Please go through the documentation
                    carefully to understand how it works so you can use it
                    efficiently.
                  </p>

                  <h4>Requirements</h4>
                  <p>
                    You will need the following:
                  </p>
                  <ol>
                    <li>
                      <p>
                        Web Browser (eg: Google Chrome or Mozilla Firefox)
                      </p>
                    </li>
                    <li>
                      <p>
                        Internet connection so that you can access remote
                        Firebase database.
                      </p>
                    </li>
                  </ol>
                </div>
              </v-col>
            </v-row>
            <!-- end row -->
          </v-col>
        </v-row>

        <section id="line1" class="section">
          <v-row>
            <v-col cols="12">
              <div class="dark-text display-2">
                Getting started <a href="#top">#back to top</a>
                <hr />
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <p>
                When you first start the application you'll be presented with
                this view:
              </p>
              <v-img
                width="800"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fwhole_window.png?alt=media&token=bc948bf3-e5c7-4fac-b0a2-d80510f86eae"
              ></v-img>
              <p>
                This is the UI for our application, before you start doing any
                serious work, we suggest you get familiar with it first. Also,
                since this is a one-page appliaction, everything you need to use
                is just a few clicks (or shortcuts) away.
              </p>

              <p>
                By default, on grid view you'll see all artists for the World
                map. If you want to switch to paintings click
                <strong>Paintings</strong> tab at the top left of your screen.
              </p>

              <v-img
                width="250"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Ftabs.png?alt=media&token=b35374a4-8901-4442-8e7f-0ad65c3fd636"
              ></v-img>

              <p>
                Additionally, if you want to switch from grid view of
                artists/paintings you'll need to click the list button.
              </p>

              <v-img
                width="300"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fgrid_list.png?alt=media&token=9e99b062-0787-4352-9755-734f24ae2fed"
              ></v-img>
            </v-col>
          </v-row>
        </section>

        <section id="toolbar" class="section">
          <v-row>
            <v-col cols="12">
              <div class="dark-text display-2">
                Toolbar <a href="#top">#back to top</a>
                <hr />
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <p>
                For advanced usage of the application, knowing your way around
                using a toolbar is essential. Toolbar is located at the top of
                the page and contains several useful features.
              </p>
              <v-img
                width="800"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Ftoolbar.png?alt=media&token=1cc6cc12-64e2-4092-b3b9-8144ee7a151d"
              ></v-img>

              <p class="mt-6">
                First element is the search field. You can use search to find
                artists by their name.
              </p>

              <v-img
                width="500"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fsearch.png?alt=media&token=07b512f0-130b-47a0-9e9a-813953cea4ca"
              ></v-img>

              <p>
                Connect to search is the <strong>Filter</strong> button.
                Clicking it will open a drop down menu which you can use to
                filter currently selected artists and paintings by their art
                movements, mediums or even time periods.
              </p>

              <v-img
                width="500"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Ffilter.png?alt=media&token=020576d9-3faf-4d17-a10f-d50d0c9bd857"
              ></v-img>

              <div class="intro1 px-2 py-3">
                <strong>Tip: </strong>
                Filter functionality can be jointly used with search.
              </div>

              <p class="mt-6">
                After filter, comes the select component used to toggle the map.
                Right now, our application supports 4 predefined maps: World,
                Europe, USA and <strong>Serbia</strong>. Every map has its own
                data, and by toggling the current map, that data will be
                displayed on the Grid/List view and on the Map component.
              </p>

              <v-img
                width="200"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fmap_select.png?alt=media&token=45a9cc85-55d1-4581-ab14-de346a0c6b8e"
              ></v-img>

              <p class="mt-6">
                And finally, on the far-right there are
                <strong>Keyboard shortcuts</strong> button and
                <strong>Help Menu</strong>. Clicking on the Keyboard shortcuts
                will display a dialog showcasing all the shortcuts available in
                the application.
              </p>
              <v-img
                width="500"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fshortcuts.png?alt=media&token=d0517aa5-5712-4383-8fce-c7c083dfb8f3"
              ></v-img>
              <p>
                If you really want to be productive while using this
                application, we suggest you to learn and use them.
              </p>

              <p>
                However, If you are still confused, you can find tutorial videos in the
                help menu that will give you practical examples of all important
                features of the app.
              </p>

              <v-img
                width="250"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fhelp.png?alt=media&token=83a988d1-2c83-4aa0-9826-932f4754fda4"
              ></v-img>
            </v-col>
          </v-row>
        </section>

        <section id="artists" class="section">
          <v-row>
            <v-col cols="12">
              <div class="dark-text display-2">
                Artists <a href="#top">#back to top</a>
                <hr />
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <p>
                One of the entities that can be directly manipulared are
                Artists. You can add new ones, edit existing or delete them.
              </p>

              <p class="title">Add new artist</p>
              <p>
                You can add a new artist by clicking a Add New Artist button on
                the toolbar shown before. After that, a dialog will open with a
                form for all important information.
              </p>

              <v-img
                width="500"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fadd_artist.png?alt=media&token=95d4fbbb-1ed3-4d54-ad69-bca5f48855f4"
              ></v-img>
              <div class="intro1 px-2 py-3">
                <strong>Note: </strong>
                If artist is alive you don't need to fill death fields
              </div>

              <p class="title">Edit existing artist</p>
              <p>
                In case you need to change already existing artist, you don't
                have to delete him and then add again, you can just click on him
                in Grid View and select <strong>Edit</strong> option.
              </p>
              <v-img
                width="300"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fedit_artist1.png?alt=media&token=61312342-168c-4316-86cf-87f9ff273527"
              ></v-img>
              <p>
                Now, a dialog similar to add dialog will open. After you've
                finished updating the fields and submitted, all changes will be
                immediately visible.
              </p>

              <p class="title">Delete artist</p>
              <p>
                The process is similar to editing an artist, you click on artist
                you want to delete in Grid View, and now instead of
                <strong>Edit</strong> you choose <strong>Delete</strong>
                option. A dialog will open that you will need to confirm in
                order to complete the deletion.
              </p>
              <v-img
                width="400"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fdelete_artist.png?alt=media&token=11e11288-859c-49a8-aded-41311395abf7"
              ></v-img>
              <div class="intro1 px-2 py-3">
                <strong>Note: </strong>
                You can't delete an artist who has paintings, you will need to
                delete them first.
              </div>
              <div class="intro1 px-2 py-3">
                <strong>IMPORTANT: </strong>
                This will permanently delete an artist from database.
              </div>
              <v-img></v-img>
            </v-col>
          </v-row>
        </section>

        <section id="paintings" class="section">
          <v-row>
            <v-col cols="12">
              <div class="dark-text display-2">
                Paintings <a href="#top">#back to top</a>
                <hr />
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <p>
                Second entity in the system are paintings. They are directly
                connected to one artist, and can't be created without them.
              </p>

              <p class="title">Add new painting</p>
              <p>
                You can add a new painting by clicking a Add New Painting button
                on the toolbar shown before. After that, a dialog will open with
                a form for all important information.
              </p>

              <v-img
                width="500"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fadd_painting.png?alt=media&token=65fe4809-82c5-4cb3-803e-3ac0c4114295"
              ></v-img>

              <p class="title">Edit existing painting</p>
              <p>
                In case you need to change already existing painting, you don't
                have to delete it and then add it again, you can just click on
                him in Grid View and select <strong>Edit</strong> option.
              </p>
              <v-img
                width="300"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fedit_painting.png?alt=media&token=b9c4becb-30c2-4c16-96c6-18941cd14da7"
              ></v-img>
              <p>
                After you've finished updating the fields and submitted, all
                changes will be immediately visible.
              </p>

              <p class="title">Delete painting</p>
              <p>
                The process is similar to editing, you click on painting you
                want to delete in Grid View, and now instead of
                <strong>Edit</strong> you choose <strong>Delete</strong>
                option. A dialog will open that you will need to confirm in
                order to complete the deletion.
              </p>
              <v-img
                width="400"
                src="https://firebasestorage.googleapis.com/v0/b/hci-grupni.appspot.com/o/docs%2Fdelete_painting.png?alt=media&token=b0e2439e-1c00-4740-9de3-747430b453e7"
              ></v-img>
              <div class="intro1 px-2 py-3">
                <strong>IMPORTANT: </strong>
                This will permanently delete the painting from database.
              </div>
              <v-img></v-img>
            </v-col>
          </v-row>
        </section>

        <section id="map" class="section">
          <v-row>
            <v-col cols="12">
              <div class="dark-text display-2">
                Map <a href="#top">#back to top</a>
                <hr />
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <p>
                Instead of updating artist's or paintings' location using the
                update form, you can directly manipulate them on the map.
              </p>

              <p>
                Artists and paintings are represented on map with markers, and
                you can't drag and drop those markers across the map, updating
                entitity's location and connections with other entities in
                real-time.
              </p>
              <div class="intro1 px-2 py-3">
                <strong>IMPORTANT: </strong>
                We know that maps are cool and stuff, but if you want accuracy,
                geocoding using geographical names is the way to go.
              </div>
            </v-col>
          </v-row>
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      context: '',
    };
  },
  mounted() {
    this.context = this.$route.hash;
    if (!this.context) return;
    document.getElementsByClassName(this.context)[0].click();
  },
};
</script>

<style scoped>
@import '../css/style.css';
@import '../css/custom.css';
@import '../css/animate.css';

p {
  font-size: 16px !important;
}
</style>
