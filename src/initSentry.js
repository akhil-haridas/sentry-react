import React from "react";
import * as Sentry from "@sentry/react";

export const initSentry = () => {
    Sentry.init({
        dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
        integrations: [
            new Sentry.BrowserTracing({
            // See docs for support of different versions of variation of react router
            // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
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

        // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

        // Capture Replay for 10% of all sessions,
        // plus for 100% of sessions with an error
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
    });
}
