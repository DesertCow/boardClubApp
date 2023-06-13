

import Header from '../components/Header';
import NavFooter from '../components/NavFooter';



function AboutClub() {

  return (

    <div className="d-flex flex-column min-vh-100">
      <header className="">
        <Header />
      </header>

     <div className="justify-content-center mt-5">
        {/* <div className="text-center" onClick={(event) => handleLogoClick(event)}> */}
        <div className="text-center">
          <img src={require("../img/TBC_Clubhouse.jpg")}
            className="aboutClubPhoto"
            alt="Outside Shot of Board Club" />
        </div>
      </div>

      <div className="">
        <h1 className="aboutHours text-center mt-4"> Club Hours:</h1>
        <h3 className="aboutHours text-center mt-0"> 8am - 6pm</h3>
        <h1 className="closedMondays text-center mt-0">Closed on Monday</h1>
        <p className="aboutInfoFont text-center mt-4 px-2">
          The Board Club is a Newport Beach surf club that provides our members with unlimited access and exchanges to a large variety of quality surfboards from established shapers throughout California. From 7'2" single fins and old school longboards to the latest high-performance shortboards, every surfer now has the ultimate quiver for all wave conditions. Membership also includes social events and activities, networking opportunities, surfboard design education, surf coaching, ocean skills and fitness training, photo and video surf sessions, and special discounts to local businesses throughout the Newport Beach community.
        </p>

        <h1 className="staffTitle text-center mt-5">The Founder: Peter Belden</h1>
          <div className="text-center">
            <img src={require("../img/Peter+Belden.jpeg")}
              className="aboutStaffPhoto mb-5"
              alt="Spencer Pirdy holding surfboard" />
          </div>

        <h1 className="staffTitle text-center mt-2">Staff: Spencer Pirdy</h1>
          <div className="text-center">
            <img src={require("../img/Spencer+Pirdy.jpeg")}
              className="aboutStaffPhoto mb-5"
              alt="Spencer Pirdy holding surfboard" />
          </div>

        <h1 className="staffTitle text-center mt-2">Staff: Will Thompson</h1>
          <div className="text-center">
            <img src={require("../img/Will+Thompson.jpg")}
              className="aboutStaffPhoto aboutSpacer"
              alt="Will Thompson headshot" />
          </div>

      </div>
      <footer className="mt-auto mb-0">
        <NavFooter />
      </footer>
    </div>
  )

}

export default AboutClub;