import { createRoot } from 'react-dom/client';
import * as _ from 'lodash';


import { App } from './App';

const rootElement = document.getElementById('app') as HTMLElement;
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(<App />);
