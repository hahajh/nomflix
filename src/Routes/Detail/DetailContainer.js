import { moviesApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component{
    constructor(props){
        super(props);
        const { location: { pathname } } = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }    

    async componentDidMount() {
        this.setState({ loading: true });
        try{
            const {
                match: {
                    params: { id }
                },
                history: { push }            
            } = this.props;
            const { isMovie } = this.state;
            const parsedId = parseInt(id);
            if (isNaN(parsedId)) {
                return push("/");
            }
            let result = null;
            if (isMovie) {
                ({ data: result } = await moviesApi.movieDetail(id));
            } else {
                ({ data: result } = await tvApi.showDetail(id));
            }
            this.setState({result});
            console.log(result);
        }
        catch(e){
            this.setState({ error: "Can't find detail information." });
        }
        finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const { result, error, loading } = this.state;
        return (
            <DetailPresenter 
                result={result}
                error={error}
                loading={loading}
            />
        )
    }
};