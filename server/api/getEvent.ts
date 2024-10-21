import { google } from "googleapis";
import { promises as fs } from "fs";
import { resolve } from "path";
import { CALENDAR_ID } from "../config/calendar";
import type { calendar_v3 } from "googleapis";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { timeMin, timeMax, instructorId } = query;

    // Validate timeMin and timeMax
    const parsedTimeMin =
      typeof timeMin === "string" ? new Date(timeMin).toISOString() : undefined;
    const parsedTimeMax =
      typeof timeMax === "string" ? new Date(timeMax).toISOString() : undefined;

    // Service account credentials
    const credentialsPath = resolve("server/config/service_account_key.json");
    const credentials = JSON.parse(await fs.readFile(credentialsPath, "utf-8"));

    // Authenticate the service account
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    // Initialize the Calendar API client
    const calendar = google.calendar({ version: "v3", auth });

    const options: calendar_v3.Params$Resource$Events$List = {
      calendarId: CALENDAR_ID,
      timeMin: parsedTimeMin, // Filter events from timeMin (e.g., start of the day or week)
      timeMax: parsedTimeMax, // Optional: Filter until timeMax
      singleEvents: true,
      orderBy: "startTime",
    };

    // Fetch events from the calendar
    const response = await calendar.events.list(options);

    // Preset student ID (replace with session-based ID once auth is set up)
    const presetStudentId = ""; // When empty, include all students

    // Filter events by instructor or student ID
    const events = (response.data.items || []).filter(
      (event: calendar_v3.Schema$Event) => {
        const instructorMatch = instructorId
          ? event.extendedProperties?.private?.instructor_id === instructorId
          : true;

        const studentMatch = presetStudentId
          ? event.extendedProperties?.private?.student_id === presetStudentId
          : true; // If presetStudentId is empty, skip filtering by student

        return instructorMatch && studentMatch;
      }
    );

    return {
      success: true,
      data: events,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error retrieving events",
      error,
    };
  }
});