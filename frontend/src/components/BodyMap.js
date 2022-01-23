import { Wrapper, Status } from "@googlemaps/react-wrapper";

const BodyMap = () => {
    const render = (status) => {
        return <h1>{status}</h1>;
    };

    const Map = () => {};

    return <Wrapper apiKey={"AIzaSyAiJxWpyJiXusPV-h9JUAZ7J8Fno_M-etw"} render={render}>
    </Wrapper>;
};



export default BodyMap;
