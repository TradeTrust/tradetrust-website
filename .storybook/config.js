import { configure } from "@storybook/react";
import './../src/styles/main.scss';

configure(require.context("../src", true, /\.stories\.(js|mdx)$/), module);
