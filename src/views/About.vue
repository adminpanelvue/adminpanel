<template>
    <v-app-bar>
        <v-container class="bg-blue">

            <v-row class="pa-4 align-center">
                <div :class="['text-h4', 'pa-2']">About</div>
                <v-spacer></v-spacer>

            </v-row>
        
        </v-container>
    </v-app-bar>

    <div>
        <h1 style="color: rgb(33, 33, 145); text-align: center;">
            Welcome!
        </h1>
        <h2 style="color: rgb(14, 14, 72); text-align: center;">
            Ajet Admin Panel
        </h2>
        <a href="https://www.anadolujet.com/tr">
            <p style="text-align:center">@anadolujet</p>
        </a>
        <v-banner></v-banner>

    </div>
</template>