<template>
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
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="ID*" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Name*" hint="example of persistent helper text"
                                        persistent-hint required></v-text-field>
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
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
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
    }),
    methods: {
        async loadItems() {
            this.loading = true
            const response = await AxiosHelper.get(`/users`);
            const data = await response.data;
            this.items = data;
            this.loading = false;
        },
    },
}
</script>