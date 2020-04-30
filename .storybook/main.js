module.exports = {
  stories: [
    '../src/**/*.stories.(mdx)',
  ],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    '@storybook/addon-contexts'
  ],
};
