import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { CurrentUserContext } from "./Context/CurrentUser";
import Loading from "./Conditionnal/Loading";

import moment from "moment";
const ListingFeed = () => {
  const { newUser } = useContext(CurrentUserContext);
  const [listings, setListings] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("All");
  const [zones, setZones] = useState([]);
  const [zone, setZone] = useState("All");
  const [status, setStatus] = useState("idle");
  let navigate = useNavigate();

  //************************************************************** */
  /// fetching for dropdown menus
  //************************************************************** */
  useEffect(() => {
    setStatus("loading");
    fetch("/listing")
      .then((res) => res.json())
      .then((data) => {
        let newArr = [];
        data.data.forEach((item) => {
          newArr.push(item.category);
        });
        let categoryArr = newArr.filter((item, pos) => {
          return newArr.indexOf(item) === pos;
        });
        setCategories(categoryArr);
        let newNewArr = [];
        data.data.forEach((item) => {
          newNewArr.push(item.zone);
        });
        let zoneArr = newNewArr.filter((item, pos) => {
          return newNewArr.indexOf(item) === pos;
        });
        setZones(zoneArr);
        setStatus("loaded");
      });
  }, []);
  //************************************************************** */
  /// fetching for listing dynamically from query
  //************************************************************** */

  useEffect(() => {
    setStatus("loading");
    let url = ``;
    if (category !== "All") {
      url = `/listing?category=${category}`;
    } else if (zone !== "All") {
      url = `/listing?zone=${zone}`;
    } else {
      url = "/listing";
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setListings(data.data);
        setStatus("loaded");
      });
  }, [category, zone]);

  //************************************************************** */
  /// Action in Listing
  //************************************************************** */
  //Category dropdown meny
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setZone("All"); // toggle other dropdown
  };
  // Zone dropdown menu
  const handleZone = (e) => {
    setZone(e.target.value);
    setCategory("All"); // toggle other dropdown
  };
  //Redirect to user profile
  const handleProfileClick = (email, event) => {
    event.stopPropagation();
    navigate(`/user/${email}`);
  };
  //Redirect to listing detail
  const handleListingDetail = (_id, event) => {
    event.stopPropagation();
    navigate(`/listing/${_id}`);
  };

  if (status === "loading") {
    return <Loading />;
  } else {
    return (
      <>
        <Dropdown>
          <select
            onChange={(e) => {
              handleCategory(e);
            }}
            value={category}
          >
            <option>All</option>;
            {categories.map((item, id) => {
              return <option key={id}>{item}</option>;
            })}
          </select>
          <select
            value={zone}
            onChange={(e) => {
              handleZone(e);
            }}
          >
            <option>All</option>;
            {zones.map((item, id) => {
              return <option key={id}>{item}</option>;
            })}
          </select>
        </Dropdown>
        <Container>
          {listings?.map((item, id) => {
            return (
              <AdContainer
                key={id}
                onClick={(event) => {
                  handleListingDetail(item?._id, event);
                }}
              >
                <UserInfo
                  onClick={(event) => {
                    handleProfileClick(item?.email, event);
                  }}
                >
                  <strong style={{ marginRight: "20px" }}>Posted by :</strong>{" "}
                  <Avatar alt="userpicture" src={item?.userpicture} />
                  {item?.nickname}
                </UserInfo>
                <Title>{item?.title}</Title>
                <Category>
                  <strong>Category:</strong> {item?.category}
                </Category>
                <TimeStamp>
                  {moment(item?.timestamp).format("MMM Do")}
                </TimeStamp>
              </AdContainer>
            );
          })}
        </Container>
      </>
    );
  }
};

const Dropdown = styled.div`
  width: 40%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  color: #65676b;
`;

const Container = styled.div`
  width: 40%;
  height: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  color: #65676b;
`;

const AdContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
  border: 1px solid;
  border-radius: 3px;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  :hover {
    /* transform: translateY(1px) scale(1);
    transform-origin: 50%;
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1); */
    border: 1.5px solid #2c5ff6;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 0;
  margin-bottom: 25px;
`;

const Avatar = styled.img`
  height: auto;
  width: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Title = styled.div`
  font-size: 24px;
`;

const Category = styled.div`
  font-size: 13px;
  margin-top: 20px;
`;

const TimeStamp = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

export default ListingFeed;
