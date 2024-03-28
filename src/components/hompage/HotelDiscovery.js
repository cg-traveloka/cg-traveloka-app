import React from "react";

function HotelDiscovery() {
  const getHotels = (cityId) => {
    alert(cityId);
  };
  return (
    <div className="container w-4/5 mx-auto">
      <div className="mt-5">
        <div className="">
          <h2>
            <span>
              <i
                className="fa-solid fa-hotel fa-2xl mr-5"
                style={{ color: "#0c2a5f" }}
              ></i>
            </span>
            <span className="font-bold text-xl">
              Tái khám phá bản thân ở Việt Nam và những nơi khác
            </span>
          </h2>
        </div>
        <div className="mt-7">
          <div className="flex gap-5 justify-center">
            <div
              className="relative bg-white rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1536086845112-89de23aa4772?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hình ảnh Hồ Chí Minh"
                onClick={() => getHotels(30)}
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Hồ Chí Minh</div>
                <p className="text-white">2000 accommodations</p>
              </div>
            </div>
            <div
              className="relative bg-white rounded-md shadow-md overflow-hidden  transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hình ảnh Đà Nẵng"
                onClick={() => getHotels(15)}
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Đà Nẵng</div>
                <p className="text-white">1000 accommodations</p>
              </div>
            </div>
            <div
              className="relative bg-white rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1671783180076-e906ffbd6663?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hình ảnh Đà Lạt"
                onClick={() => getHotels(38)}
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Đà Lạt</div>
                <p className="text-white">1200 accommodations</p>
              </div>
            </div>
          </div>
          <div className="hotel-discovery__images__item flex gap-5 justify-center mx-2 mt-5">
            <div
              className="relative bg-white rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1599708153386-62bf3f035c78?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hình ảnh Hà Nội"
                onClick={() => getHotels(24)}
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Hà Nội</div>
                <p className="text-white">2000 accommodations</p>
              </div>
            </div>
            <div
              className="relative bg-white rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hình ảnh Vịnh Hạ Long"
                onClick={() => getHotels(49)}
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Quảng Ninh</div>
                <p className="text-white">1100 accommodations</p>
              </div>
            </div>
            <div
              className="relative bg-white rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
              style={{ maxWidth: "300px", height: "180px" }}
            >
              <img
                src="https://images.unsplash.com/photo-1604971684445-0ac837a1c720?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aHVlfGVufDB8fDB8fHww"
                alt="Hình ảnh Huế"
                onClick={() => getHotels(57)}
                className="h-auto w-30 object-cover rounded-md"
              />
              <div className="absolute top-0 left-0 p-4">
                <div className="text-white font-bold text-l">Huế</div>
                <p className="text-white">900 accommodations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDiscovery;
