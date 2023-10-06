<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer class="bg-dark" theme="dark" permanent>
        <v-list color="transparent">
          <v-img :width="295" aspect-ratio="16/9" cover src="@/assets/logo.png"></v-img>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Users" @click="user(0)"></v-list-item>
          <v-list-item prepend-icon="mdi-view-dashboard" title="i18n" @click="i18n(1)"></v-list-item>
          <v-list-item prepend-icon="mdi-view-dashboard" title="AppConfig List" @click="appconfig(2)"></v-list-item>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Labels" @click="labels(3)"></v-list-item>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Airports" @click="airport(4)"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main >
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>

export default {
  data() {
    return {
      value:0

    }
  },
  methods: {
    user(value) {
      this.value = value;
      this.$router.push("/users");
    },
    i18n(value) {
      this.value = value;

      this.$router.push("/i18n");
    },
    appconfig(value) {
      this.value = value;

      this.$router.push("/app-config");
    },
    labels(value) {
      this.value = value;

      this.$router.push("/labels");
    },
    airport(value) {
      this.value = value;

      this.$router.push("/airports");
    },

  }
}

</script>