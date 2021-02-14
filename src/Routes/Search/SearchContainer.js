import { moviesApi, tvApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component{
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm:  "",
        loading: true,
        error: null
    }

    handleSubmit = event => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if(searchTerm !== ""){
            this.SearchByTerm();
        }
    }

    updateTerm = event => {
        const { target: { value } } = event;
        this.setState({
            searchTerm: value
        })
    }

    SearchByTerm = async() => {
        const { searchTerm } = this.state;
        this.setState({ loading: true });
        try {
            const {
                data: { results: movieResults }
            } = await moviesApi.searchMovie(searchTerm);
            const {
                data: { results: tvResults }
            } = await tvApi.searchTv(searchTerm);
            this.setState({
               movieResults,
               tvResults 
            });
        } catch {
            this.setState({
                error: "Can't find moive information."
            });
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const {movieResults, tvResults, searchTerm, loading, error } = this.state;
        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                loading={loading}
                error={error}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }
}