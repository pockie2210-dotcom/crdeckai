import 'dotenv/config';
import fetch from "node-fetch";

const API_TOKEN = process.env.CLASH_API_TOKEN;
const tag = encodeURIComponent('#UQGVYGV99');

async function test() {
    console.log("Testing with token length:", API_TOKEN?.length);
    const res = await fetch(`https://api.clashroyale.com/v1/players/${tag}`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` }
    });
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text);
}
test();
