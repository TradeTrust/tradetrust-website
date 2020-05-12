
import React from 'react';
import { addDecorator } from '@storybook/react';
import './../src/styles/main.scss';

addDecorator(storyFn => <div className="p-3">{storyFn()}</div>);
