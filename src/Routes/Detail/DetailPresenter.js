import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import DetailVideo from "Routes/DetailVideo";
import { Link } from "react-router-dom";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgUrl});
    background-size: cover;
    background-position: center center;
    filter: blur(3px);
    opacity: 0.5;
    z-index:0;
`;

const Content = styled.div`
    display:flex;
    width:100%;
    height:100%;
    position:relative;
    z-index:1;
`;

const Cover = styled.div`
    width:30%;
    height:100%;
    background-image: url(${props => props.bgUrl});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 20px;
`;

const ItemContainer = styled.div`
    display: flex;
    margin: 5px 0;
`;

const Title = styled.h3`
    font-size: 32px;
    margin-bottom: 20px;
`; 

const Item = styled.span`
    margin-bottom: 10px;
`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.div`    
    line-height: 1.5;
    font-size: 12px;
    width: 50%;
    opacity: 0.7;
    margin-bottom: 10px;
`;

const SLink = styled.a`
    background-color: black;
    padding: 2px 5px;
    border-radius: 5px;
`;

const TabContainer = styled.div`
    font-size: 15px;
    margin: 20px 0;
`;

const TabTitle = styled.div`
    margin-bottom: 10px;
    font-weight: 600;
`;

const LogoContainer = styled.div`
    display:flex;    
`;

const LogoItem = styled.div`
    text-align: center;
    margin: 10px;
`;

const LogoImg = styled.div`
    width: 55px;
    height: 55px;
    margin-bottom: 10px;
    background-image: url(${props => props.bgUrl});
    background-size: cover;
    background-position: center center;        
`;

const LogoText = styled.div`
    font-size: 10px;
    opacity: 0.7;
    text-align: center;
    text-wrapping: wrap;
    word-break: break-all;
    width: 55px;
`;

const CountryText = styled.div`
    font-size: 12px;
    margin-right: 5px;
    opacity: 0.8;
`;

const SeasonLink = styled(Link)`
    
`;

const DetailPresenter = ({ isMovie, result, loading, error }) => (
    loading ? (
        <>
            <Helmet>
                <title>Loading | Nomflix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        <Container>
            <Helmet>
                <title>
                    {isMovie ? result.original_title : result.original_name}{" "}
                    | Nomflix
                </title>
            </Helmet>
            <Backdrop bgUrl={
                result && result.backdrop_path ? 
                `https://image.tmdb.org/t/p/original/${result.backdrop_path}`
                : "noPosterSmall.png"}>
            </Backdrop>
            <Content>
                <Cover bgUrl={
                    result && result.poster_path ? 
                    `https://image.tmdb.org/t/p/original/${result.poster_path}`
                    : "noPosterSmall.png"}>
                </Cover>
                <Data>
                    <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                    <ItemContainer>
                        <Item>
                            {result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {`${result.runtime} min`}
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result.genres.map((g, idx) => idx === result.genres.length - 1 ? g.name : `${g.name} / `)}
                        </Item>
                        <Divider>•</Divider>
                        <SLink href={`https://www.imdb.com/title/${result.imdb_id}`}>
                            IMDb
                        </SLink>
                    </ItemContainer>
                    <Overview>{result.overview}</Overview>
                    {isMovie ? null : <SeasonLink to={`/season/${result.id}`}>Seasons</SeasonLink>}
                    {
                        result.production_companies && result.production_companies.length !== 0 && 
                        (
                            <TabContainer>
                                <TabTitle>Production Comapanies</TabTitle> 
                                <LogoContainer>
                                {
                                    result.production_companies.map((p)=> 
                                        <LogoItem key={p.id}>
                                            <LogoImg bgUrl={p.logo_path ? `https://image.tmdb.org/t/p/w300${p.logo_path}` : "noPosterSmall.png"}></LogoImg>
                                            <LogoText>{p.name}</LogoText> 
                                        </LogoItem>
                                    )                                                        
                                }
                                </LogoContainer>
                            </TabContainer>
                        )
                    }                   
                    {
                        result.production_countries && result.production_countries.length !== 0 && 
                        (
                            <TabContainer>
                                <TabTitle>Production Countries</TabTitle>           
                                <ItemContainer>
                                {
                                    result.production_countries.map((p, idx) =>                             
                                        <CountryText key={idx}>{idx === result.production_countries.length - 1 ? p.iso_3166_1 : `${p.iso_3166_1} •`}</CountryText>)
                                }
                                </ItemContainer>
                            </TabContainer>                                
                        )
                    }
                    {
                        result.videos && result.videos.results && result.videos.results.length !== 0 && 
                        (
                            <TabContainer>
                                <TabTitle>Videos</TabTitle>           
                                <DetailVideo video={result.videos.results}></DetailVideo>
                            </TabContainer>
                        )
                    }                    
                </Data>                
            </Content>            
        </Container>
    )
);

DetailPresenter.propTypes = {
    isMovie: PropTypes.bool,
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;