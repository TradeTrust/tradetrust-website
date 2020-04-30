
import React from 'react';
import { addDecorator } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { contexts } from './../src/config/contexts';
import './../src/styles/main.scss';

addDecorator(withContexts(contexts));
addDecorator(storyFn => <div className="p-3">{storyFn()}</div>);