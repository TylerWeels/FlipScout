exports.handler = async function (event) {
  const query = event.queryStringParameters?.q;
  if (!query) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing query" }) };
  }

  const url = `https://serpapi.com/search.json?engine=ebay&_nkw=${encodeURIComponent(query)}&show_only=Sold&_sop=1&_ipg=50&api_key=aecc92485a77c850c4fb73efaeda4f03306d32cd9df0b54823b764dc65868baa`;

  try {
    const res = await fetch(url);
    const body = await res.text();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body,
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};
