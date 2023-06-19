
import { useNavigate } from "react-router-dom";

import Header from '../components/Header';
import NavFooter from '../components/NavFooter';
import EventPageHeader from '../components/EventPageHeader';


function ClubEvents() {


  //Event Handlers

  const navigate = useNavigate();

  const handleCurrentEvents = async (event) => {
    event.preventDefault();
    navigate("/club_events/current_events");
  };

  const handleEventHistory = async (event) => {
    event.preventDefault();
    navigate("/club_events/eventHistory");
  };

  return (

    <div className="d-flex flex-column min-vh-100">
      <header className="">
        <Header />
      </header>

      <div>
        <EventPageHeader />
      </div>
      
      <h1 className="homeTitle text-center mt-5"> Club Events Page!</h1>

      {/* <div className="eventsTabBox"> */}
         {/* <div className="d-flex align-items-center justify-content-center col px-5 py-3"> */}
         {/* <div className="d-flex flex-col px-0 py-1 align-items-center justify-content-center">
          <div className="eventPageBtns p-3 m-3 text-center" onClick={(event) => handleCurrentEvents(event)}>Upcoming Events</div>
          <div className="eventPageBtns p-3 m-3 text-center" onClick={(event) => handleEventHistory(event)}>Previous Events</div>
        </div>
      </div> */}

      <footer className="mt-auto mb-0">
        <NavFooter />
      </footer>
    </div>

  )

}

export default ClubEvents;