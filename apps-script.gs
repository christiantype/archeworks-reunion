/**
 * Archeworks Reunion — signup endpoint.
 *
 * Receives POSTs from the splash page form and appends each
 * submission as a row in this spreadsheet.
 *
 * SETUP (one time):
 *  1. Create a Google Sheet. In row 1 add headers: Timestamp | Name | Email
 *  2. Extensions → Apps Script. Delete any boilerplate, paste this whole file.
 *  3. Click Deploy → New deployment.
 *       - Type: Web app
 *       - Execute as: Me
 *       - Who has access: Anyone
 *  4. Authorize when prompted (it'll warn it's "unverified" — that's expected
 *     for your own script; click Advanced → Go to project → Allow).
 *  5. Copy the Web app URL (ends in /exec).
 *  6. Paste that URL into archeworks.html, into the ENDPOINT variable.
 *
 * To change the Sheet/tab, set SHEET_NAME below to your tab's name.
 */

var SHEET_NAME = ''; // '' = use the first/active sheet; otherwise set a tab name

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];

    var params = (e && e.parameter) ? e.parameter : {};
    sheet.appendRow([
      new Date(),
      params.name  || '',
      params.email || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you open the /exec URL in a browser to confirm the deploy is live.
function doGet() {
  return ContentService
    .createTextOutput('Archeworks signup endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
