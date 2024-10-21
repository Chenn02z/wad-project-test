import { google } from 'googleapis';
import { promises as fs } from 'fs';
import { resolve } from 'path';

// Define a TypeScript type for the calendar creation response
interface CalendarResponse {
  success: boolean;
  calendarId?: string | null;
  message?: string;
  error?: any;
}

// Define the handler function for creating a calendar
export default defineEventHandler(async (event): Promise<CalendarResponse> => {
  try {
    const credentialsPath = resolve('server/config/service_account_key.json');
    const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf-8'));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const calendarResource = {
      summary: 'Driving Lessons Schedule',
      timeZone: 'Asia/Singapore',
    };

    const response = await calendar.calendars.insert({
      requestBody: calendarResource,
    });

    return {
      success: true,
      calendarId: response.data.id,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error creating calendar',
      error,
    };
  }
});
