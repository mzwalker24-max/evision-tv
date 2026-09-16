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

      if (url.pathname === "/stream") {
  const username = url.searchParams.get("username");
  const password = url.searchParams.get("password");
  const streamId = url.searchParams.get("stream_id");

  if (!username || !password || !streamId) {
    return new Response("Missing stream information", {
      status: 400,
      headers: cors
    });
  }

  const streamUrl =
    "http://hostengine.live:25461/live/" +
    encodeURIComponent(username) + "/" +
    encodeURIComponent(password) + "/" +
    encodeURIComponent(streamId) + ".m3u8";
  
const requestHeaders = new Headers();

const range = request.headers.get("Range");

if (range) {

  requestHeaders.set("Range", range);

}

const response = await fetch(streamUrl, {

  headers: requestHeaders

});

const headers = new Headers(response.headers);

headers.set("Access-Control-Allow-Origin", "*");

headers.set("Accept-Ranges", "bytes");
return new Response(response.body, {

  status: response.status,

  headers: headers

});
} } catch (error) {   

      return Response.json(

        { error: "Connection failed" },

        { status: 500, headers: cors }

      );

    }

  }

};
// Trigger Cloudflare deployment
