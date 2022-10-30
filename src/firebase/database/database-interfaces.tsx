/**
 * Data Structure of a Series in the Database
 */
export interface Series {
  code: string; // Join Code
  t1: SeriesUser; // Team 1 Name
  t2: SeriesUser; // Team 2 Name
  isBo3: boolean; // Bo3 or Bo1
  order: number[]; // The order of maps chosen (Num 1-7 representing maps, eg. 1=1st map alphabetically)
  sides: boolean[]; // Whether team 1 is on Attacker side = true. Size of array depends on bo1 or bo3
  requests: SeriesUser[];
}

/**
 * Use this interface only to send Series data to firebase.
 * This should be the same as Series, except it does not include:
 *  - code
 *  - t2
 *  - sides
 *  - order
 *  - requests
 */
export interface SeriesFirebaseSend {
  isBo3: boolean;
  t1: SeriesUser;
}

export interface SeriesUser {
  name: string;
  id: string;
}
