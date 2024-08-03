"use client";
// type DataCellProps = {
//   className: string;
//   data: {
//     startDate: Date;
//   };
// };
// const DataCell = (props: React.PropsWithChildren<DataCellProps>) => {
//   const { startDate } = props.data;
//   const container = useRef(null);
//   useEffect(() => {
//     const width = container.current.offsetWidth;
//     // container.current.style.height = width + "px";
//     // console.log(container.current.offsetWidth);
//     if (width < 100) return;
//     const sheet = new CSSStyleSheet();
//     sheet.replaceSync(
//       `.timecell-box { height : ${width}px } .datacell-box { height : ${width}px }`
//     );
//     document.adoptedStyleSheets = [sheet];
//   }, []);
//   return (
//     <div className="datacell-box h-full" ref={container}>
//       {startDate.getDate()}
//       {props.children}
//     </div>
//   );
// };
type TimeCellProps = {
  data: { date: Date; text: string };
};
export const TimeCell = (props: TimeCellProps) => {
  const { date, text } = props.data;

  return (
    <div className="timecell-box">
      {date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}
    </div>
  );
};
