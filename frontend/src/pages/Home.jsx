import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBNavbar,
  MDBNavbarBrand,
  MDBHamburgerToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBSelect,
  MDBDatePicker,
  MDBCardHeader
} from "mdbreact";
import { getRegions, getDailies } from "../client";
import RegionOverview from "../components/regionOverview";
import TotalOverview from "../components/totalOverview";
import moment from "moment";
import "moment/locale/it";
import DeltaOverview from "../components/deltaOverview";

const dateTheme = {
	palette: {
	  primary: {
		main: "#00bcd4"
	  },
	  secondary: {
		main: "#00bcd4",
		contrastText: "#00bcd4"
	  }
	},
	typography: {
	  useNextVariants: true
	}
  }

const Home = () => {
  const [dailies, setDailies] = useState([]);
  const [regions, setRegions] = useState([]);
  const [regionIndex, setRegionIndex] = useState(0);
  const [startRegionDate, setRegionStartDate] = useState(new Date());
  const [endRegionDate, setRegionEndDate] = useState(new Date());
  const [startOverviewDate, setOverviewStartDate] = useState(new Date());
  const [endOverviewDate, setOverviewEndDate] = useState(new Date());
  const [startDeltaDate, setDeltaStartDate] = useState(new Date());
  const [endDeltaDate, setDeltaEndDate] = useState(new Date());
  useEffect(() => {
    getRegions().then(res => {
      let data = [];
      res.data.regions.forEach((d, index) => {
        data.push({ value: d._id, text: d.name, checked: index === 0 });
      });
      setRegions(data);
    });
    getDailies().then(res => {
      setDailies(res.data.dailies);
      setRegionStartDate(new Date(res.data.dailies[0].date));
      setRegionEndDate(
        new Date(res.data.dailies[res.data.dailies.length - 1].date)
      );
      setOverviewStartDate(new Date(res.data.dailies[0].date));
      setOverviewEndDate(
        new Date(res.data.dailies[res.data.dailies.length - 1].date)
	  );
	  setDeltaStartDate(new Date(res.data.dailies[0].date));
      setDeltaEndDate(
        new Date(res.data.dailies[res.data.dailies.length - 1].date)
      );
    });
  }, []);
  return (
    <MDBContainer size="xl">
      <MDBRow className="mt-5 pb-5">
        {regions.length > 0 && (
          <MDBCol size="12">
            <MDBCard>
              <MDBCardBody>
			  <MDBRow>
              <MDBCol md="3" sm="12"> <h4 className="grey-text mt-4 mb-2">FOCUS PER REGIONE</h4> </MDBCol>
			  </MDBRow>
                <MDBRow>
                  <MDBCol md="4" sm="12">
                    <MDBSelect
					label="Seleziona"
                      options={regions}
					  search
					  searchLabel=" Cerca"
                      getValue={value => {
                        let r = regions.findIndex(e => {
                          return e.value == value;
                        });
                        console.log(r);
                        setRegionIndex(r);
                      }}
                    />
                  </MDBCol>
				  <MDBCol md="4" sm="12"></MDBCol>
                  <MDBCol md="2" sm="5">
                    <MDBDatePicker
                      autoOk
                      value={startRegionDate}
                      getValue={setRegionStartDate}
                      locale={moment.locale("it")}
                      cancelLabel="Cancella"
                      theme={dateTheme}
                    />{" "}
                  </MDBCol>
                  <MDBCol md="2" sm="5">
                    <MDBDatePicker
                      autoOk
                      value={endRegionDate}
                      getValue={setRegionEndDate}
                      locale={moment.locale("it")}
                      cancelLabel="Cancella"
                      theme={dateTheme}
                    />
                  </MDBCol>
                </MDBRow>
                <RegionOverview
                  region={regions[regionIndex].value}
                  data={dailies}
                  start={startRegionDate}
                  end={endRegionDate}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        )}
        {regions.length > 0 && (
          <MDBCol size="12" className="mt-5">
            <MDBCard>
              <MDBCardBody>
			  <MDBRow>
              <MDBCol md="3" sm="12"> <h4 className="grey-text mt-4 mb-0 pb-0">FOCUS ITALIA</h4> </MDBCol>
			  </MDBRow>
                <MDBRow>
                  <MDBCol md="8" sm="12"></MDBCol>
                  <MDBCol md="2" sm="5">
                    <MDBDatePicker
                      cancelLabel="Cancella"
                      okLabel="Ok"
                      autoOk
                      value={startOverviewDate}
                      getValue={setOverviewStartDate}
					  locale={moment.locale("it")}
					  theme={dateTheme}
                    />
                  </MDBCol>
                  <MDBCol md="2" sm="5">
                    <MDBDatePicker
                      cancelLabel="Cancella"
                      okLabel="OK"
                      autoOk
                      value={endOverviewDate}
                      getValue={setOverviewEndDate}
					  locale={moment.locale("it")}
					  theme={dateTheme}
                    />
                  </MDBCol>
                </MDBRow>
                <TotalOverview
                  data={dailies}
                  start={startOverviewDate}
                  end={endOverviewDate}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        )}
		{regions.length > 0 && (
          <MDBCol size="12" className="mt-5">
            <MDBCard>
              <MDBCardBody>
			  <MDBRow>
              <MDBCol md="3" sm="12"> <h4 className="grey-text mt-4 mb-2">DELTA</h4> </MDBCol>
			  </MDBRow>
                <MDBRow>
                  <MDBCol md="8" sm="12"></MDBCol>
                  <MDBCol md="2" sm="5">
                    <MDBDatePicker
                      cancelLabel="Cancella"
                      okLabel="Ok"
                      autoOk
                      value={startDeltaDate}
                      getValue={setDeltaStartDate}
					  locale={moment.locale("it")}
					  theme={dateTheme}
                    />
                  </MDBCol>
                  <MDBCol md="2" sm="5">
                    <MDBDatePicker
                      cancelLabel="Cancella"
                      okLabel="OK"
                      autoOk
                      value={endDeltaDate}
                      getValue={setDeltaEndDate}
					  locale={moment.locale("it")}
					  theme={dateTheme}
                    />
                  </MDBCol>
                </MDBRow>
                <DeltaOverview
                  data={dailies}
                  start={startDeltaDate}
                  end={endDeltaDate}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        )}
      </MDBRow>
    </MDBContainer>
  );
};

export default Home;
