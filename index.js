import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { credentials } from "./credentials.js";

initializeApp({
  credential: cert(credentials),
});

const db = getFirestore();

// const car = {
//   make: "Ferrari",
//   model: "GTO",
//   year: "2008",
//   color: "red",
// };

// to add to an object that already exists in a collection

// db.collection("cars")
//   .add(car)
//   .then((doc) => {
//     console.log("Doc added:", doc.id);
//   })
//   .catch((err) => console.error(err));

// to edit a doc

// db.collection("cars").doc("lambo").set({
//   make: "Lamborghini",
//   model: "Diablo",
//   year: "2008",
//   color: "yellow",
// });

// to update

// db.collection("cars").doc("lambo").update({
//   model: "Diablo",
//   color: "hot pink",
// });

//

db.collection("cars")
  .doc("lambo")
  .get()
  .then((doc) => {
    console.log(doc.id);
    console.log(doc.data());
  })
  .catch(console.error);

// Get a whole collection:

db.collection("cars")
  .get()
  .then((collection) => {
    collection.docs.forEach((doc) => console.log(doc.data()));
  })
  .catch(console.error);

// Query docs from collection:
db.collection("cars")
  .where("year", "==", "2008")
  .get()
  .then((collection) => {
    const cars = collection.docs.map((doc) => {
      let car = doc.data(); // { make, model, color, year }
      car.id = doc.id; // { make, model, color, year, id }
      return car;
    });
    console.log(cars);
  })
  .catch(console.error);
