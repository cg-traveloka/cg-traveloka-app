import userEvent from "@testing-library/user-event";
import HotelSearchBar from "../../components/layout/HotelSearchBar";
import axios from "../../config/privateAxios";
import { useEffect } from "react";

function Hotels(params) {
    useEffect(() => {
        axios.get("/api/hotels")
    }, [])
    return (
        <>
            <HotelSearchBar />
        </>
    );
}
export default Hotels;