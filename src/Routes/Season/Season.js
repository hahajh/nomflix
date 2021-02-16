import React, { useEffect, useState } from "react";
import { tvApi } from "api";
import styled from "styled-components";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 50px;
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
  font-size: 15px;
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
  opacity: 0.6;
`;

const BackButton = styled.div`
    text-align: left;
    margin: 20px 25px;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        color: #ffcc00;
    }
    z-index: 1;
`;

const BackTitle = styled.span`
  margin-left: 10px;
`;

const Season = ({match: {params: {id}}}) => {
    const [seasons, setState] = useState([]);
    const [backdrop, setBackdrop] = useState();
    const [originalName, setOriginalName] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {            
            const { data: { seasons, backdrop_path, original_name } } = await tvApi.showDetail(id);
            setState(seasons);
            setBackdrop(backdrop_path);
            setOriginalName(original_name);
            setLoading(false);
        };
        getData();        
    }, [id, loading]);

    return loading ? (
        <>
            <Helmet>
                <title>Loading | Nomflix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
    <>        
        <Helmet>
            <title>
                {`${originalName} | Nomflix`} 
            </title>
        </Helmet>        
        <Link to={`/show/${id}`}>
            <BackButton>
                <FontAwesomeIcon icon={faChevronCircleLeft} />
                <BackTitle>Return to TV Show</BackTitle>
            </BackButton>
        </Link>
        {seasons &&
        seasons.map((s) => (
            <Container key={s.id}>
                <PosterContainer>
                    <Poster bgUrl={s.poster_path
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
                    <ItemKey>Total Episodes</ItemKey>
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
