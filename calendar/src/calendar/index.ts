import { addHours, subHours } from "date-fns";
import { oauth2 } from "googleapis/build/src/apis/oauth2";

const fs = require("fs").promises;
const path = require("path");
const { google } = require("googleapis"); 

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function findFreeBusyByUsers(
  auth: any,
  emailUser: Array<string>,
  fromDate: Date | string,
  toDate: Date | string
) {
  const events = await findEventsUsers(auth, emailUser, fromDate, toDate);

  if (typeof events === 'boolean') {
    return events
  }

  events.forEach((event) => {
    
  });
}

export async function findEventsUsers(
  auth: any,
  emailUsers: Array<string>,
  fromDate: Date | string,
  toDate: Date | string
): Promise<any[] | boolean> {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin:fromDate,
    timeMax: toDate,
    maxResults: 150,
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = res.data.items;
  console.log(events.map((event) => event.attendees));

  if (!events || events.length === 0) {
    return false
  }
  console.log(events);
  
  const eventsUser = events.filter((event: any) => {
    return event.attendees.find((attende) =>
      emailUsers.includes(attende.email)
    );
  });
  return eventsUser;
}

// {'email': 'juliancamiloalvarez77@gmail.com'},
// {'email': 'julian.alvarez@sofka.com.co'},
// {'email': 'david.diazh@sofka.com.co'},
// {'email': 'aura.russill@sofka.com.co'},
// {'email': 'auracris1996@hotmail.com'}

const event = {
  summary: "Google I/O 2015",
  location: "CASA SOFKITA",
  description: "Szs esa es",
  start: {
    dateTime: "2022-12-12T09:00:00-07:00",
    timeZone: "America/Bogota",
  },
  end: {
    dateTime: "2022-12-12T11:00:00-07:00",
    timeZone: "America/Bogota",
  },
  attendees: [
    'juliancamiloalvarez77@gmail.com'
  ],
};

async function createEvent(auth, event) {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.insert(
    {
      auth,
      calendarId: "primary",
      resource: event,
    },
    (err, event) => {
      if (err) {
        console.log(
          "There was an error contacting the Calendar service: " + err
        );
        return;
      }
      console.log("Event created: %s", event.htmlLink);
    }
  );

  return auth;
}