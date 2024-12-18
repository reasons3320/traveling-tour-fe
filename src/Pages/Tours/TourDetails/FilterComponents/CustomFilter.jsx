import React from "react";
import "../TourDetailsPage.scss";
import { Input } from "reactstrap";
import { Radio } from "antd";
import './CustomFilter.scss'
import { getTourTypesQuery } from "../../../../helper/tourTypeQuery";
const filterLists = {
  filterCheckedLists: [
    {
      label: "Beach",
      key: "BE5",
    },
    {
      label: "Natural Park",
      key: "park",
    },
    {
      label: "History",
      key: "HI7",
    },
    {
      label: "Mountain",
      key: "MO8",
    },
    {
      label: "Island",
      key: "island",
    },
  ],
};
const items = filterLists.filterCheckedLists;
const CustomFilter = (props) => {
  const { handleSearch, searchParams, setSearchParams, onHandleCheck } = props;
  const {data,isError,isLoading} = getTourTypesQuery();
  return (
    <div className="searchBar">
      <h6>Filters</h6>
      <div class="searchBarItems">
        <Input
          type="text"
          placeholder="Where do you wanna come  ?"
          onChange={handleSearch}
          value={searchParams.search}
        />
      </div>
      {/* =======Tour type========= */}

      <div className="searchBarsCheckBoxes">
        <div>
          <h6>Travel Types</h6>
          {data?.map((item, index) => (
            <div class=" form-check" key={index}>
              <Input
                class="form-check-input"
                style={{
                  marginRight: 10,
                }}
                type="checkbox"
                value={item._id}
                id={item._id}
                onChange={onHandleCheck}
              />
              <label class="form-check-label" for={item._id}>
                {item.name}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h6>Cost</h6>
          <Radio.Group style={{
            marginBottom:20,
            display:'flex',
            flexDirection:'column'
          }} onChange={(e)=>setSearchParams({...searchParams,cost:e.target.value})} value={searchParams.cost}>
            <Radio value={'asc'}>
              Ascending</Radio>
            <Radio value={'desc'}>Descending</Radio>
          </Radio.Group>
        </div>
        <div>
          <h6>Date</h6>
          <div class=" form-check" key={"newest"}>
            <Input
              class="form-check-input"
              style={{
                marginRight: 10,
              }}
              type="checkbox"
              value={"newest"}
              id={"newest"}
              onChange={onHandleCheck}
            />
            <label class="form-check-label" for={"newest"}>
              Newest
            </label>
          </div>
          <div class=" form-check" key={"latest"}>
            <Input
              class="form-check-input"
              style={{
                marginRight: 10,
              }}
              type="checkbox"
              value={"latest"}
              id={"latest"}
              onChange={onHandleCheck}
            />
            <label class="form-check-label" for={"latest"}>
              Latest
            </label>
          </div>
        </div>
      </div>
      {/* =======Popular city========= */}
    </div>
  );
};

export default CustomFilter;
