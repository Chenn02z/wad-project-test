import { google } from 'googleapis';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { CALENDAR_ID } from '../config/calendar';

interface ShareResponse {
  success: boolean;
  message?: string;
  error?: any;
  data?: any;
}

// API route handler
export default defineEventHandler(async (): Promise<ShareResponse> => {
  try {

    const credentialsPath = resolve('server/config/service_account_key.json');
    const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf-8'));


    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    // Initialize the Calendar API client
    const calendar = google.calendar({ version: 'v3', auth });

    const emailToShare = 'yuchen.yeo.2023@smu.edu.sg';

    // Share the calendar with the specified email
    const response = await calendar.acl.insert({
      calendarId: CALENDAR_ID, 
      requestBody: {
        role: 'owner',
        scope: {
          type: 'user',
          value: emailToShare,
        },
      },
    });

    return {
      success: true,
      message: `Calendar shared successfully with ${emailToShare}`,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error sharing calendar',
      error,
    };
  }
});

