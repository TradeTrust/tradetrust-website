
import React from 'react';
import { addDecorator } from '@storybook/react';

addDecorator(storyFn => <div className="p-3">{storyFn()}</div>);
