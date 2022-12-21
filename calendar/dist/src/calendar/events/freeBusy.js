"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFreeBusyByUsers = exports.findFreeBusyByUsersOnMainCalendar = void 0;
const date_fns_1 = require("date-fns");
const find_1 = require("./find");
const { google } = require("googleapis");
function findFreeBusyByUsersOnMainCalendar(auth, emailUser, fromDate, toDate, range) {
    return __awaiter(this, void 0, void 0, function* () {
        const events = yield (0, find_1.findEventsUsers)(auth, emailUser, fromDate, toDate);
        if (typeof events === "boolean") {
            return events;
        }
        const { startAvaiableRange, closeAvaiableRange } = getRanges(range);
        events.reduce((preEvent, currEvent, index, acc) => {
            let diff = 0;
            const start = currEvent.start.dateTime;
            const end = currEvent.end.dateTime;
            if (events.length === 0) {
                diff = (0, date_fns_1.differenceInMilliseconds)(rangeAsSpecificDate(startAvaiableRange, start), start);
                return diff > 600000
                    ? [...acc, { start: rangeAsSpecificDate(startAvaiableRange, start), end: start }]
                    : false;
            }
            if (index === events.length) {
                diff = (0, date_fns_1.differenceInMilliseconds)(end, rangeAsSpecificDate(closeAvaiableRange, end));
                return diff > 600000
                    ? [...acc, { start: rangeAsSpecificDate(startAvaiableRange, start), end: start }]
                    : false;
            }
            const startPreEvent = preEvent.start.dateTime;
            const endPreEvent = preEvent.end.dateTime;
            diff = (0, date_fns_1.differenceInMilliseconds)(endPreEvent, start);
            return diff > 600000
                ? [...acc, { start: endPreEvent, end: start }]
                : false;
        }, []);
    });
}
exports.findFreeBusyByUsersOnMainCalendar = findFreeBusyByUsersOnMainCalendar;
function validateFreeSpace(event, preEvent, events, startAvaiableRange, closeAvaiableRange) {
    return __awaiter(this, void 0, void 0, function* () {
        let diff = 0;
        const start = event.start.dateTime;
        const end = event.end.dateTime;
        if (events.length === 0) {
            diff = (0, date_fns_1.differenceInMilliseconds)(rangeAsSpecificDate(startAvaiableRange, start), start);
            return diff > 600000
                ? { start: rangeAsSpecificDate(startAvaiableRange, start), end: start }
                : false;
        }
        const startPreEvent = preEvent.start.dateTime;
        const endPreEvent = preEvent.end.dateTime;
    });
}
function getRanges(range) {
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
function rangeAsSpecificDate(range, date) {
    date = new Date(date);
    const rangeDateWithHours = (0, date_fns_1.setHours)(new Date(date), range.hours);
    const rangeDateWithMinutes = (0, date_fns_1.setMinutes)(rangeDateWithHours, range.minutes);
    return rangeDateWithMinutes;
}
/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function findFreeBusyByUsers(auth, emailUser, fromDate, toDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const calendar = google.calendar({ version: "v3", auth });
        const res = yield calendar.freebusy.query({
            timeMin: fromDate,
            timeMax: toDate,
            items: [{ id: emailUser }],
        });
        if (!res) {
            console.log("Not free space");
        }
        console.log(res.result);
    });
}
exports.findFreeBusyByUsers = findFreeBusyByUsers;
