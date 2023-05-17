<template>
  <v-date-picker
    mode='single'
    dates="new Date()"
    tint-color='#f142f4'
    v-model='selectedDate'
    :theme-styles='themeStyles'
    :attributes='attributes'
    is-inline>
  </v-date-picker>
</template>

<script>
export default {
  data () {
    return {
      attributes: [{
          highlight: {
            backgroundColor: 'rgb(64, 169, 230)',    
            borderColor: 'rgb(14, 96, 143)',
            borderWidth: '2px',
            borderStyle: 'solid',
          },
          contentStyle: {
            color: 'white',            
          },
          dates: [new Date()]
      }],
      selectedDate: null,
      themeStyles: {
        wrapper: {
          border: '1',
        },
        header: {
          color: '#fafafa',
          backgroundColor: '#17a2b8',
          borderColor: '#404c59',
          borderWidth: '1px 1px 0 1px',
        },
        headerVerticalDivider: {
          borderLeft: '1px solid #404c59',
        },
        weekdays: {
          color: '#ffffff',
          backgroundColor: 'rgba(53, 192, 185, 0.836)',
          borderColor: '#ff0098',
          borderWidth: '0 1px',
          padding: '5px 0 10px 0',
        },
        weekdaysVerticalDivider: {
          borderLeft: '1px solid #40459',
        },
        weeks: {
          border: '1px solid #dadada',
        },
      },
    }
  }
}

</script>

