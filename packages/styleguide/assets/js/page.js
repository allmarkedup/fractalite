import axios from 'axios';

export default {
  template: '#page',
  data() {
    return {
      page: null,
      content: null,
      loaded: false
    };
  },
  props: ['path'],
  sockets: {
    async updated() {
      await this.load();
    }
  },
  methods: {
    async load() {
      if (this.path) {
        try {
          const response = await axios.get(`/api/pages/${this.path}.json`);
          this.page = response.data.page;
          this.content = response.data.content;
          this.loaded = true;
        } catch (err) {
          this.$parent.$emit('error', err);
        }
      }
    }
  },
  async mounted() {
    await this.load();
  },
  watch: {
    async path() {
      await this.load();
    }
  }
};
