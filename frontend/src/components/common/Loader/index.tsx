import React from "react";
import { ClipLoader } from "react-spinners";
import "./style.css"

interface LoaderProps {
    loading: boolean;
    size?: number;
    color?: string;
}

const Loader: React.FC<LoaderProps> = ({ loading, size = 50, color = "#36d7b7" }) => {


    return (
        <div className={"loader-center-screen"}>
            {loading && <ClipLoader size={size} color={color} loading={loading} />}
        </div>
    );
};

export default Loader;