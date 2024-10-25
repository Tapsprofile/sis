# Dynamic UI Plugin and As this is Selef explanatory

A dynamic parsing plugin for TypeScript applications, supporting flexible and extensible UI elements. This plugin allows for easy parsing of JSON-based configurations into strongly typed objects, with the ability to add custom parsers for new components without modifying the core codebase.

## Features

- **Dynamic UI Parsing**: Converts JSON data into structured UI components such as pages, layouts, rows, columns, and components.
- **Extensibility**: Easily extend the plugin by adding custom parsers (e.g., Grid) for new components.
- **Flexible API**: Supports registering new parsers at runtime, following the Open/Closed Principle.
- **TypeScript Support**: Fully typed with TypeScript, providing clear, type-safe interactions for developers.

## Installation

You can install the plugin via npm:

```bash
npm install my-ts-plugin

Below us the Usages.
At the time of writing the JSON thoughts to be represented as available in the Test sample.

import { PageParser, parserRegistry } from 'my-ts-plugin';

// Sample JSON configuration
const pageJson = {
  type: 'page',
  title: 'Dashboard',
  path: '/dashboard',
  layouts: [
    {
      type: 'layout',
      name: 'main-layout',
      rows: [
        {
          type: 'row',
          columns: [
            {
              type: 'column',
              width: 6,
              components: [
                {
                  type: 'infoBox',
                  title: 'Sales',
                  value: '$10,000'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// Resolve and use the 'page' parser
const pageParser = parserRegistry.resolve('page');
const parsedPage = pageParser.parse(pageJson);

console.log(parsedPage); // Logs the parsed PageElement object

---------------------------------------------------------------------
Now suppose you would like to extend with else like Grid.
Please go ahead and extend this code as if ..

import { GridParser, parserRegistry } from './custom-plugins/GridParser'; // Custom parser

// Register the custom parser
parserRegistry.register('grid', new GridParser());

// Now you can parse 'grid' elements in the JSON
const gridJson = {
  type: 'grid',
  name: 'data-grid',
  rows: [
    {
      type: 'row',
      columns: [
        {
          type: 'column',
          width: 12,
          components: [
            {
              type: 'chart',
              title: 'Monthly Revenue',
              data: [1000, 2000, 3000, 4000]
            }
          ]
        }
      ]
    }
  ]
};

const gridParser = parserRegistry.resolve('grid');
const parsedGrid = gridParser.parse(gridJson);

console.log(parsedGrid); // Logs the parsed GridElement object

Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/new-feature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/new-feature).
Create a pull request.

Building the Plugin
To compile the TypeScript files into JavaScript, run:
Generating Documentation
To generate the API documentation using Typedoc, run: