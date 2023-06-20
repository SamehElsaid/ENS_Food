"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function HomePage({ data, lang, title, seeMore }) {
  const containerRef = useRef(null);
  const [divId, setDivId] = useState(0);
  const headerRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [initialMouseX, setInitialMouseX] = useState(0);
  const [initialMouseY, setInitialMouseY] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);
  const [initialScrollTop, setInitialScrollTop] = useState(0);
  const [sortedHeader, setShortHead] = useState([...data.data]);
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const divs = container.querySelectorAll(".head");
      headerRef.current.scrollLeft = 0;

      divs.forEach((div) => {
        const { offsetTop, offsetHeight, id } = div;
        const divTop = offsetTop - scrollTop;
        const divBottom = divTop + offsetHeight;
        const isInView =
          (divTop >= 0 && divTop <= clientHeight * 0.6) ||
          (divBottom >= 0 && divBottom <= clientHeight * 0.6);

        if (isInView) {
          setDivId(+id);
        }
      });
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseDown = (event) => {
    setMouseDown(true);
    setInitialMouseX(event.clientX);
    setInitialScrollLeft(headerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const handleMouseMove = (event) => {
    if (!mouseDown) return;

    const deltaX = event.clientX - initialMouseX;
    const deltaY = event.clientY - initialMouseY;
    const newScrollLeft = initialScrollLeft - deltaX;
    const newScrollTop = initialScrollTop - deltaY;

    // Limit the horizontal scroll position
    const maxScrollLeft =
      headerRef.current.scrollWidth - headerRef.current.clientWidth;
    const limitedScrollLeft = Math.min(
      Math.max(newScrollLeft, 0),
      maxScrollLeft
    );

    // Limit the vertical scroll position
    const maxScrollTop =
      headerRef.current.scrollHeight - headerRef.current.clientHeight;
    const limitedScrollTop = Math.min(Math.max(newScrollTop, 0), maxScrollTop);

    headerRef.current.scrollLeft = limitedScrollLeft;
    headerRef.current.scrollTop = limitedScrollTop;
  };
  useEffect(() => {
    const header = headerRef.current;

    const handleDocumentMouseUp = () => {
      setMouseDown(false);
    };

    header.addEventListener("mouseup", handleMouseUp);
    header.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);

    return () => {
      header.removeEventListener("mouseup", handleMouseUp);
      header.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  }, [mouseDown]);

  useEffect(() => {
    if (divId !== 0) {
      const find = sortedHeader.find((e) => e.id === divId);
      const index = sortedHeader.findIndex((head) => head.id === divId);
      const slicedBefore = sortedHeader.slice(0, index);
      const slicedAfter = sortedHeader.slice(index + 1);
      setShortHead([find, ...slicedAfter, ...slicedBefore]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divId]);
  const handleClick = (id) => {
    const targetDiv = document.getElementById(id);
    if (targetDiv) {
      const container = containerRef.current;
      const targetTop = targetDiv.offsetTop;
      container.scrollTo({
        top: Math.max(0, targetTop - 100),
        behavior: "smooth",
      });
    }
  };
  return (
    <div
      ref={containerRef}
      className="overflow-y-auto || scrollStyle || min-h-[300px] || h-screen || relative "
    >
      <h2 className="border-b-[3px] || border-mainColor || h-[50px] || flex || items-center || justify-center">
        <span className="font-semibold">{title}</span>
      </h2>

      <header
        ref={headerRef}
        onMouseDown={handleMouseDown}
        className="flex  || select-none || w-full || scrollContainer  || overflow-x-auto || gap-2 || items-center || justify-between || box-shadow-edit || pt-3.5 || px-4 || sticky || top-[-1px] || z-10 || bg-white"
      >
        {sortedHeader.map((category, i) => (
          <div
            onClick={() => handleClick(category.id)}
            className={`
            ${
              divId !== 0
                ? divId === category.id
                  ? "bg-mainColor || text-white"
                  : "bg-mainText"
                : ""
            }
            ${divId === 0 && i === 0 ? `bg-mainColor || text-white` : ``} 
            
            px-3 || header || min-w-fit || whitespace-nowrap || py-2  || text-sm || rounded-full || cursor-pointer`}
            key={i}
          >
            {category[`${lang}_name`]}.
          </div>
        ))}
      </header>
      {data &&
        data.data.map((category, i) => (
          <div className="head || mx-4" id={category.id} key={category.id}>
            <h2 className="text-[#392200] || mt-8 || mb-4 || text-[32px] || font-bold">
              {category[`${lang}_name`]}
            </h2>
            {data.meal[i].data.map((meal) => (
              <div
                className="pb-[35px] || relative  || border-b || border-[#e0e0e0]"
                key={meal.id}
              >
                <Link
                  href={`${lang}/product/${category.id}/${meal.id}`}
                  className="flex || gap-2 || items-center"
                >
                  <div className="w-full || py-[20px]">
                    <p className="text-[18px] || mb-2 || font-semibold">
                      {meal[`${lang}_name`]}
                    </p>
                    {meal[`${lang}_description`] && (
                      <p className="text-[#6a3f01a6] || text-[14px] || font-semibold">
                        {meal[`${lang}_description`]}
                      </p>
                    )}
                  </div>
                  <div className="relative || min-w-[100px] || h-[100px]">
                    <Image
                      src={meal.image}
                      priority
                      blurDataURL={meal.image}
                      fill
                      sizes="100% ,100%"
                      alt="sayed"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </Link>
              </div>
            ))}
            <Link
              href={`${lang}/product/${category.id}`}
              className="box-shadow-edit || block || text-mainColor || text-center || text-sm || py-2 || font-semibold || cursor-pointer"
            >
              {seeMore}
            </Link>
          </div>
        ))}
    </div>
  );
}

export default HomePage;
