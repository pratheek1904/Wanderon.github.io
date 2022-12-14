import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Search = () => {
  const [loading, setloading] = useState(false);
  const [posts, setposts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadingposts = async () => {
      setloading(true);
      const response = await axios.get("https://api.npoint.io/f89acb9ee900ca95b8dc");
      setposts(response.data);
      setloading(false);
    };
    loadingposts();
  }, []);
  return (
    <Wrapper id="recommend">
      <div className="title">
        <h2 className="recomnd">Search your dream places</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="destinations">
        {
          loading?(<h4>Loading...</h4>):(
            (posts.filter((value)=>{
              if(search===''){
                return value
              }
              else if(value.meta.title.toLowerCase().includes(search.toLowerCase())){
                return value.meta.title
              }
            }).map((elem)=>{
            const { title, id, date, featuredImage, meta, tags } = elem;
            return (
              <div key={id} className="destination">
                <img src={featuredImage.link} alt="" />
                <img src={title.categories} alt="" />
                <div className="destination2">
                  {" "}
                  {meta.title} <p>{title.categories}</p>
                </div>
                <div>{meta.description}</div>
                <div>{tags.name}</div>
                <div className="info"></div>
                <div className="distance">
                  {/* <span>{featuredImage.caption}</span> */}
                </div>
                <div className="date">
                  <b> {date}</b>
                </div>
              </div>
            );
            })
            )
          )
          }
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
background-color:whitesmoke;
  padding:0;
  margin: 0;
  .title {
    text-align: center;
  }
  .date{
    border-radius: 8px;
    padding: 5px;
    margin-left: 180px;
    font-size: 10px;
  }
  button{
    background-color: aquamarine;
    border-radius: 80px;
    padding: 10px;
    margin-left: 220px;
    border-bottom-right-radius:10px;
  }
  button:hover{
    background-color: #8338ec;
  }
  .destination2{
   /* color:darkgreen; */
   color: blue;
  }
  input{
    border-radius: 10px;
    padding: 10px;
    background-color: aliceblue;
  }
  .packages {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ul {
      display: flex;
      list-style-type: none;
      width: max-content;
      li {
        padding: 1rem 2rem;
        border-bottom: 0.1rem solid black;
      }
      .active {
        border-bottom: 0.5rem solid #8338ec;
      }
    }
  }
  .destinations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 0 3rem;
    margin-top: 20px;
    .destination {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #8338ec14;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
      }
      .info {
        display: flex;
        align-items: center;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 1rem;
            background-color: #4d2ddb84;
            width: 2rem;
            /* padding: 1rem; */
            padding: 0.3rem 0.4rem;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .distance {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .packages {
      ul {
        li {
          padding: 0 0.5rem;
          font-size: 2vh;
          padding-bottom: 1rem;
        }
        .active {
          border-bottom-width: 0.3rem;
        }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;


export default Search;

// <div>
// <center>
//  <h3>Search Filter</h3>

//  {
//    loading?(<h4>Loading...</h4>):(
//      (posts.filter((value)=>{
//        if(search==''){
//          return value
//        }
//        else if(value.meta.title.toLowerCase().includes(search.toLowerCase())){
//          return value.meta.title
//        }
//      }).map((item)=><h5 key={item.id}>{item.tags.name}</h5>)
//      )
//    )
//  }
// </center>
// </div>
