export default {

  async fetch(request) {

    const cors = {

      "Access-Control-Allow-Origin": "https://mzwalker24-max.github.io",

      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",

      "Access-Control-Allow-Headers": "Content-Type",

    };

    if (request.method === "OPTIONS") {

      return new Response(null, { headers: cors });

    }

    try {

      const url = new URL(request.url);

      if (url.pathname === "/login") {

        const username = url.searchParams.get("username");

        const password = url.searchParams.get("password");

        if (!username || !password) {

          return Response.json(

            { error: "Username and password required" },

            { status: 400, headers: cors }

          );

        }

        const api =

          "http://hostengine.live:25461/player_api.php?username=" +

          encodeURIComponent(username) +

          "&password=" +

          encodeURIComponent(password);

        const response = await fetch(api, {
  method: "GET",
  headers: {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json,text/plain,*/*"
  }
});

        const data = await response.text();

        return new Response(data, {

          status: response.status,

          headers: {

            ...cors,

            "Content-Type": "application/json"

          }

        });

      }
if (url.pathname === "/channels") {
  const username = url.searchParams.get("username");
  const password = url.searchParams.get("password");

  if (!username || !password) {
    return Response.json(
      { error: "Username and password required" },
      { status: 400, headers: cors }
    );
  }

  const api =
    "http://hostengine.live:25461/player_api.php?username=" +
    encodeURIComponent(username) +
    "&password=" +
    encodeURIComponent(password) +
    "&action=get_live_streams";

  const response = await fetch(api);
  const data = await response.text();

  return new Response(data, {
    status: response.status,
    headers: {
      ...cors,
      "Content-Type": "application/json"
    }
  });
}
      return Response.json(

        { status: "Evision TV API online" },

        { headers: cors }

      );

    } catch (error) {

      return Response.json(

        { error: "Connection failed" },

        { status: 500, headers: cors }

      );

    }

  }

};
// Trigger Cloudflare deployment
