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
  const clientIPAddr = getClientIPAddress(request);
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
  const {
    country,
    timeZone,
    nextEquinoxType,
    diffBetweenEquinoxAndNow,
  } = useLoaderData();

  const [time, setTime] = React.useState(diffBetweenEquinoxAndNow);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const [days, hours, minutes, seconds]  = [
    Math.floor(time / 1000 / 60 / 60 / 24),
    Math.floor(time / 1000 / 60 / 60 % 24),
    Math.floor(time / 1000 / 60 % 60),
    Math.floor(time / 1000 % 60),
  ].map((t) => t < 10 ? `0${t}` : `${t}`);

  return (
    <div className={`background background--${nextEquinoxType.toLowerCase()}`}>
      <div className='wrapper'>
        <div className='content'>
          <h1 className='hidden'>
              When is the next equinox?
          </h1>
          <section>
            <h2 className='glass font-xl'>
              {nextEquinoxType} equinox is in:
            </h2>
          </section>
          <section className="flex">
            <div className='glass'>{days} days</div>
            <div className='glass'>{hours} hours</div>
            <div className='glass'>{minutes} minutes</div>
            <div className='glass'>{seconds} seconds</div>
          </section>
          <section>
            <div className='full-width glass glass--narrow meta'>
              <span>
                {country}
              </span>
              <span>
                {timeZone}
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
