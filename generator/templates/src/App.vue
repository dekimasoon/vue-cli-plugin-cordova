<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile @click="route('/')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="route('/about')">
          <v-list-tile-action>
            <v-icon>info_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
      <%_ if (hasRouter) { _%>
        <router-view></router-view>
      <%_ } else { _%>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      <%_ } _%>
      </v-container>
    </v-content>
  </v-app>
</template>

<script<%- hasTS ? ' lang="ts"' : '' %>>
import Vue from 'vue';
<%_ if (!hasRouter) { _%>
import HelloWorld from './components/HelloWorld.vue';
<%_ } _%>

export default Vue.extend({
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    route(path<%- hasTS ? ': string' : '' %>) {
    <%_ if (hasRouter) { _%>
      this.drawer = false;
      this.$router.push(path);
    <%_ } else { _%>
      alert('no router! ' + path);
    <%_ } _%>
    },
  },
  <%_ if (!hasRouter) { _%>
  components: {
    HelloWorld
  },
  <%_ } _%>
});
</script>

<style>
body {
  background: #fafafa;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: constant(safe-area-inset-left);
  padding-left: env(safe-area-inset-left);
  padding-right: constant(safe-area-inset-right);
  padding-right: env(safe-area-inset-right);
}
</style>
