import {
  child,
  get,
  onValue,
  ref,
  serverTimestamp,
  set,
  update,
} from "firebase/database";
import { auth, db } from "../firebase";
import { Series, SeriesFirebaseSend, SeriesUser } from "./database-interfaces";

////////////////////////////////////////////////////////
// Main Functions
////////////////////////////////////////////////////////

/**
 * Creates a Online Series on the Realtime Database
 *
 * @param teamName
 * @param isBo3
 * @returns
 */
export async function createOnlineSeries(
  teamName: string,
  isBo3: boolean
): Promise<string> {
  // Ensure Join Code does not already exist
  const dbRef = ref(db);
  let joinCode: string = generateJoinCode();
  let idNotUnique = true;

  while (idNotUnique) {
    const snapshot = await get(child(dbRef, `series/${joinCode}`));
    const exists: boolean = snapshot.exists();
    if (exists) {
      joinCode = generateJoinCode();
    } else {
      idNotUnique = false;
    }
  }

  const currentUser = auth.currentUser;
  if (currentUser == null) {
    return "";
  }

  // joinCode is Unique => Create Deck in "/series"
  const info: SeriesFirebaseSend = {
    t1: {
      name: teamName,
      id: currentUser.uid,
    },
    isBo3: isBo3,
  };
  const seriesRef = ref(db, "series/" + joinCode);
  await set(seriesRef, info);

  return joinCode;
}

export async function requestJoinSeries(
  joinCode: string,
  teamName: string
): Promise<boolean> {
  const dbRef = ref(db);
  return get(child(dbRef, `series/${joinCode}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const currentSeries: Series = snapshot.val() as Series;
        const currentUser = auth.currentUser;
        if (
          (currentSeries.t2 === null || currentSeries.t2) === undefined &&
          currentUser
        ) {
          if (!currentSeries.requests) {
            currentSeries.requests = [];
          }
          const seriesUser: SeriesUser = {
            id: currentUser.uid,
            name: teamName,
          };
          currentSeries.requests.push(seriesUser);
          addRequest(joinCode, currentSeries.requests);
        } else {
          return false;
        }
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

/**
 * Retrieves the Online Series information from the Database with a Listener
 *
 * @param joinCode
 * @param updater - function that is called when new data is retrieved
 * @param accessDenied - function that is called when there is no data at location or access is forbidden
 */
export function getOnlineSeriesListener(
  joinCode: string,
  updater: (a: Series) => void,
  accessDenied: () => void
) {
  const dbRef = ref(db, `series/${joinCode}`);
  onValue(dbRef, (snapshot) => {
    if (snapshot.val()) {
      const data: Series = snapshot.val() as Series;
      if (snapshot.key) {
        // This should always happen
        data.code = snapshot.key;
      }
      updater(data);
    } else {
      accessDenied();
    }
  });
}

////////////////////////////////////////////////////////
// Supporting Functions
////////////////////////////////////////////////////////

function generateJoinCode(): string {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  let generatedCode = "";
  for (let i = 0; i < 5; i++) {
    if (i < 2) {
      const randomIndex = Math.floor(Math.random() * 26);
      const randomLetter = letters[randomIndex];
      generatedCode += randomLetter;
    } else {
      const randomIndex = Math.floor(Math.random() * 10);
      const randomNumber = numbers[randomIndex];
      generatedCode += randomNumber;
    }
  }

  return generatedCode;
}

async function addRequest(
  joinCode: string,
  updatedRequests: SeriesUser[]
): Promise<boolean> {
  const dbRef = ref(db, `series/${joinCode}`);
  return update(dbRef, {
    requests: updatedRequests,
  })
    .then(() => {
      // Data saved successfully!
      return true;
    })
    .catch((error) => {
      // The write failed...
      return false;
    });
}
