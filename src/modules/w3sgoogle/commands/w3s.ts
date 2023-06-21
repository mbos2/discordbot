import { CommandConfig } from '@roboplay/robo.js';
import google from 'googlethis';
import {generateSearchEmbedMessage} from '../utilities/message-template.js';

export const config: CommandConfig = {
  description: 'Searches a w3schools website reference',
  options: [
    {
      name: 'request',
      required: true,
      description: 'Search for W3Schools Reference.'
    }
  ]
}

export default async (event) => {
  const options = {
    page: 0, 
    safe: false, // Safe Search
    parse_ads: false, // If set to true sponsored results will be parsed
    additional_params: { 
      // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
      hl: 'en',
      num: 5
    }
  }
    
  let response = await google.search(`${event.options._hoistedOptions[0].value} site:w3schools.com`, options);
  if (!response || response.results.length < 1) {
    response = await google.search(`${event.options._hoistedOptions[0].value} site:developer.mozilla.org`, options);
  }

  const messageTemplate = generateSearchEmbedMessage(response, event.options._hoistedOptions[0].value);

  try {
    await event.reply({embeds: [messageTemplate]});
  } catch (error) {
    console.log(error.code)
    // if (error.code === 'InteractionAlreadyReplied') {
      await event.editReply({embeds: [messageTemplate]});
    // }
  }

}