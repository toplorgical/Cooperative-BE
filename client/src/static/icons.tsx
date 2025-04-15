import exp from "constants";

import * as React from "react";
import { ModalProps } from "../types/index";

export const IconWallet = (props: React.SVGProps<SVGSVGElement> & { className?: string }) => {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em" className={props.className} {...props}>
      <path d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h368c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zm352 304c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" />
    </svg>
  );
};

export const IconArrowLeftRight = (props: React.SVGProps<SVGSVGElement> & { className?: string }) => {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em" className={props.className} {...props}>
      <path
        fillRule="evenodd"
        d="M1 11.5a.5.5 0 00.5.5h11.793l-3.147 3.146a.5.5 0 00.708.708l4-4a.5.5 0 000-.708l-4-4a.5.5 0 00-.708.708L13.293 11H1.5a.5.5 0 00-.5.5zm14-7a.5.5 0 01-.5.5H2.707l3.147 3.146a.5.5 0 11-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 11.708.708L2.707 4H14.5a.5.5 0 01.5.5z"
      />
    </svg>
  );
};

export const IconDatabase = (props: React.SVGProps<SVGSVGElement> & { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className={props.className} {...props}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M21 9.5v3c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5v-3c0 2.485 4.03 4.5 9 4.5s9-2.015 9-4.5zm-18 5c0 2.485 4.03 4.5 9 4.5s9-2.015 9-4.5v3c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5v-3zm9-2.5c-4.97 0-9-2.015-9-4.5S7.03 3 12 3s9 2.015 9 4.5-4.03 4.5-9 4.5z" />
    </svg>
  );
};

export const IconIconCall = (props: React.SVGProps<SVGSVGElement> & { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className={props.className} {...props}>
      <path d="M13.04 14.69l1.07-2.14a1 1 0 011.2-.5l6 2A1 1 0 0122 15v5a2 2 0 01-2 2h-2A16 16 0 012 6V4c0-1.1.9-2 2-2h5a1 1 0 01.95.68l2 6a1 1 0 01-.5 1.21L9.3 10.96a10.05 10.05 0 003.73 3.73zM8.28 4H4v2a14 14 0 0014 14h2v-4.28l-4.5-1.5-1.12 2.26a1 1 0 01-1.3.46 12.04 12.04 0 01-6.02-6.01 1 1 0 01.46-1.3l2.26-1.14L8.28 4z" />
    </svg>
  );
};

export const IconLocation = (props: React.SVGProps<SVGSVGElement> & { className?: string }) => {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em" className={props.className} {...props}>
      <path d="M288 192 A32 32 0 0 1 256 224 A32 32 0 0 1 224 192 A32 32 0 0 1 288 192 z" />
      <path d="M256 32c-88.22 0-160 68.65-160 153 0 40.17 18.31 93.59 54.42 158.78 29 52.34 62.55 99.67 80 123.22a31.75 31.75 0 0051.22 0c17.42-23.55 51-70.88 80-123.22C397.69 278.61 416 225.19 416 185c0-84.35-71.78-153-160-153zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z" />
    </svg>
  );
};

export const IconMailSharp = (props: React.SVGProps<SVGSVGElement> & { className?: string }) => {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em" className={props.className} {...props}>
      <path d="M464 80H48a16 16 0 00-16 16v320a16 16 0 0016 16h416a16 16 0 0016-16V96a16 16 0 00-16-16zM265.82 284.63a16 16 0 01-19.64 0L89.55 162.81l19.64-25.26L256 251.73l146.81-114.18 19.64 25.26z" />
    </svg>
  );
};

export const FundingModal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
