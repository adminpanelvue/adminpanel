<template>
  <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
    :items-length="totalItems" :items="items" :loading="loading" class="elevation-1" item-value="name"
    @update:options="loadItems">
    <template v-slot:tfoot>
      <tr>
        <td>
          <v-text-field v-model="id" hide-details placeholder="ID ile arat" class="ma-2" density="compact"></v-text-field>
        </td>
      </tr>
    </template>
    <template v-slot:item.actions="{ item }">
        <v-icon
          size="small"
          class="me-2"
          
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
         
        >
          mdi-delete
        </v-icon>
      </template>
  </v-data-table-server>
</template>

<script>
import AxiosHelper from "../helper/axiosHelper";
export default {
  data: () => ({
    itemsPerPage: 10,
    headers: [
      { title: 'ID', key: 'id' },
      {
        title: 'İsim',
        align: 'start',
        sortable: false,
        key: 'name',
      },
      { title: 'Mail Adresi', key: 'email' },
      { title: 'İçerik', key: 'body' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    items: [],
    totalItems:0,
    loading: true,
    id: '',
    search: '',
  }),
  watch: {
    id() {
      this.search = String(Date.now())
    }
  },
  methods: {
    async loadItems() {
      this.loading = true
      const response = await AxiosHelper.get(`/users/${this.id}`);
      const data = await response.data;
      
      if (Array.isArray(data)) {
        this.items = data;
      }else {
        this.items = [data];
      }
    
      this.loading = false;


    },
  },
}
</script>