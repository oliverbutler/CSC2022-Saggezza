<template>
  <Page actionBarHidden="true">
    <GridLayout rows="*,auto">
      <!-- Component -->
      <component v-for="component in componentArray" v-show="component === currentComponent" :is="component" row="0"/>
      <!-- Bottom navigation -->
      <GridLayout class="nav" row="1" rows="auto" columns="*,*,*">
        <Button :class="navigationButtonClasses('Requests')" @tap="currentComponent = 'Requests'"  row="0" col="0" textWrap="true">
          <formattedString>
            <span class="nav-btn-icon" :text="'+' + '\n'" fontFamily="Ionicons" fontSize="40" />
            <span class="nav-btn-label" text="Requests" />
          </formattedString>
        </Button>
        <Button :class="navigationButtonClasses('Dashboard')" @tap="currentComponent = 'Dashboard'"  row="0" col="1" textWrap="true">
          <formattedString>
            <span class="nav-btn-icon" :text="'+' + '\n'" fontFamily="Ionicons" fontSize="40" />
            <span class="nav-btn-label" text="Dashboard" />
          </formattedString>
        </Button>
        <Button :class="navigationButtonClasses('Add')" @tap="currentComponent = 'Add'"  row="0" col="2" textWrap="true">
          <formattedString>
            <span class="nav-btn-icon" :text="'+' + '\n'" fontFamily="Ionicons" fontSize="40" />
            <span class="nav-btn-label" text="Add" />
          </formattedString>
        </Button>
      </GridLayout>   
    </GridLayout>
  </Page>
</template>

<script >
  import Requests from "../components/Requests";
  import Dashboard from "../components/Dashboard";
  import Add from "../components/Add";

  export default {
    data() {
      return {
        currentComponent: "Dashboard",
        componentArray: ["Requests", "Dashboard", "Add"]
      }
    },
    computed: {
      navigationButtonClasses() {
        return component => ({
          "nav-btn": true,
          selected: component === this.currentComponent
        });
      }
    },
    components: {
      Requests,
      Dashboard,
      Add    
    }
  }
</script>

<style lang="scss">
  .nav {
    background-color: #2F2F2F;
    border-top-width: 4;
    border-top-color: #707070;
  }
  .nav-btn {
    color: white;
    text-align: center;
  }

  .nav-btn-icon {
    margin: 0;
  }

  .nav-btn-label {
    font-size: 15;
    margin: 0;
    // text-align: center;
    // padding: 0;
  }

  .selected {
    border-color: #91D000;
    color: #91D000;
  }

  .title {
    font-size: 40;
  }

  .center {
    text-align: center;
  }

</style>
