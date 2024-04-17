import React from "react";
import * as Sentry from "@sentry/react";

export const initSentry = () => {
    Sentry.init({
        // dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
        integrations: [
            new Sentry.BrowserTracing({
            routingInstrumentation: Sentry.reactRouterV6Instrumentation(
                React.useEffect,
            ),
            }),
            // Sentry.replayIntegration(),
            new Sentry.Integrations.Breadcrumbs({
                console: false,
            }),
        ],
        maxBreadcrumbs: 50,
        debug: true,
        environment: "production",
        initialScope: {
            tags: { "my-tag": "my value" },
            user: { id: 42, email: "john.doe@example.com" },
        },
        tracesSampleRate: 1.0,
        tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
    });
}
