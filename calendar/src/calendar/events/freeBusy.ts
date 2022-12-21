import {
  differenceInMilliseconds,
  isDate,
  setHours,
  setMinutes,
} from "date-fns";
import { freeSpace } from "../models/calendar.models";
import { findEventsUsers } from "./find";
const { google } = require("googleapis");

export async function findFreeBusyByUsersOnMainCalendar(
  auth: any,
  emailUser: Array<string>,
  fromDate: Date | string,
  toDate: Date | string,
  range: string
) {
  const events = await findEventsUsers(auth, emailUser, fromDate, toDate);

  if (typeof events === "boolean") {
    return events;
  }

  const { startAvaiableRange, closeAvaiableRange } = getRanges(range);

  
  events.reduce((preEvent, currEvent, index, acc:freeSpace[])=> {
    let diff = 0;
    const start = currEvent.start.dateTime;
    const end = currEvent.end.dateTime;
    if (events.length === 0) {
      diff = differenceInMilliseconds(
        rangeAsSpecificDate(startAvaiableRange, start),
        start
      );
      return diff > 600000
        ? [...acc, { start: rangeAsSpecificDate(startAvaiableRange, start), end: start }]
        : false;
    }

    if (index === events.length) {
      diff = differenceInMilliseconds(
        end,
        rangeAsSpecificDate(closeAvaiableRange, end)
      );
      return diff > 600000
        ? [...acc, { start: rangeAsSpecificDate(startAvaiableRange, start), end: start }]
        : false;
    }

    const startPreEvent = preEvent.start.dateTime;
    const endPreEvent = preEvent.end.dateTime;

    diff = differenceInMilliseconds(endPreEvent, start)

    return diff > 600000
        ? [...acc, { start: endPreEvent, end: start }]
        : false;
  }, [])
}

async function validateFreeSpace(
  event,
  preEvent,
  events: freeSpace[],
  startAvaiableRange: string,
  closeAvaiableRange: string
) {
  let diff = 0;
  const start = event.start.dateTime;
  const end = event.end.dateTime;
  if (events.length === 0) {
    diff = differenceInMilliseconds(
      rangeAsSpecificDate(startAvaiableRange, start),
      start
    );
    return diff > 600000
      ? { start: rangeAsSpecificDate(startAvaiableRange, start), end: start }
      : false;
  }

  const startPreEvent = preEvent.start.dateTime;
  const endPreEvent = preEvent.end.dateTime;
}

function getRanges(range: string) {
  const [avaiableAt, closedAt] = range.split("-");
  const startAvaiableRange = {
    hours: avaiableAt.split(":")[0],
    minutes: avaiableAt.split(":")[1],
  };

  const closeAvaiableRange = {
    hours: closedAt.split(":")[0],
    minutes: closedAt.split(":")[1],
  };

  return {
    startAvaiableRange,
    closeAvaiableRange,
  };
}

function rangeAsSpecificDate(range, date: Date | string) {
  date = new Date(date);
  const rangeDateWithHours = setHours(new Date(date), range.hours);
  const rangeDateWithMinutes = setMinutes(rangeDateWithHours, range.minutes);

  return rangeDateWithMinutes;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
export async function findFreeBusyByUsers(
  auth: any,
  emailUser: Array<string>,
  fromDate: Date | string,
  toDate: Date | string
) {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.freebusy.query({
    timeMin: fromDate,
    timeMax: toDate,
    items: [{ id: emailUser }],
  });

  if (!res) {
    console.log("Not free space");
  }
  console.log(res.result);
}
