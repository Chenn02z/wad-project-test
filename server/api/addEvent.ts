import { google } from 'googleapis';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { CALENDAR_ID } from '../config/calendar';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { summary, description, startDateTime, endDateTime, instructorId, studentId } = body;

    // Validate the input properties
    if (!summary || !description) {
      throw new Error('Summary and description are required.');
    }

    if (!startDateTime || isNaN(new Date(startDateTime).getTime())) {
      throw new Error('Invalid or missing startDateTime.');
    }

    if (!endDateTime || isNaN(new Date(endDateTime).getTime())) {
      throw new Error('Invalid or missing endDateTime.');
    }

    if (!instructorId) {
      throw new Error('Instructor ID is required.');
    }

    if (!studentId) {
      throw new Error('Student ID is required.');
    }

    const credentialsPath = resolve('server/config/service_account_key.json');
    const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf-8'));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const eventDetails = {
      summary,
      description,
      start: {
        dateTime: new Date(startDateTime).toISOString(), 
        timeZone: 'Asia/Singapore',
      },
      end: {
        dateTime: new Date(endDateTime).toISOString(),
        timeZone: 'Asia/Singapore',
      },
      extendedProperties: {
        private: {
          instructor_id: instructorId,
          student_id: studentId,
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: eventDetails,
    });

    return {
      success: true,
      message: 'Event added successfully',
      event: {
        summary: response.data.summary,
        start: response.data.start,
        extendedProperties: response.data.extendedProperties,
      },
    };
  } catch (error) {
    let errorMessage = 'Error adding event';

    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    } else {
      errorMessage += ': An unknown error occurred.';
    }

    return {
      success: false,
      message: errorMessage,
      error,
    };
  }
});


