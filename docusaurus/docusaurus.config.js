// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Charts',
  tagline:
    'Create editable, interactive and animated Charts in Obsidian via Chart.js ',
  url: 'https://charts.phibr0.de',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'phibr0', // Usually your GitHub org/user name.
  projectName: 'obsidian-charts', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/phibr0/obsidian-charts/docusaurus',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Charts Docs',
          },
          {
            href: 'https://github.com/phibr0/obsidian-charts',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting started',
                to: '/index',
              },
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'GitHub',
                to: 'https://github.com/phibr0',
              },
              {
                label: 'Support me',
                to: 'https://buymeacoffe.com/phibr0',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Source',
                href: 'https://github.com/phibr0/obsidian-charts',
              },
              {
                label: 'Feature Request',
                href: 'https://github.com/phibr0/obsidian-dictionary/issues/new/choose',
              },
              {
                label: 'Bug Report',
                href: 'https://github.com/phibr0/obsidian-dictionary/issues/new/choose',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
