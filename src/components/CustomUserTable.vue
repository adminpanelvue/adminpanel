<template>
    <v-container  class="bg-blue">
        
        <v-row class="pa-4 align-center" >
            <div :class="['text-h4', 'pa-2']">App Config</div>
            <v-spacer></v-spacer>
            <v-btn class="bg-white" @click="dialog = true">Hello</v-btn>
        </v-row>
            
        
    </v-container>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="length" :items="items"
        :loading="loading" class="elevation-1" item-value="name" @update:options="loadItems">
        <template v-slot:tfoot?>
            <tr>
                <td>
                    <v-text-field v-model="id" hide-details placeholder="ID ile arat" class="ma-2"
                        density="compact"></v-text-field>
                </td>
            </tr>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon size="small" class="me-2" @click="editUser(item)">
                mdi-pencil
            </v-icon>
            <v-icon size="small">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table-server>
    <template>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent width="1024">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props">
                        Open Dialog
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="user.firstName" label="First Name*" required value></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="user.lastName" label="Last Name*" hint="example of persistent helper text"
                                        persistent-hint required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="user.username" label="Username*" hint="example of persistent helper text" persistent-hint
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Email*" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Role*" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Password*" type="password" required></v-text-field>
                                </v-col>

                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="save">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </template>
</template>
  
<script>
import AxiosHelper from "../helper/axiosHelper";
export default {
    data: () => ({
        itemsPerPage: 5,
        dialog: false,
        user:{
            firstName:"",
            lastName:"",
            username:""
        },
        headers: [
            {
                title: 'First Name',
                align: 'start',
                sortable: false,
                //TODO Düzenlenecek
                key: 'firstName',
            },
            {
                title: 'Last Name',
                align: 'start',
                sortable: false,
                //TODO Düzenlenecek
                key: 'lastName',
            },
            { title: 'Username', key: 'username' },
            { title: 'Email', key: 'email' },
            { title: 'Role', key: 'role' },
            { title: 'Status', key: 'status' },
            { title: 'Actions', key: 'actions', sortable: false },
        ],
        items: [],
        loading: true,
        length: 0,
    }),
    methods: {
        async loadItems() {
            this.loading = true
            const response = await AxiosHelper.get(`/users`);
            const data = await response.data;
            this.items = data;
            this.loading = false;
        },
        async save(){
            console.log(this.user);

        },
        async editUser(item){
            this.user = item;
            this.dialog = true;
        }
    },
}
</script>