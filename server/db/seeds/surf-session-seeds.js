//* Surf Session Seeding File
//*

const mongoose = require('mongoose');
const SurfSessionMongo = require('../../models/SurfSession');


 const SurfSessionSeed = [

  { 
    userID: "649a53a1f1f181e308bdb1d2",
    sessionDate: "7-4-2023",
    sessionTime: "9:00am",
    sessionLocation: "36th Street",
    skyConditions: "Sunny",
    waveSize: "2-3",
    tideLevel: 3.4,
    tideDirection: "Falling",
    sessionLength: "1:30",
    surfboardShaper: "DHD",
    surfboardModel: "3DX",
    surfboardLengthFT: 6,
    surfboardLengthIN: 0,
    surfboardVolume: 32,
    surfboardFinConfig: "Quad",
    sessionNotes: " 2-3 ft waves, peaky and fun. Low crowds and mellow waves. Focused on finding my place on the wave face, productive session, got some good face riding in. Paddle strength has turned a corner. 6 surf sessions in the last 7 days!",
    sessionRating: 4
  },
  { 
    userID: "649a53a1f1f181e308bdb1d2",
    sessionDate: "6-25-2023",
    sessionTime: "10:00am",
    sessionLocation: "36th Street",
    skyConditions: "Cloudy",
    waveSize: "3-4",
    tideLevel: 2.3,
    tideDirection: "Rising",
    sessionLength: "1:10",
    surfboardShaper: "DHD Surfboards",
    surfboardModel: "3DX",
    surfboardLengthFT: 6,
    surfboardLengthIN: 4,
    surfboardVolume: 35.5,
    surfboardFinConfig: "Thruster",
    sessionNotes: "New swell starting to fill in, good combo's and very consistent waves. Low period but still fun. Dropping/Low tide did not help. Caught some fun waves but picked an empty but bad spot. Actually looked a lot better down at 36th. Water was a solid 59 degrees... WTF!?",
    sessionRating: 4
  },
  {  
    userID: "649a53a1f1f181e308bdb1d2",
    sessionDate: "6-8-2023",
    sessionTime: "7:30 AM",
    sessionLocation: "36th Street",
    skyConditions: "Partly Sunny",
    waveSize: "3-4",
    tideLevel: 1,
    tideDirection: "Rising",
    sessionLength: "0:45",
    surfboardShaper: "Album Surf",
    surfboardModel: "Prodigy",
    surfboardLengthFT: 6,
    surfboardLengthIN: 6,
    surfboardVolume: 30.6,
    surfboardFinConfig: "Quad",
    sessionNotes: "Dropping/Low tide did not help. Caught some fun waves but picked an empty but bad spot. Actually looked a lot better down at 36th. Water was a solid 59 degrees... WTF!?",
    sessionRating: 2
  },
  {  
    userID: "64a789bfb638979a6fee53d1",
    sessionDate: "6-6-2023",
    sessionTime: "8:15 AM",
    sessionLocation: "36th Street",
    skyConditions: "Partly Sunny",
    waveSize: "3-4",
    tideLevel: 1.3,
    tideDirection: "Rising",
    sessionLength: "1:20",
    surfboardShaper: "DHD Surfboards",
    surfboardModel: "Phoenix",
    surfboardLengthFT: 6,
    surfboardLengthIN: 5,
    surfboardVolume: 34.5,
    surfboardFinConfig: "Thruster",
    sessionNotes: "Great swell in the water, clean conditions but very crowded. Drained tide was tricky but jetty provided shape and prevented close out issues.",
    sessionRating: 4
  },
  {  
    userID: "64a789bfb638979a6fee53d1",
    sessionDate: "5-23-2023",
    sessionTime: "8:20 AM",
    sessionLocation: "45th Street",
    skyConditions: "Partly Sunny",
    waveSize: "3-4",
    tideLevel: 1.3,
    tideDirection: "Rising",
    sessionLength: "0:45",
    surfboardShaper: "Solid Surf",
    surfboardModel: "Steath Fish",
    surfboardLengthFT: 5,
    surfboardLengthIN: 10,
    surfboardVolume: 33.9,
    surfboardFinConfig: "Twin",
    sessionNotes: "Steep and quick take offs. Not too walled, plenty to work with. Rode the bike up there, misty morning kept the crowds down, only 3 people in the water Jetty to Jetty.",
    sessionRating: 4
  },
  {  
    userID: "64a789bfb638979a6fee53d1",
    sessionDate: "5-26-2023",
    sessionTime: "9:05 AM",
    sessionLocation: "36th Street",
    skyConditions: "Partly Sunny",
    waveSize: "2-3",
    tideLevel: 1.3,
    tideDirection: "Rising",
    sessionLength: "0:45",
    surfboardShaper: "Solid Surf",
    surfboardModel: "Steath Fish",
    surfboardLengthFT: 5,
    surfboardLengthIN: 10,
    surfboardVolume: 33.9,
    surfboardFinConfig: "Twin",
    sessionNotes: "Waves but very clean and peaky. Very light crowds and fun session. Tide was drained but sets had enought to get in on.",
    sessionRating: 4
  },


 ];

 const seedSurfSessionDB = async () => {

  await SurfSessionMongo.deleteMany({});
  await SurfSessionMongo.insertMany(SurfSessionSeed);
 };

 module.exports = seedSurfSessionDB;

 //!========================= EOF =========================