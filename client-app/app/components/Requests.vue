<template>
  <GridLayout rows="auto, auto,*">
    <Label row="0" text="Requests" class="title center"/>
    <Label row="1" text="My requests" class="center"/>
    <ListView row="3" for="r in requests">
      <v-template>
        <GridLayout class="request" rows="auto,auto" columns="*,*">
          <Label row="0" col="0" :text="r.name"/>
          <Label row="1" col="0" :text="r.date"/>
          <Label row="0" rowSpan=2 col="1" :text="capitalize(r.status)" :class="requestStatusClass(r.status)"/>
        </GridLayout>
      </v-template>
    </ListView>
  </GridLayout>
</template>

<script>
export default {
  data() {
    return {
      requests: [
        {
          'name': 'Trip to Sunderland',
          'date': '12/11/2019',
          'status': 'pending'
        },
        {
          'name': 'Trip to London',
          'date': '09/11/2019',
          'status': 'approved'
        },
        {
          'name': 'Trip to Manchester',
          'date': '09/11/2019',
          'status': 'denied'
        }
      ]
    }
  },
  computed: {
    requestStatusClass() {
      return status => ({
          "request-status": true,
          approved: status == 'approved',
          pending: status == 'pending',
          denied: status == 'denied'
        });
    }
  },
  methods: {
    capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  }
}
</script>

<style lang="scss">
.request {
  padding: 10;
}

.request-status {
  text-align: right;
}

.pending {
  color: black;
}

.approved {
  color: green;
}

.denied {
  color: red;
}
</style>