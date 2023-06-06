// @flow strict

const fs = require("fs");
const convertor = require("xml-js");
import type { ReactElement } from "react";
import React from "react";

const DEFAULT_CONFIG = {
  lastmod: new Date().toISOString().slice(0, 10),
  changefreq: "monthly",
  priority: 0.8,
};

export type Config = {
  lastmod?: string;
  changefreq?: string;
  priority?: number;
};

type rElement = ReactElement<any, any> | undefined;

export class Generator {
  _baseUrl: string;
  _baseComponent: rElement[];
  _config: Config;
  _paths: Array<URL>;

  constructor(baseUrl: string, baseComponent: rElement[], config?: Config) {
    if (!React.isValidElement(baseComponent)) {
      throw "Invalid component. Try `Router()` instead of `Router`";
    }
    this._baseUrl = baseUrl;
    this._baseComponent = baseComponent;
    this._config = config ? config : {};
    this._paths = new Array();
  }

  generatePaths(): void {
    const paths = componentToPaths(this._baseComponent, this._baseUrl);
    this.addPaths(paths);
  }

  addPaths(paths: Array<URL>): void {
    this._paths = this._paths.concat(paths);
    this.dedupPaths();
  }

  removePaths(paths: Array<URL>): void {
    this._paths = this._paths.filter(path =>!paths.includes(path));
  }

  dedupPaths(): void {
    this._paths = [...new Set(this._paths)];
  }

  getXML(): string {
    return pathsToXml(this._baseUrl, this._paths, this._config);
  }

  save(path: string) {
    const paths = componentToPaths(this._baseComponent, this._baseUrl);
    const xml = pathsToXml(this._baseUrl, paths, this._config);
    fs.writeFileSync(path, xml);
  }
}

function componentToPaths(_baseComponent: rElement[], baseURL: string): Array<URL> {
  const paths: Array<URL> = [];
  const components: rElement[] = _baseComponent;
  while (components.length !== 0) {
    const component: rElement = components.pop();
    if (!React.isValidElement(component)) continue;
    const { props } = component;
    if (props == null) continue;
    const { path, component: propsComponents } = props as any;

    const componentType: any = component.type;
    const componentTypeName: string | undefined = componentType?.type?.name;
    if (componentTypeName === "Route") {
      if (path.endsWith(":slug")) {
        continue;
      }
      paths.push(new URL(path, baseURL));
      // paths.push(path)
    }

    if (typeof propsComponents === "function") {
      try {
        const inflatedProps = propsComponents();
        React.Children.forEach(inflatedProps?.props?.children, (child: any) => {
          components.push(child);
        });
      } catch (e) {
        console.error(e);
      }
    } else if (typeof propsComponents === "undefined") {
      continue;
    } else {
      console.error(propsComponents);
    }

    // React.Children.forEach(
    //   component?.props?.children,
    //   (child: rElement) => {
    //     components.push(child);
    //   }
    // );
    // if (component.type.name === 'Route') {
    //   if (path != null && typeof path === 'string') {
    //     paths.push(new URL(path, baseURL));
    //   }
    //   if (typeof propsComponents === 'function') {
    //     components.push(propsComponents({ match: { url: path } }));
    //   }
    // }
  }
  return paths;
}

function pathsToXml(baseUrl: string, paths: Array<URL>, config: Config): string {
  const { lastmod, changefreq, priority } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const options = { compact: true, spaces: 4 };
  const map = {
    _declaration: {
      _attributes: {
        version: "1.0",
        encoding: "UTF-8",
      },
    },
    urlset: {
      url: paths.map((path) => {
        return {
          loc: path.href,
          lastmod,
          changefreq,
          priority,
        };
      }),
      _attributes: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
    },
  };
  return convertor.js2xml(map, options);
}
