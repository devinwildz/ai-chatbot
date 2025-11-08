import axios from "axios";
import * as cheerio from "cheerio";

export const fetchWebsiteContent = async (siteURL) => {
  try {
    const { data } = await axios.get(siteURL, { timeout: 5000 });
    const $ = cheerio.load(data);

    // Extract only useful text
    const text = $('body').text().replace(/\s+/g, ' ').trim();

    return text.slice(0, 5000); // limit to avoid token abuse
  } catch (err) {
    console.log("Site fetch fail:", err.message);
    return "";
  }
};
