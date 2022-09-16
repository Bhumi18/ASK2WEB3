import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cryptoinfo-style/News.scss";

const Cryptonews = () => {
  const [apiData, setApiData] = useState();

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://crypto-news-live8.p.rapidapi.com/news/bitcoinnews",
      headers: {
        "X-RapidAPI-Key": "fbb16cf004msh1af9515587b6182p19a6c2jsn2ae4a5a1e3b6",
        "X-RapidAPI-Host": "crypto-news-live8.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setApiData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(apiData);
  const first7Apidata = apiData?.slice(0, 8);

  return (
    <>
      <div className="crypto-news">
        <div className="rightcolumn">
          <div className="news">
            <h2>News</h2>
            {/* {first7Apidata?.map((data, _index) => (
            <h2>TITLE </h2>
            {/* {first7ApiData?.map((data, _index) => (
              <div key={_index}>

            <h2>Popular News</h2>
            {first7Apidata?.map((data, _index) => (
              <div className="apidata" key={_index}>
                <a href={data.url}>
                  <p>{data.title}</p>
                </a>
              </div>
            ))}
            <div className="fakeimg-1">Image</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cryptonews;
