import * as React from 'react';

import type { LoaderFunction } from "remix";
import { json, useLoaderData } from 'remix';
import { getClientIPAddress } from 'remix-utils';

import styles from '../index.css';

export function links() {
  return [
    { rel: "stylesheet", href: styles }
  ];
}

const equinox: { [key: number]: [string, string] } = {
  2022: ['03-20  15:33', '09-23  01:04'],
  2023: ['03-20 21:25', '09-23  06:50'],
  // fill the rest from http://www.astropixels.com/ephemeris/soleq2001.html
};

const equinoxTypes = {
  SPRING: 'Spring',
  AUTUMN: 'Autumn',
};

const getNextEquinoxType = (currentYear: number, nextEquinoxDateStr: string, isNorthenHemisphere: boolean): string => {
  const nextEquinoxIdx = equinox[currentYear].indexOf(nextEquinoxDateStr);
  const idx = isNorthenHemisphere ? nextEquinoxIdx: (nextEquinoxIdx + 1) % 2;
  return Object.values(equinoxTypes)[idx];
}

const ENDPOINT = 'http://ip-api.com/json'

export const loader: LoaderFunction = async ({ request }) => {
  const clientIPAddr = getClientIPAddress(request) || '78.61.32.30';
  const response = await fetch(`${ENDPOINT}/${clientIPAddr}`);
  const data = await response.json();
  const {timezone: timeZone, lat, country} = data;

  const zonedDate = new Date(new Date().toLocaleString("en-US", { timeZone }));
  const now = zonedDate.getTime();
  const currentYear = zonedDate.getFullYear();
  const nextEquinoxDateStr = equinox[currentYear].find((e: string) => new Date(`${currentYear}-${e} UTC`).getTime() > now) || equinox[currentYear][0];
  const diffBetweenEquinoxAndNow = new Date(`${currentYear}-${nextEquinoxDateStr} UTC`).getTime() - now;
  const isNorthenHemisphere = lat > 0;
  const nextEquinoxType = getNextEquinoxType(currentYear, nextEquinoxDateStr, isNorthenHemisphere);

  return json({country, nextEquinoxType, diffBetweenEquinoxAndNow});
}

export default function Index() {
  const data = useLoaderData();
  console.log(data);
  const [time, setTime] = React.useState(data.diffBetweenEquinoxAndNow);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const counterValues = [
    Math.floor(time / 1000 / 60 / 60 / 24),
    Math.floor(time / 1000 / 60 / 60 % 24),
    Math.floor(time / 1000 / 60 % 60),
    Math.floor(time / 1000 % 60),
  ].map((t) => t < 10 ? `0${t}` : `${t}`);

  const [days, hours, minutes, seconds] = counterValues;

  return (
    <div className='wrapper'>
      <div className='content'>
        <h1>{days} days</h1>
        <h1>{hours} hours</h1>
        <h1>{minutes} minutes</h1>
        <h1>{seconds} seconds</h1>
      </div>
    </div>
  );
}
