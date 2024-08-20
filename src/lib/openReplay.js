import OpenReplay from '@openreplay/tracker';

const tracker = new OpenReplay({
    projectKey: process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY,
    __DISABLE_SECURE_MODE: true,
});

export default tracker;