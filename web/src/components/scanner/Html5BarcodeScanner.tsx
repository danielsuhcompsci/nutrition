// file = Html5BarcodePlugin.jsx
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode/esm/core";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect, useRef, useState } from "react";
import { BiBarcodeReader } from "react-icons/bi";

const qrcodeRegionId = "html5qr-code-full-region";

export interface BarcodePluginProps {
  config: Html5QrcodeScannerConfig;
  verbose?: boolean;
  barcodeSuccessCallback: QrcodeSuccessCallback;
  barcodeErrorCallback: QrcodeErrorCallback;
}

const Html5BarcodePlugin = ({
  config,
  barcodeSuccessCallback,
  barcodeErrorCallback,
}: BarcodePluginProps) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const startScanner = () => {
    if (!scannerRef.current) {
      const scanner = new Html5QrcodeScanner(qrcodeRegionId, config, true);
      scannerRef.current = scanner;
    }

    scannerRef.current.render((decodedText, decodedResult) => {
      barcodeSuccessCallback(decodedText, decodedResult);
      stopScanner();
    }, barcodeErrorCallback);
  };

  const stopScanner = () => {
    console.log("stopping ");
    if (scannerRef.current)
      scannerRef.current.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
  };

  return (
    <>
      <button type="button" className="text-4xl" onClick={startScanner}>
        <BiBarcodeReader />
      </button>
      <button type="button" className="" onClick={stopScanner}>
        Stop scanning!
      </button>
      <div id={qrcodeRegionId} />
    </>
  );
};

export default Html5BarcodePlugin;
