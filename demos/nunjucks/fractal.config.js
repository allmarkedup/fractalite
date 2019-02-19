const { resolve } = require('path');

module.exports = {
  title: 'Fractalite Demo',

  adapter: require('@frctl/fractalite-adapter-nunjucks')(),

  components: resolve(__dirname, './src/components'),
  pages: resolve(__dirname, './src/pages'),

  nav: {
    items({ components, pages, toTree }) {
      return [
        toTree(pages),
        {
          label: 'Components',
          children: toTree(components)
        },
        {
          label: 'Github repo &rarr;',
          url: 'http://github.com/frctl/fractalite'
        }
      ];
    }
  },

  plugins: [
    require('@frctl/fractalite-plugin-assets-bundler')({
      entryFile: resolve(__dirname, './src/assets/preview.js'),
      outFile: resolve(__dirname, './dist/assets/build.js')
    })
  ],

  init(app, adapter) {
    // Example compiler middleware to read notes from notes.md files
    app.compiler.use(async ({ components }) => {
      await Promise.all(
        components.map(async component => {
          const notesfile = component.files.find(file => file.basename.toLowerCase() === 'notes.md');
          if (notesfile) {
            component.notes = await notesfile.getContents();
          }
        })
      );
    });
  }
};
