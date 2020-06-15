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
            <li><a href="#line2">Artists</a></li>
            <li><a href="#line3">Paintings</a></li>
            <li><a href="#line4">Map</a></li>
          </ul>
        </nav>
      </v-col>

      <v-col cols="9">
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
                    <li><strong>Version : </strong> v 1.0</li>
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
                    <li>
                      <strong>License : </strong>
                      <a href="#" target="_blank">GNU License</a>
                    </li>
                  </ul>
                </div>

                <hr />
                <div>
                  <p>
                    First of all, Thank you so much for purchasing this template
                    and for being my loyal customer.
                    <strong>You are awesome!</strong>
                    <br />
                    You are entitled to get free lifetime updates to this
                    product + exceptional support from the author directly.
                  </p>

                  <p>
                    This documentation is to help you regarding each step of
                    customization. Please go through the documentation carefully
                    to understand how this template is made and how to edit this
                    properly. Basic HTML and CSS knowledge is required to
                    customize this template. You may learn basics
                    <a href="http://www.w3schools.com/" target="_blank">here</a
                    >,
                    <a href="https://developer.mozilla.org/" target="_blank"
                      >here</a
                    >
                    and
                    <a
                      href="http://learn.shayhowe.com/html-css/building-your-first-web-page/"
                      target="_blank"
                      >here</a
                    >.
                  </p>

                  <h4>Requirements</h4>
                  <p>
                    You will need the following to use our software:
                  </p>
                  <ol>
                    <li>
                      Web Browser for testing (eg: Google Chrome or Mozilla
                      Firefox)
                    </li>
                    <li>
                      Internet connection so that you can access remote Firebase
                      database.
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
              <p class="headline">
                When you first start the application you'll be presented with
                this view.
              </p>
              <v-img
                width="500"
                src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
              ></v-img>
              <p>
                Since this is a one-page appliaction, everything you need to use
                is just a few clicks (or shortcuts) away.
              </p>

              <p>
                By default, on grid view you'll see all artists for the World
                map. If you want to switch to paintings click
                <bold> Paintings </bold> tab at the top left of your screen.
              </p>

              <v-img
                width="500"
                src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
              ></v-img>

              <p>
                Additionally, if you want to switch from grid view of
                Artists/Paintings you'll need to click the list button.
              </p>

              <v-img
                width="500"
                src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
              ></v-img>
            </v-col>
          </v-row>
        </section>

        <section id="line1" class="section">
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
                width="500"
                src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
              ></v-img>

              <p>
                Starting from left-to-right first thing you can see are the
                Artists and Paintings tabs.
                <v-img
                  width="500"
                  src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
                ></v-img>
                By default this is set to Artists, but changing it to Paintings
                will yield in change of the items shown in the grid view.
                Instead of Artists you will see all Paintings.
              </p>

              <p class="mt-6">
                Next up is the search field.

                You can use search to find artists by their name.
              </p>

              <p>
                Tightly connect to search is the filter button. 
                Clicking it will open a drop down menu which you can use to filter 
                currently selected artists and paintings by their art movements, 
                mediums or even time periods.

                TIPTIOPThis functionality can be jointly used with search.
              </p>
            </v-col>
          </v-row>
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
@import '../css/style.css';
@import '../css/custom.css';
@import '../css/animate.css';
</style>
