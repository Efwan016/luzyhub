import './bootstrap';
import '../css/app.css';
import '../css/button.css'; 
import '../css/input.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.{js,jsx,ts,tsx}');
        const path = `./Pages/${name}`;
        for (const ext of ['.jsx', '.js', '.tsx', '.ts']) {
            if (pages[`${path}${ext}`]) {
                return resolvePageComponent(`${path}${ext}`, pages);
            }
        }
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
