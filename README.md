# Autopilot Node Client

## Introduction

Welcome to the Autopilot Node.JS client library. The goal of this library is to make it really easy for you to connect to Autopilot to add contacts, record activities and other features as the product grows. While you can connect to the API over plain old HTTPS, this library helps you out by providing the types you need, and wrapping those calls with sensible timeouts, error handling and other nice-to-haves.

## Creating an API key (UI)

This must be done in Autopilot itself.

1) If you don't already have an account head to https://app.ap3prod.com/-/signup to create one.
2) If you have an account and you're logged in, head to https://app.ap3prod.com/<youridentifier>/data-sources/new/custom-api and create a new API key.

### Public vs. Private API keys

When you generate an API key you will be given two, a PUB- key and a PRV- key. PUB- keys are used when you are connecting from a web browser, and PRV- are for the backend. Since Golang runs on the server, we will only use the PRV- key with this library.

## Initialising the Autopilot Node client

const conf = {
    autopilotAPIKey: "PRV-53FD4Hiw8iJ6VZYYH9ndITmtOfYI1MLqMYKSrzka0775",
    autopilotInstanceID: "autopilot4"
};
const autopilot = require('autopilot-node-client')(conf);


## Add/change/delete custom activities

`
	const attributes = {
		"str:cm:number-of-contacts": "u100000",
		"bol:cm:mobile-signup":      false,
		"bol:cm:trusted-signup":     true,
		"str:cm:country":            "Australia",
	};

    let contactID, err;
    [contactID, err] = autopilotClient.addActivity("signup-completed", "chris@autopilothq.com", attributes)
    if (err != null) {
        console.log(err);
        process.exit(1);
    }
`
