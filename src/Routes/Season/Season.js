import React, { useEffect, useState } from "react";
import { tvApi } from "./api";
import styled from "styled-components";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const SeasonContainer = styled.div`
  text-align: left;
  margin-bottom: 20px;
  width: 100%;
  padding: 5px;
`;

const ItemContainer = styled.div`
  display: flex;
  padding: 5px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ItemKey = styled.div`
  margin-right: 10px;
  font-weight: 600;
`;

const ItemVal = styled.div``;

const PosterContainer = styled.div`
  width: 320px;
  padding: 5px;
`;

const Poster = styled.div`
  width: 300px;
  height: 450px;
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Overview = styled.div`
  font-size: 12px;
  padding: 10px 5px;
  width: 50%;
`;

const BackButton = styled.div`
  text-align: left;
  margin: 10px 5px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const BackTitle = styled.span`
  margin-left: 10px;
`;

const Season = ({ id }) => {
    const [seasons, setState] = useState([]);
    
    console.log(id);
    
    useEffect(() => {
        const getData = async () => {
            const {
                data: { seasons }
            } = await tvApi.showDetail(id);
            setState(seasons);
        };
        getData();
    }, [id]);

    return (
    <>
        <Link to={`/show/${id}`}>
        <BackButton>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
            <BackTitle>Return to TV Show</BackTitle>
        </BackButton>
        </Link>
        {seasons &&
        seasons.map((s) => (
            <Container>
            <PosterContainer>
                <Poster
                bgUrl={
                    s.poster_path
                    ? `https://image.tmdb.org/t/p/original/${s.poster_path}`
                    : "noPosterSmall.png"
                }
                ></Poster>
            </PosterContainer>
            <SeasonContainer>
                <ItemContainer>
                <Title>{s.name}</Title>
                </ItemContainer>
                <ItemContainer>
                <ItemKey>Air Date</ItemKey>
                <ItemVal>{s.air_date}</ItemVal>
                </ItemContainer>
                <ItemContainer>
                <ItemKey>Episode Count</ItemKey>
                <ItemVal>{s.episode_count}</ItemVal>
                </ItemContainer>
                <Overview>{s.overview}</Overview>
            </SeasonContainer>
            </Container>
        ))}
    </>
    );
};

export default Season;
