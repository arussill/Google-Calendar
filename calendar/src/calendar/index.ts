
// {'email': 'juliancamiloalvarez77@gmail.com'},
// {'email': 'julian.alvarez@sofka.com.co'},
// {'email': 'david.diazh@sofka.com.co'},
// {'email': 'aura.russill@sofka.com.co'},
// {'email': 'auracris1996@hotmail.com'}

import { addHours } from "date-fns";
import { botsUserAuth } from "../auth/auth-user";
import { findEventsUsers } from "./events/find";

// const event = {
//   summary: "Google I/O 2015",
//   location: "CASA SOFKITA",
//   description: "Szs esa es",
//   start: {
//     dateTime: "2022-12-12T09:00:00-07:00",
//     timeZone: "America/Bogota",
//   },
//   end: {
//     dateTime: "2022-12-12T11:00:00-07:00",
//     timeZone: "America/Bogota",
//   },
//   attendees: ["juliancamiloalvarez77@gmail.com"],
// };

const auth = botsUserAuth()
const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  /** Pass in the scopes array defined above.
    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  //scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true
});
console.log(
  findEventsUsers(auth, ["juliancamiloalvarez77@gmail.com", 'julian.alvarez@sofka.com.co'], new Date(), addHours(new Date(), 20))
)