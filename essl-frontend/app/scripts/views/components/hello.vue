<template>
  <div class="demo-container">
    <!-- App bar -->
    <ui-top-app-bar
      class="demo-app-bar"
      content-selector=".demo-app-content"
      nav-id="demo-menu"
    >
      Event Sharing Smart Library
      <template #toolbar="{ toolbarItemClass }">
        <ui-button style="color: white;font-weight: bold">LOGOUT</ui-button>
        <ui-icon-button
          :class="toolbarItemClass"
          icon="language"
        ></ui-icon-button>
        <ui-icon-button :class="toolbarItemClass" icon="print"></ui-icon-button>

      </template>
    </ui-top-app-bar>
    <!-- Drawer -->
    <ui-drawer type="dismissible" viewport-height nav-id="demo-menu">
      <ui-drawer-header>
        <ui-drawer-title>Title</ui-drawer-title>
        <ui-drawer-subtitle>Subtitle</ui-drawer-subtitle>
      </ui-drawer-header>
      <ui-drawer-content>
        <ui-nav>
          <ui-nav-item  href="javascript:void(0)" active>Item {{ 0 }}</ui-nav-item>
          <ui-nav-item v-for="i in 3" :key="i" href="javascript:void(0)">
            Item {{ i }}
          </ui-nav-item>
        </ui-nav>
      </ui-drawer-content>
    </ui-drawer>
    <!-- Content -->
    <ui-drawer-app-content class="demo-app-content">
      <!-- App content -->
<!--      <p v-for="i in 24" :key="i">Main Content {{ i }}</p>-->

      <div style="margin-top: 1%"></div>
      <ui-form class="conditions-form" nowrap action-align="center">
        <template #default="{ itemClass, actionClass }">
          <ui-grid>
            <ui-grid-cell>
              <ui-form-field :class="[itemClass, 'required']">
                <label>Label1</label>
                <ui-textfield></ui-textfield>
              </ui-form-field>
            </ui-grid-cell>
            <ui-grid-cell>
              <ui-form-field :class="itemClass">
                <label>Label2</label>
                <ui-textfield></ui-textfield>
              </ui-form-field>
            </ui-grid-cell>
            <ui-grid-cell>
              <ui-form-field :class="itemClass">
                <label>Label3</label>
                <ui-select></ui-select>
              </ui-form-field>
            </ui-grid-cell>
            <ui-grid-cell>
              <ui-form-field :class="itemClass">
                <label>Label4</label>
                <ui-textfield></ui-textfield>
              </ui-form-field>
            </ui-grid-cell>
            <ui-grid-cell>
              <ui-form-field :class="itemClass">
                <label>Label5</label>
                <ui-select></ui-select>
              </ui-form-field>
            </ui-grid-cell>
          </ui-grid>
          <ui-form-field :class="actionClass">
            <ui-button raised>Search</ui-button>
            <ui-button outlined>Reset</ui-button>
          </ui-form-field>
        </template>
      </ui-form>

      <div style="margin-top: 60px"></div>
      <ui-divider>TSMC</ui-divider>
      <div style="margin-top: 60px"></div>
      <ui-table
        v-model="selectedRows"
        fullwidth
        :data="data"
        :thead="thead"
        :tbody="tbody"
        :tfoot="tfoot"
        row-checkbox
        selected-key="id"
      >
        <template #th-dessert>
          Dessert
          <ui-icon v-tooltip="'100g serving'" aria-describedby="th-cell-1">
            error_outline
          </ui-icon>
        </template>
        <template #dessert="{ data }">
          <div class="dessert">{{ data.dessert }}</div>
        </template>
        <template #actions="{ data }">
          <ui-icon @click="show(data)">description</ui-icon>
          <ui-icon @click="show(data)">edit</ui-icon>
          <ui-icon @click="show(data)">delete</ui-icon>
        </template>

        <ui-pagination
          v-model="page"
          :total="total"
          show-total
          @update:model-value="onPage"
        ></ui-pagination>
      </ui-table>

    </ui-drawer-app-content>



  </div>

</template>

<script>
export default {
  data() {
    return {
      data: [],
      thead: [
        {
          value: 'ID',
          sort: 'asc',
          columnId: 'id'
        },
        {
          slot: 'th-dessert',
          class: 'good',
          sort: 'none',
          columnId: 'dessert'
        },
        'Calories',
        'Fat (g)',
        'Carbs (g)',
        'Protein (g)',
        'Actions',
      ],
      tbody: [
        'id',
        {
          slot: 'dessert'
        },
        {
          field: 'calories',
          numeric: true,
          class: 'test'
        },
        {
          field: 'fat',
          fn: data => {
            return data.fat.toFixed(1);
          }
        },
        'carbs',
        {
          field: 'protein',
          class: data => {
            return data.protein > 5 ? 'red' : 'green';
          }
        },
        {
          slot: 'actions'
        }
      ],
      tfoot: [
        {
          field: 'id',
          fnName: 'count'
        },
        null,
        {
          field: 'calories',
          fnName: 'sum',
          align: 'right',
          class: 'test'
        },
        {
          field: 'fat',
          fnName: 'avg'
        },
        {
          field: 'carbs',
          fnName: 'max'
        },
        {
          field: 'protein',
          fnName: 'min'
        }
      ],
      selectedRows: [1, 2, 4],
      page: 1,
      total: 12
    };
  },
  async created() {
    let {data} = await this.$http.get('/api/getData');
    this.data = data;
  },
  methods: {
    show(data) {
      console.log(data);
    },
    onPage(page) {
      // your code
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


/* Only apply this style if below top app bar */
.demo-app-bar {
  z-index: 7;
}

.demo-app-content {
  width: 100%;
  height: 100%;
  overflow: auto;
}


.conditions-form {
.mdc-form__item > label {
  flex-basis: 80px;
  margin-right: 10px;
  text-align: right;
}

.mdc-text-field,
.mdc-select {
  min-width: 200px;
}
}


</style>
