import React from "react";

function FlightDiscovery() {
  const getFlight = (cityId) => {};
  return (
    <div className="container w-4/5 mx-auto mb-20 ">
      <div className="my-5">
        <span>
          <i
            className="fa-solid fa-plane fa-2xl mx-5"
            style={{ color: "#0c2a5f" }}
          ></i>
        </span>
        <span className="font-bold text-xl">Du hành xuyên Việt</span>
      </div>
      <div className="flex gap-4 justify-center mx-4 mt-7">
        <div
          className="relative rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
          style={{ width: "180px", maxHeight: "280px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1560699380-276159e957e0?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hình ảnh Hội An"
            onClick={() => getFlight(30)}
            className="h-auto w-30 object-cover rounded-md "
          />
          <div className="absolute bottom-3 left-0 p-4">
            <div className="text-white font-bold">Hội An</div>
          </div>
        </div>

        <div
          className="relative bg-white rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
          style={{ width: "180px", maxHeight: "280px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1568206354559-addcfc739aab?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hình ảnh Hà Giang"
            onClick={() => getFlight(30)}
            className="h-auto w-30 object-cover rounded-md"
          />
          <div className="absolute bottom-3 left-0 p-4">
            <div className="text-white font-bold text-l">Hà Giang</div>
          </div>
        </div>

        <div
          className="relative bg-white rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
          style={{ width: "180px", maxHeight: "280px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1677853918896-a47126ed778d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hình ảnh Sapa"
            onClick={() => getFlight(30)}
            className="h-auto w-30 object-cover rounded-md"
          />
          <div className="absolute bottom-3 left-0 p-4">
            <div className="text-white font-bold text-l">Sapa</div>
          </div>
        </div>

        <div
          className="relative bg-white rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
          style={{ width: "180px", maxHeight: "280px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1503188991764-408493f288b9?q=80&w=2334&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hình ảnh Nha Trang"
            onClick={() => getFlight(30)}
            className="h-auto w-30 object-cover rounded-md"
          />
          <div className="absolute bottom-3 left-0 p-4">
            <div className="text-white font-bold text-l">Nha Trang</div>
          </div>
        </div>

        <div
          className="relative bg-white rounded-md shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
          style={{ width: "180px", maxHeight: "280px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1680711213504-836c9daf68d6?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hình ảnh Cần Thơ"
            onClick={() => getFlight(30)}
            className="h-auto w-30 object-cover rounded-md"
          />
          <div className="absolute bottom-3 left-0 p-4">
            <div className="text-white font-bold text-l">Cần Thơ</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightDiscovery;
