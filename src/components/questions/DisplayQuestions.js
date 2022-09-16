import React from "react";
import "./DisplayQuestions.scss";

import AllQuestions from "./AllQuestions";

import membericon from "./group.png";
import staticon from "./stats.png";
import { useEffect } from "react";

const DisplayQuestions = ({ account, mainContract }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [num, setNum] = React.useState("");

  const displayQuestions = async (e) => {
    let num = await mainContract.q_id();
    num = parseInt(num._hex, 16);
    console.log(num);
    setNum(num);
    setLoading(false);
  };

  useEffect(() => {
    displayQuestions();
  }, [mainContract]);

  if (isLoading) {
    return "loading";
  }
  return (
    <>
      <div className="main">
        <div className="content-section">
          <div className="main-top">
            <h2> All Questions</h2>
            <button>Ask Question</button>
          </div>
          <div className="main-dec">
            <p> {num} Questions </p>
            <div className="main-filter">
              <div className="main-tabs">
                <div className="main-tab">
                  <button>Newest</button>
                </div>
                <div className="main-tab">
                  <button>Score</button>
                </div>
                <div className="main-tab">
                  <button>Unanswered</button>
                </div>
              </div>
              <div className="main-filter-item">
                <p>Filter</p>
              </div>
            </div>
          </div>
          <div className="questions">
            <div className="question">
              <AllQuestions account={account} mainContract={mainContract} />
            </div>
          </div>
          {/* <div class="pagination">
            <a href="#">previous</a>
            <a href="#" className="active">
              1
            </a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">6</a>
            <a href="#">Next</a>
          </div> */}
        </div>

        <div className="right-section">
          <div className="sidebar-heading">
            <h2>
              <img src={staticon} alt />
              Stats
            </h2>
          </div>
          <div className="grid-container">
            <div class="grid-item-1">
              <p>Question</p>
              <h2>200</h2>
            </div>
            <div class="grid-item-2">
              <p>Best Answers</p>

              <h2>129</h2>
            </div>
            <div class="grid-item-3">
              <p>Answers</p>
              <h2>56</h2>
            </div>
            <div class="grid-item-4">
              <p>Users</p>
              <h2>40</h2>
            </div>
          </div>
          <div className="top-members">
            <div className="heading-members">
              <h2>
                <img src={membericon} alt />
                Top Members
              </h2>
            </div>
            {/* <div className="members">
              <img className="profile-img" src="https://i.pravatar.cc/200" alt=""/>
              <div className="text-container">
                <p className="title-text">Austin May</p>
                <h2>USer Name</h2>
                <p className="info-text">Lorem, ipsum dolor.</p>
                <p className="desc-text">
                  Lorem, ipsum.
                </p>
              </div>
              
            
              
            </div>
           */}
            <div class="cards">
              <div class="card card-1">
                <h3 class="card__title">
                  <img
                    className="profile-img-1"
                    src="https://i.pravatar.cc/70"
                    alt=""
                  />
                  Lorem, ipsum dolor.
                  <p>Lorem ipsum dolor sit.</p>
                </h3>
              </div>
            </div>
            <div class="cards">
              <div class="card card-1">
                <h3 class="card__title">
                  <img
                    className="profile-img-1"
                    src="https://i.pravatar.cc/70"
                    alt=""
                  />
                  Lorem, ipsum dolor.
                  <p>Lorem ipsum dolor sit.</p>
                </h3>
              </div>
            </div>
            <div class="cards">
              <div class="card card-1">
                <h3 class="card__title">
                  <img
                    className="profile-img-1"
                    src="https://i.pravatar.cc/70"
                    alt=""
                  />
                  Lorem, ipsum dolor.
                  <p>Lorem ipsum dolor sit.</p>
                </h3>
              </div>
            </div>
            <div class="cards">
              <div class="card card-1">
                <h3 class="card__title">
                  <img
                    className="profile-img-1"
                    src="https://i.pravatar.cc/70"
                    alt=""
                  />
                  Lorem, ipsum dolor.
                  <p>Lorem ipsum dolor sit.</p>
                </h3>
              </div>
            </div>
            <div class="cards">
              <div class="card card-1">
                <h3 class="card__title">
                  <img
                    className="profile-img-1"
                    src="https://i.pravatar.cc/70"
                    alt=""
                  />
                  Lorem, ipsum dolor.
                  <p>Lorem ipsum dolor sit.</p>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayQuestions;
