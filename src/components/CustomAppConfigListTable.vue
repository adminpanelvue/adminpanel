<template>
    <v-app-bar>
        <v-container class="bg-blue">

            <v-row class="pa-4 align-center">
                <div :class="['text-h4', 'pa-2']">AppConfig List</div>
                <v-dialog v-model="dialogAdd" persistent width="1024">
                    <template v-slot:activator="{ props }">
                        <v-col class="text-right">
                            <v-btn v-bind="props" class="bg-white" @click="dialogAdd = true">Add</v-btn>
                        </v-col>

                    </template>

                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Add Labels</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="Name*" hint="example of persistent helper text" persistent-hint
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Value*" required></v-text-field>
                                    </v-col>

                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn text="Close" @click="dialogAdd = false"></v-btn>

                            <v-btn :loading="btnLoading" color="blue-darken-1" variant="text" @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>


                    </v-card>


                </v-dialog>


            </v-row>


        </v-container>
    </v-app-bar>

    <v-snackbar v-model="snackbar" location="center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore
        voluptatibus!
        Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde
        voluptatem!

        <template v-slot:actions>
            <v-btn @click="snackbar = false">Close</v-btn>
        </template>
    </v-snackbar>

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
            <v-icon size="small" class="me-2" @click="dialog = true">
                mdi-pencil
            </v-icon>
            <v-icon size="small" class="me-2" @click="deleteUser(item)">
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
                        <span class="text-h5">Save AppConfig</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Name*" hint="example of persistent helper text" persistent-hint
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Value*" required></v-text-field>
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
                        <v-btn :loading="btnLoading" color="blue-darken-1" variant="text" @click="save">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="dialogDelete = false">Cancel</v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="dialogDelete = false">OK</v-btn>
                        <v-spacer></v-spacer>
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
        itemsPerPage: 10,
        dialog: false,
        dialogAdd: false,
        dialogDelete: false,
        headers: [
            { title: 'ID', key: 'id' },
            {
                title: 'Name',
                align: 'start',
                sortable: false,
                //TODO Düzenlenecek
                key: 'name',
            },
            {
                title: 'Value',
                align: 'start',
                sortable: false,
                //TODO Düzenlenecek
                key: 'email',
            },
            { title: 'Actions', key: 'actions', sortable: false },
        ],
        items: [],
        loading: true,
        length: 0,
        snackbar: false,
        btnLoading: false,
    }),
    methods: {
        async loadItems() {

            try {
                this.loading = true;
                this.btnLoading = true;
                const response = await AxiosHelper.get(`/users`);
                const data = await response.data;
                this.items = data;
                this.loading = false;
                this.btnLoading = false;
            } catch (error) {
                this.snackbar = true;
            }
        },
        async save() {
            try {
                this.loading = true;
                this.btnLoading = true;
                const response = await AxiosHelper.get(`/users`);
                const data = await response.data;
                this.items = data;
                this.loading = false;
                this.btnLoading = false;
            } catch (error) {
                this.snackbar = true;
            }


        },
        async editUser(item) {
            this.user = item;
            this.dialog = true;
        },
        async deleteUser() {
            this.dialogDelete = true;
        },
    },
}
</script>