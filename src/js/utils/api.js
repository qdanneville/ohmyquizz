import axios from "axios";
import config from "../../../config";
import { createClient } from "contentful-management"

const client = createClient({
  accessToken: config.CONTENTFUL_ACCESS_TOKEN
})

console.log(config);

const environment = client.getSpace(config.CONTENTFUL_SPACE_ID)
  .then((space) => space.getEnvironment('master'))
  .then((environment) => environment)
  .catch(console.error)

environment.then(environment => {
  environment.getEntry('30DlkSFvmLSuAMN0rn9hwT')
    .then(entry => {
      entry.fields.name['en-US'] = "SpongeBob"
      return entry.update();
    }).then(entry => {
      console.log(`Entry ${entry.sys.id} updated.`)
    })
})


export default environment;
