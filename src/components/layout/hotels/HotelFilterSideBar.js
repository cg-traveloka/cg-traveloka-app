import HotelFilterBanner from "./HotelFilterBanner";
import HotelFilterMoneyRange from "./HotelFilterMoneyRange";
import HotelFilterStarChecked from "./HotelFilterStarChecked";

function HotelFilterSideBar(params) {
    return (
        <div className="hotelFilterSideBar">
            <div className="hotelFilterSideBar-container">
            <HotelFilterBanner />
            <HotelFilterMoneyRange />
            <HotelFilterStarChecked />
            </div>
        </div>
    )
}
export default HotelFilterSideBar;