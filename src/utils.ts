import moment from "moment";
import { User } from "./apis/model";

export function sortStringsAlphabetically(a: User, b: User) {
  if (a.name < b.name) return -1;
  if (a.name < b.name) return 1;
  return 0;
}

export const shouldTxtBeBlack = (backgrounColor: string) => {
  var backgroundHex = backgrounColor.substring(1);      // strip #
  var rgb = parseInt(backgroundHex, 16);   // convert rrggbb to decimal
  var r = (rgb >> 16) & 0xff;  // extract red
  var g = (rgb >> 8) & 0xff;  // extract green
  var b = (rgb >> 0) & 0xff;  // extract blue
  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  //Background is 'too dark' so white text needed
  if (luma < 110) return false
  //Background is light so black text needed
  return true
}

export const displayLastSeen = (lastSeen: string) => {
  const lastSeenDaysDuration = Math.floor(moment.duration(moment(new Date()).diff(lastSeen)).asDays())
  const lastSeenMinDuration = moment.duration(moment(new Date()).diff(lastSeen)).asMinutes()
  const lastSeenTime = moment(lastSeen).format('LT')

  if (lastSeenMinDuration <= 120.5) return 'online'
  return `last seen ${(lastSeenDaysDuration === 0) ? 'today' : (lastSeenDaysDuration === 1) ? 'yesterday' : lastSeenDaysDuration + ' days ago'} at ${lastSeenTime}`
}