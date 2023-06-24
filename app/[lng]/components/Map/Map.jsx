"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
const Map = ({ langWord }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef();
  const [erroDrive, setErroDrive] = useState(false);
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState(false);
  const [searchLocationOpen, setSearchLocationOpen] = useState(false);
  const [placeOpenLoaction, setPlaceOpenLoaction] = useState(false);
  const searchInput = useRef();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?key=4efc6215dd6d4f6a9fb0a93d14ded2ee&q=${latitude},${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              setUserLocation([latitude, longitude]);
              const userPoint = turf.point([latitude, longitude]);
              const tantaCoordinates = [30.786509, 31.000376];
              const tantaPoint = turf.point(tantaCoordinates);
              const distance = turf.distance(userPoint, tantaPoint, {
                units: "kilometers",
              });
              if (distance <= 35 && distance >= 28) {
                setErroDrive(false);
              } else {
                setErroDrive(true);
              }
              localStorage.setItem(
                "userLocation",
                JSON.stringify({
                  location: [latitude, longitude],
                  place: data.results[0],
                })
              );
            })
            .catch((error) => {
              console.log(error);
            });
        },
        (error) => {
          setPlaceOpenLoaction(true);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleLocationSelection = () => {
    if (userLocation) {
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?key=4efc6215dd6d4f6a9fb0a93d14ded2ee&q=${userLocation[0]},${userLocation[1]}`
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem(
            "userLocation",
            JSON.stringify({
              location: [latitude, longitude],
              place: data.results[0],
            })
          );
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleMapMove = (event) => {
    const { lat, lng } = event.target.getCenter();
    setUserLocation([lat, lng]);
  };

  const handleMapMoveEnd = (event) => {
    const { lat, lng } = event.target.getCenter();
    const userPoint = turf.point([lng, lat]);
    const tantaCoordinates = [30.786509, 31.000376];
    const tantaPoint = turf.point(tantaCoordinates);
    const distance = turf.distance(userPoint, tantaPoint, {
      units: "kilometers",
    });
    if (distance <= 35 && distance >= 28) {
      setErroDrive(false);
    } else {
      setErroDrive(true);
    }
  };
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (searchInput.current && !searchInput.current.contains(e.target)) {
        setSearchLocationOpen(false);
      } else {
        if (searchLocation.length !== 0) {
          setSearchLocationOpen(true);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [searchInput, searchLocation]);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?key=4efc6215dd6d4f6a9fb0a93d14ded2ee&q==${encodeURIComponent(
            event.target.value
          )}`
        )
        .then((response) => {
          const { results } = response.data;
          let egLocation = results.filter(
            (lo) => lo.components.country === "Egypt"
          );
          setSearchLocation(egLocation);
          if (egLocation.length !== 0) {
            setSearchLocationOpen(true);
          } else {
            setSearchLocationOpen(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setSearchLocation(false);
        });
    }
  };

  const selectedLocationSearch = (location) => {
    const { lat, lng } = location.geometry;
    setUserLocation([lat, lng]);
    mapRef.current.panTo([lat, lng]);
  };
  return (
    <div className="relative || h-screen || flex || flex-col">
      <div className="flex || justify-between || items-center || py-3 || px-4">
        <Link
         prefetch={false}
          as={`/${langWord.lang}`}
          href={`/${langWord.lang}`}
          className={`${
            langWord.lang === "en" ? "" : ""
          }  text-2xl || cursor-pointer`}
        >
          {langWord.lang === "en" ? <BsArrowLeft /> : <BsArrowRight />}
        </Link>
        <p className="text-lg || font-bold">{langWord.selectLoaction}</p>
        <p
          href={`/${langWord.lang}`}
          className={` text-2xl || cursor-pointer || opacity-0 || invisible`}
        >
          {langWord.lang === "en" ? <BsArrowLeft /> : <BsArrowRight />}
        </p>
      </div>
      <div
        style={{ zIndex: "11111111" }}
        ref={searchInput}
        className="absolute || flex || items-center || gap-2 || px-4 || box-shadow-edit-map || top-[60px] || left-1/2 || bg-white || w-[90%] || -translate-x-1/2"
      >
        <div className="w-[24px] || h-[24px] || flex || items-center || justify-center">
          <BiSearch className="text-xl || text-gray-500" />
        </div>
        <input
          className="bg-transparent || w-full || outline-none || py-2"
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder={langWord.searchMap}
        />
        <div
          className={`${
            !searchLocationOpen
              ? "opacity-0 || invisible"
              : "opacity-100 || transition-opacity || duration-300 z-10"
          } absolute || w-[90%] || box-shadow-edit-map-search || scrollStyle || max-h-[300px] || bg-white || top-[100%] || overflow-y-auto`}
        >
          <ul>
            {searchLocation &&
              searchLocation.map((ele, i) => (
                <li
                  onClick={() => selectedLocationSearch(ele)}
                  key={i}
                  className="border || cursor-pointer  || border-[#e6e6e6] || text-[#515151] || py-1.5 || flex || items-center || gap-1 || px-3"
                >
                  <IoLocationSharp />
                  <span className="text-[15px] w-full">{ele.formatted}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 || flex || flex-col || relative ">
        {!placeOpenLoaction ? (
          userLocation ? (
            <MapContainer
              center={userLocation}
              zoom={13}
              className="flex-1"
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                attribution="Map data &copy; OpenStreetMap contributors"
              />

              <Marker position={userLocation} icon={customIcon} />
              {erroDrive && (
                <div
                  className="absolute || top-[45%] || -translate-y-1/2  || left-1/2 || -translate-x-1/2 || bg-black || text-white || py-1.5 || px-3 || font-semibold"
                  style={{
                    zIndex: "111111",
                  }}
                >
                  <p>{langWord.mapDrive}</p>
                </div>
              )}
              <MapEvents onMove={handleMapMove} onMoveend={handleMapMoveEnd} />
            </MapContainer>
          ) : (
            <div className="flex-1 || bg-white || flex || justify-center || items-center || px-4">
              <span className="loaderMap before:border-mainColor"></span>
            </div>
          )
        ) : (
          <div className="flex-1 || bg-white || flex || justify-center || items-center || px-4 || text-center || font-bold">
            {langWord.please}
          </div>
        )}
      </div>
      <div className="p-4">
        {placeOpenLoaction ? (
          <button className="bg-[#e4e4e4] || text-[#1f1f1f59] || block || w-full || rounded-full || py-2 || cursor-not-allowed || duration-500">
            {langWord.save}
          </button>
        ) : userLocation ? (
          <button
            className="bg-mainColor || text-white || block || w-full || rounded-full || py-2 hover:bg-hovermainColor || duration-500"
            onClick={handleLocationSelection}
          >
            {langWord.save}
          </button>
        ) : (
          <button className="bg-[#e4e4e4] || text-[#1f1f1f59] || block || w-full || rounded-full || py-2 || cursor-not-allowed || duration-500">
            {langWord.save}
          </button>
        )}
      </div>
    </div>
  );
};

const MapEvents = ({ onMove, onMoveend }) => {
  useMapEvents({
    move: onMove,
    moveend: onMoveend,
  });
};

const customIcon = new Icon({
  iconUrl: "/assets/img/loc.png",
  iconSize: [32, 32],
});

export default Map;
