import axios from "axios";
import config from "../../../config";
import { createClient } from "contentful"

const client = createClient({
  space: config.CONTENTFUL_SPACE_ID,
  accessToken: config.CONTENTFUL_ACCESS_TOKEN
})

export default client;
