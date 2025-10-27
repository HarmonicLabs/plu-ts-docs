// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';
import { config as dotenvConfing } from "dotenv";

dotenvConfing();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pebble',
  tagline: 'A standalone language for building Cardano dApps',
  favicon: 'img/plu-ts.svg',

  // Set the production url of your site here
  url: 'https://www.harmoniclabs.tech/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Harmonic Laboratories', // Usually your GitHub org/user name.
  projectName: 'plu-ts', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/HarmonicLabs/plu-ts-docs',
        },
        blog: false,
        /*{
          showReadingTime: true,
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/HarmonicLabs/plu-ts-docs',
        },*/
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        }
      }),
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        magicComments: [
          // Remember to extend the default highlight class name as well!
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: {start: 'highlight-start', end: 'highlight-end'},
          },
          {
            className: 'code-block-error-line',
            line: 'highlight-error',
          },
          {
            className: 'code-solution',
            line: 'highlight-solution',
          },
          {
            className: 'code-bad-practice',
            line: 'highlight-bad-practice',
            block: {start: 'bad-practice-start', end: 'bad-practice-end'},
          },
          {
            className: 'code-bad-practice',
            line: 'highlight-bad',
            block: {start: 'bad-start', end: 'bad-end'},
          },
        ]
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      // Replace with your project's social card
      image: 'img/plu-ts.svg',
      navbar: {
        title: 'pebble',
        logo: {
          alt: 'My Site Logo',
          src: 'img/plu-ts.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'Introduction',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/HarmonicLabs/plu-ts',
            label: 'GitHub ⭐',
            position: 'right',
          },
          {
            href: 'https://github.com/sponsors/HarmonicLabs',
            label: 'Sponsor ❤️',
            position: 'right',
          },
          {
            type: 'docsVersionDropdown',
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
                label: 'Introduction',
                to: '/',
              },
              {
                label: 'Examples',
                to: '/category/examples',
              },
              {
                label: 'Onchain',
                to: '/category/offchain',
              },
              {
                label: 'Offchain',
                to: '/category/offchain',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              
              {
                label: 'Discord',
                href: 'https://discord.gg/CGKNcG7ade',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/plu_ts',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/HarmonicLabs/plu-ts',
              },
              {
                label: 'Harmonic Labs',
                href: 'https://harmoniclabs.tech',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Harmonic Laboratories LTD.`,
      },
      algolia: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        contextualSearch: false
      }
    })
};

module.exports = config;
