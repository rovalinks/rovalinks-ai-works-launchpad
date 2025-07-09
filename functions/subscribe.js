const fetch = require("node-fetch");

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let email;
  try {
    ({ email } = JSON.parse(event.body));
    if (!email || !email.includes("@")) {
      return { statusCode: 400, body: "Invalid email" };
    }
  } catch {
    return { statusCode: 400, body: "Bad payload" };
  }

  // Dispatch to GitHub
  const resp = await fetch("https://api.github.com/repos/rovalinks/rovalinks-ai-works-launchpad/dispatches", {
    method: "POST",
    headers: {
      "Accept": "application/vnd.github.everest-preview+json",
      "Authorization": `Bearer ${process.env.GH_PAT}`,
      "Content-Type": "application/json",
      "User-Agent": "rovalinks-netlify-dispatch",
    },
    body: JSON.stringify({
      event_type: "new_subscriber",
      client_payload: { email },
      ref: "testing"
    }),
  });

  if (resp.status !== 204) {
    const err = await resp.text();
    return { statusCode: resp.status, body: `GitHub dispatch failed: ${err}` };
  }

  return { statusCode: 200, body: "✅ Dispatch successful" };
};
