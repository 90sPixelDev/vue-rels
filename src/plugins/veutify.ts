import { createVuetify } from 'vuetify'

export default createVuetify({
  ssr: true,
  defaults: {
    VBtn: {
      elevation: 2,
      prependIcon: '$vuetify',
    },
  },
})
